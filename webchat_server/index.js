const express = require('express')
const mongo = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const route = require('./routers/router')
const { Server } = require("socket.io");
const { createServer } = require("http");
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

const PORT = 5000
const app = express()
mongo.set("strictQuery", false);
mongo.connect("mongodb+srv://rubanlycan:webchat1995@cluster0.jc01dam.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,dbName:"webchat_db"})

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
app.use(cors( {origin: "http://localhost:3000",
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
      origin: "http://localhost:3000",
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
 

  console.log("server users",users)
  io.sockets.emit("users", users);
  socket.on("private message", ({ message, to }) => {
    console.log('from: ',socket.id,"to: ",to,"message:_",message)
    socket.to(to).emit("private message", {
      message,
      from: socket.id,
    });
    
  });
});
//
httpServer.listen(PORT,()=>{
console.log('server running on '+PORT)
})