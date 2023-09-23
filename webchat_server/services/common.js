const redis = require('redis')
const {createClient} = redis

const randomId = function() {
    return Math.random(20).toString(36).substring(2, length+2);
  };



  const connectRedis = ()=>{
    const RedisClient = createClient({
      password: 'GaMNDcYYiEe3a786dV7F8alp18xyE4T1',
      socket: {
          host: 'redis-18688.c264.ap-south-1-1.ec2.cloud.redislabs.com',
          port: 18688
      }
  });
    
    RedisClient.on('error', err => console.log('Redis Client Error', err));
    RedisClient.on('connect', () => console.log('Redis connected suessfully'))

     RedisClient.connect();

   return RedisClient

    }
    

  



  module.exports ={
    randomId,
    connectRedis
  }
