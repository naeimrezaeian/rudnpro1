const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { subjectSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()

router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT]), async function (req, res)  {
    const Id=req.params.id
        await Database.Subject.findAndCountAll({
       where: {
           id: Id,
           status: 1
       },
       include: { model: Database.Field , attributes: ['title','id'],
      include:{ model:Database.Department,attributes: ['title','id'],
      include:{ model:Database.Faculty,attributes: ['title','id']}},
    }
   }).then( result =>{    
     if (result.count==1){      
        var obj = result.rows.map(data => {    
            return Object.assign({},{
            id:data.id, 
            title:data.title,
            description:data.description,
            image:data.image,
            description:data.description,
            fieldId:data.fieldId,
            fieldTitle:data.field.title,       
            departmentId:data.field.department.id,
            departmentTitle:data.field.department.title,
            facultyId:data.field.department.faculty.id,
            facultyTitle:data.field.department.faculty.title,
        
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

router.get('/Filter/:facultyid/:departmentid/:fieldid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
   const Id = req.params.id || 0
   const FacultyId = req.params.facultyid  || 0  
   const DepartmentId = req.params.departmentid  || 0  
   const fieldId = req.params.fieldid  || 0  
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};    
   if (Id !=0){  where.Id=Id }
   if (FacultyId !=0){  where['$field->department->faculty.id$']=FacultyId }  
   if (DepartmentId !=0){  where['$field->department.id$']=DepartmentId }  
   if (fieldId !=0){  where.fieldId=fieldId }  
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.Subject.findAndCountAll({
      where: where,
      ...limits,
      include: { model: Database.Field , attributes: ['title','id'],
      include:{ model:Database.Department,attributes: ['title','id'],
      include:{ model:Database.Faculty,attributes: ['title','id']}},
    }
  }).then( result =>{    
    if (result){  

       var obj = result.rows.map(data => {    
            return Object.assign({},{
            id:data.id, 
            title:data.title,
            description:data.description,
            image:data.image,
            description:data.description,
            fieldId:data.fieldId,
            fieldTitle:data.field.title,       
            departmentId:data.field.department.id,
            departmentTitle:data.field.department.title,
            facultyId:data.field.department.faculty.id,
            facultyTitle:data.field.department.faculty.title,
        
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
            itemsDelete = await Database.Subject.destroy({ 
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

   
    
router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(subjectSchema),FindDuplicate(Database.Subject,["title","fieldId"])
,async function (req,res) {  
   
    
    Database.Subject.create({
        title: req.body.title,                
        description : req.body.description,   
        fieldId : req.body.fieldId,
        image  :req.body.image
       
       
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


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(subjectSchema),FindDuplicate(Database.Subject,["title","fieldId"]),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.Subject.update(
        {
        title: req.body.title,                
        description : req.body.description,   
        fieldId : req.body.fieldId,
        image  :req.body.image 
        
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