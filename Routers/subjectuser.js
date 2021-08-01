const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { subjectUserSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicateArray}= require('../Middleware/Duplicate')
const router = express.Router()

router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
    console.log(Id)

        await Database.SubjectUser.findAndCountAll({
       where: {
           id: Id
         
       },
       raw:false,
        include: [{ model: Database.User , attributes: ['name','photo']},
         { model:Database.Subject,attributes: ['title']}],      
    
   }).then( result =>{    
      
     if (result.count==1){     

        var obj = result.rows.map(data => {    
            return Object.assign({},{
            id:data.id, 
            subjectId:data.subjectId,
            subjectTitle:data.subject.title,
            userId:data.userId,
            name:data.user.name,
            photo:data.user.photo,           
        
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

router.get('/Filter/:userid/:subjectid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
   
   const UserId = req.params.userid  || 0   
   const SubjectId = req.params.subjectid  || 0    
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {};
   let limits = {};       
   if (UserId !=0){  where.userId=UserId }  
   if (SubjectId !=0){  where.subjectId=SubjectId }  
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.SubjectUser.findAndCountAll({
      where: where,
      ...limits,
      raw:false,
        include: [{ model: Database.User , attributes: ['name','photo']},
         { model:Database.Subject,attributes: ['title']}],   
    
  }).then( result =>{    
    if (result){  

       var obj = result.rows.map(data => {    
            return Object.assign({},{
                id:data.id, 
                subjectId:data.subjectId,
                subjectTitle:data.subject.title,
                userId:data.userId,
                name:data.user.name,
                photo:data.user.photo,           
            
        
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

router.delete('/',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function(req, res)  {
    items=req.body.items
    if (items !=null){                     
        itemsDelete = await Database.SubjectUser.destroy({ 
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

router.post('/',authChek,authRole([Config.ROLE.ADMIN]),FindDuplicateArray(Database.SubjectUser,["userId","subjectId"])
,async function (req,res) {  
   
    Database.SubjectUser.bulkCreate(req.dataArray).then(function(response){
    if (response){        
        return res.status(200).json({message:Config.ERROR_200})
    }else{
       
        return res.status(400).json({message:Config.ERROR_400})
    }
}).catch(error => {
         return res.status(500).json({message:Config.ERROR_500,errors:error})
});
})



// router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(subjectUserSchema),FindDuplicate(Database.SubjectUser,["userId","subjectId"])
// ,async function (req,res) {  
     
//     Database.SubjectUser.create({
//         userId: req.body.userId,                
//         subjectId : req.body.subjectId,
// }).then(function(response){
//     if (response){        
//         return res.status(200).json({message:Config.ERROR_200,Id:response['dataValues']['Id']})
//     }else{
       
//         return res.status(400).json({message:Config.ERROR_400})
//     }
// }).catch(error => {
//          return res.status(500).json({message:Config.ERROR_500,errors:error})
// });

// })




   module.exports = router