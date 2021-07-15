const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { permissionuserSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicateArray }= require('../Middleware/Duplicate')
const router = express.Router()



router.get('/:userid',authChek,authRole([Config.ROLE.ADMIN]), async function (req, res)  {
    userId=req.params.userid
   
        await Database.PermissionUser.findAll({
        attributes:['id','userId','access','permissionId',
        [Database.Sequelize.col('permission.title'), 'permissionTitle'],
        [Database.Sequelize.col('permission.tag'), 'permissionTag']
    ],
            where:{
                userId:userId
            },
            include:[
                {model:Database.Permission,attributes:[]}
            ],
            raw:true
      
   }).then( result =>{    
     if (result){        
         return res.status(200).json({  data : result })
     }else{
         return res.status(404).json({message:Config.ERROR_404})
     }   
   }).catch(error => {
       console.log(error)
     return res.status(500).json({message:Config.ERROR_500,errors:error})      
   })
   
     
})


router.delete('/',authChek,authRole([Config.ROLE.ADMIN]), async function(req, res)  {
    items=req.body.items
    if (items !=null){                     
        itemsDelete = await Database.PermissionUser.destroy({ 
            where: { userId: items }
        }).then( (response) =>{
            if (response > 0 ){
                
                return res.status(200).json({message:Config.ERROR_200})
            }
                
                return res.status(404).json({message:Config.ERROR_404})

        }).catch(error => {
            return res.status(500).json({message:Config.ERROR_500,errors:error})

        })
    
    }else{            
        return res.status(404).json({message:Config.ERROR_404})
    }
})

   


router.post('/',authChek,authRole([Config.ROLE.ADMIN])
,FindDuplicateArray(Database.PermissionUser,["userId","permissionId"])
,async function (req,res) {  

    Database.PermissionUser.bulkCreate(req.dataArray).then(function(response){
        if (response){        
            return res.status(200).json({message:Config.ERROR_200})
        }else{
           
            return res.status(400).json({message:Config.ERROR_400})
        }
    }).catch(error => {
        console.log(error)
             return res.status(500).json({message:Config.ERROR_500,errors:error})
    });

})


router.put('/:userid',authChek,authRole([Config.ROLE.ADMIN]),
//FindDuplicateArray(Database.PermissionUser,["userId","permissionId"]),
async function  (req, res) {   
    const userId = req.params.userid

    const ChecUser = await Database.PermissionUser.findAll({where:{userId:userId}})
   
   if( ChecUser.length >0) {
    
    const dataArray=req.body.dataArray
       
    await  asyncForEach(dataArray,async (data) =>{ 
       
        Database.PermissionUser.update(
            {
                access: data.access,    
                     
            },
           { where: {userId:userId,permissionId:data.permissionId}}
           )
         
    })

    return res.status(200).json({message:Config.ERROR_200})
}else{
    return res.status(404).json({message:Config.ERROR_404})
}
   
    

     
    

    
 })
 async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

   module.exports = router