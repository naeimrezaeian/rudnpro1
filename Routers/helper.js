const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const router = express.Router()


router.get('/YearStudy',authChek,
authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), 
async function (req, res)  {



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

 return res.status(200).json({  data :{items:studyYear} }) 
 // return res.status(200).json({  data :"Dsad" }) 
   
})


module.exports = router