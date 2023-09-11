const randomId = function() {
    return Math.random(20).toString(36).substring(2, length+2);
  };


  module.exports ={
    randomId
  }