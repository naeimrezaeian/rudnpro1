const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { facultySchema, validate } = require('../Middleware/validator.js');
const router = express.Router()




    router.get('/:id/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
        const Id = req.params.id || 0
        const offset = parseInt(req.params.offset) || 0
        const limit = parseInt(req.params.limit) || 0    
        
        let where = {status: 1};
        let limits = {};    
        if (Id !=0){  where.Id=Id }
        if (limit != 0 ){      limits={ offset: offset,limit: limit }      }
        
       
            await Database.Faculty.findAndCountAll({
           where: where,
           ...limits,
     
       }).then( result =>{    
         if (result){        
             metadata = {offset:offset,limit:limit,total:result.count}
         return res.status(200).json({  data :{items:result.rows,metadata:metadata} }) 
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
            itemsDelete = await Database.Faculty.destroy({ 
                where: { id: [items] }
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

   
    
router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(facultySchema)
,async function (req,res) {  
   
    
    Database.Faculty.create({
        title: req.body.title,
        address : req.body.address,
        phone : req.body.phone,
        email : req.body.email,
        description : req.body.description,
        photo : req.body.photo ,
        status : req.body.status
       
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


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(facultySchema),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.Faculty.update(
        {
            title: req.body.title,
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email,
            description : req.body.description,
            photo : req.body.photo ,
            status : req.body.status
        },
       { where: {id: dataId, status: 1}}
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