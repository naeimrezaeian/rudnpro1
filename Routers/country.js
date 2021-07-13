const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const  Sequelize = require('sequelize')
const Op = Sequelize.Op;
const router = express.Router()
const { authRole,authChek }=require('../Middleware/Auth');

router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.Country.findOne({
       where: {
           code: Id,
          
       }
   }).then( result =>{    
     if (result){        
         return res.status(200).json({  data : result })
     }else{
         return res.status(404).json({message:Config.ERROR_404})
     }   
   }).catch(error => {
     return res.status(500).json({message:Config.ERROR_500,errors:error})      
   })
   
     
})

router.get('/',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {


await Database.Country.findAndCountAll().then( result =>{    
    if (result){        
       
    return res.status(200).json({  data :{items:result.rows} }) 
    }else{
        return res.status(404).json({message:Config.ERROR_404})
    }   
  }).catch(error => {
    return res.status(500).json({message:Config.ERROR_500,errors:error})      
  })

})

router.get('/Find/:searchtext',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const searchText=req.params.searchtext
    console.log(searchText)
    await Database.Country.findAndCountAll({
        where: {
            name: {
                [Op.like]:  ''+req.params.searchtext +'%' 
            }}
    }).then( result =>{    
        if (result){        
           
        return res.status(200).json({  data :{items:result.rows} }) 
        }else{
            return res.status(404).json({message:Config.ERROR_404})
        }   
      }).catch(error => {
        return res.status(500).json({message:Config.ERROR_500,errors:error})      
      })
    
    })



    

    

 


   module.exports = router