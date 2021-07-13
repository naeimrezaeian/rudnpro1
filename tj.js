// // const  Sequelize = require('sequelize')
// const Config = require('./config.js');
// const redis = require("redis");
// var redisClient = redis.createClient({
//   // host:'192.168.0.157'
//    host:Config.REDIS_HOST
// });

// console.log(redisClient)

Array.prototype.pairs = function (func) { 
      for (var i = 0; i < this.length - 1; i++) {
                  func([this[i]+"-"+this[i+1]]);
      
  }
}





const yearCount=10
year=new Date().getFullYear()-yearCount
yearArray=Array.from({length: yearCount}, (_, i) => i + year).slice()
var studyYear = [];
yearArray.pairs(x =>{  studyYear.push(x[0])
  
})
console.log(studyYear)

