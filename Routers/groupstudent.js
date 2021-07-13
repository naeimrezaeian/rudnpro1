const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { groupstudentsSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()

router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.GroupStudent.findAndCountAll({
       where: {           Id: Id,         },
       raw:false,
      include:[
           { model: Database.User , attributes: ['name','photo']},
           { model: Database.Group , attributes: ['title']}
      ],
   }).then( result =>{    
     if (result.count==1){        
        var obj = result.rows.map(data => {    
            return Object.assign({},{
            id:data.id, 
            userId:data.userId,
            userName:data.user.name,
            userPhoto:data.user.photo,
            groupId:data.groupId,
            groupTitle:data.group.title,           
        
             })  
          })
         return res.status(200).json({  data : obj[0] })
     }else{
         return res.status(404).json({message:Config.ERROR_404})
     }   
   }).catch(error => {
     return res.status(500).json({message:Config.ERROR_500,errors:error})      
   })
   
     
})
router.get('/Filter/:groupid/:userid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
   
   const GroupId = req.params.groupid  || 0    
   const UserId = req.params.userid  || 0    
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {};
   let limits = {};      
   if (GroupId !=0){  where.groupId=GroupId }  
   if (UserId !=0){  where.userId=UserId }  
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.GroupStudent.findAndCountAll({
      where: where,
      ...limits,
      raw:false,
      include:[
           { model: Database.User , attributes: ['name','photo']},
           { model: Database.Group , attributes: ['title']}
      ],
  }).then( result =>{    
    if (result){      
        var obj = result.rows.map(data => {    
            return Object.assign({},{
            id:data.id, 
            userId:data.userId,
            userName:data.user.name,
            userPhoto:data.user.photo,
            groupId:data.groupId,
            groupTitle:data.group.title,           
        
             })  
          })  
          metadata = {offset:offset,limit:limit,total:result.count}
          return res.status(200).json({  data :{items:obj,metadata:metadata} })
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
            itemsDelete = await Database.GroupStudent.destroy({ 
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

   
    
    router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(groupstudentsSchema),FindDuplicate(Database.GroupStudent,["groupId","userId"])
,async function (req,res) {  
   
    
    Database.GroupStudent.create({                  
        groupId: req.body.groupId,    
        userId: req.body.userId
       
       
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


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(groupstudentsSchema),FindDuplicate(Database.GroupStudent,["groupId","userId"]),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.GroupStudent.update(
        {
            groupId: req.body.groupId,    
            userId: req.body.userId,            
        },
       { where: {Id: dataId, status: 1}}
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