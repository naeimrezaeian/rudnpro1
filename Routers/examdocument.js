const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { examdocumentSchema, validate } = require('../Middleware/validator.js');

const router = express.Router()


router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.ExamDocument.findOne({
       where: {
           Id: Id,
           status: 1
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
router.get('/Filter/:examid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
   
   const ExamId = req.params.examid
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};    
  
   if (ExamId !=0){  where.ExamId=ExamId }  
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.ExamDocument.findAndCountAll({
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
            itemsDelete = await Database.ExamDocument.destroy({ 
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

   
    
    router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(examdocumentSchema)
    
,async function (req,res) {  
  
    
    Database.ExamDocument.create({                  
        ExamId: req.body.examId,    
        ExamFile: req.body.examFile,        
        Status : req.body.status
       
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


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(examdocumentSchema),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.ExamDocument.update(
        {
        ExamId: req.body.examId,    
        ExamFile: req.body.examFile,        
        Status : req.body.status
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