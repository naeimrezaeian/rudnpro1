const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { permissionSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()



router.get('/',authChek,authRole([Config.ROLE.ADMIN]), async function (req, res)  {
   
        await Database.Permission.findAll({
      
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


router.delete('/',authChek,authRole([Config.ROLE.ADMIN]), async function(req, res)  {
    items=req.body.items
    if (items !=null){                     
        itemsDelete = await Database.Permission.destroy({ 
            where: { id: items }
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

   
    
router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(permissionSchema),FindDuplicate(Database.Permission,["title","tag"])
,async function (req,res) {  

Database.Permission.create({                  
    title: req.body.title,    
    tag: req.body.tag,
    
    
}).then(function(response){
if (response){        
    return res.status(200).json({message:Config.ERROR_200,Id:response['dataValues']['Id']})
}else{
    
    return res.status(400).json({message:Config.ERROR_400})
}
}).catch(error => {
        return res.status(500).json({message:Config.ERROR_500,errors:error})
});

})


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(permissionSchema),FindDuplicate(Database.Permission,["title","tag"]),
async function  (req, res) {   

   
    const Id = parseInt(req.params.id)  
   
     await Database.Permission.update(
        {
            title: req.body.title,    
            tag: req.body.tag,          
        },
       { where: {id:Id}}
       ).then(function(result) {
           if (result==1){
        return res.status(200).json({message:Config.ERROR_200})
           }else{
            return res.status(404).json({message:Config.ERROR_404})
           }
       }).catch(error => {
        return res.status(500).json({message:Config.ERROR_500,errors:error})
});
     
    

    
 })
 

   module.exports = router