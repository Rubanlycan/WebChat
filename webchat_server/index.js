const express = require('express')
const mongo = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const route = require('./routers/router')
const { Server } = require("socket.io");
const { createServer } = require("http");
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const { connectRedis } = require('./services/common')


const redisClient = connectRedis()

dotenv.config()
const PORT = 5000
const app = express()
mongo.set("strictQuery", false);
mongo.connect(process.env.MONGO_URI,{useNewUrlParser:true,dbName:"webchat_db"})

 bodyParser.urlencoded({extended:true})
const db = mongo.connection


db.on('error',()=>{
    console.log('DB connection failed')
})

db.once('open',()=>{
    console.log('DB connected successfully')
})



app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors( {origin: "*",
methods: ["GET", "POST","DELETE","PUT"]}))
app.use(express.urlencoded({ extended: true }));
app.use('/webchat',route)
app.get('/',(req,res)=>{
    res.send(`Server running on ${PORT}`)
})
// socket IO starts here
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","DELETE","PUT"]
    },});

    io.use((socket, next) => {
      const username = socket.handshake.auth.username;
      const db_id = socket.handshake.auth.db_id;
      const sessionID = socket.handshake.auth.sessionID;
      if (sessionID) {
        // find existing session
        const session = sessionStore.findSession(sessionID);
        if (session) {
          socket.sessionID = sessionID;
          socket.userID = session.userID;
          socket.username = session.username;
          return next();
        }
      }
      if (!username) {
        return next(new Error("invalid username"));
      }
      socket.username = username;
      socket.sessionID = uuidv4();
      socket.userID = uuidv4();
      socket.db_id = db_id;
      next();
    });
io.on("connection", (socket) => {
  // ...get all connected clients
  const users = [];
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username:socket.username,
        db_id:socket.db_id
      });
    }

  socket.on('game',(room)=>{
    redisClient.set(room.roomId,room.roomName)
 
    console.log(room.roomName+" created by ",room.createdBy) 
        socket.join(room.roomName)
     
    io.sockets.emit("game",room)
   
  })

  socket.on( "joiningGame",room=>{
    socket.join(room.roomName)

    io.sockets.in(room.roomName).emit("event",  io.sockets.adapter.rooms.get(room.roomName)?.size);
    socket.on("startGame",p=>{
      if(p==="players joined")
      {
        io.sockets.in(room.roomName).emit("startGame", p);
      }
    })
  })

 
  io.sockets.emit("users", users);
  socket.on("private message", ({ message, to }) => {
    console.log('from: ',socket.id,"to: ",to,"message:_",message)
    socket.to(to).emit("private message", {
      message,
      from: socket.id,
    });
    
  });
  socket.on("diceRoll",val=>{
    console.log(socket.userID)
    let roomname =    redisClient.get(socket.userID )
 roomname.then(r=>console.log(socket.userID,r))

    socket.emit("diceVal",val)
  })
});
//
httpServer.listen(PORT,()=>{
console.log('server running on '+PORT)
})