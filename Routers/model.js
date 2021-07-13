const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { modelSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()


router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.Model.findOne({
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

router.get('/Filter/:facultyid/:departmentid/:fieldid/:subjectid/:offset/:limit'
,authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER])
,async function (req, res)  {  
   const FacultyId = req.params.facultyid  || 0 
   const FieldId = req.params.fieldid  || 0 
   const DepartmentId = req.params.departmentid  || 0 
   const SubjectId = req.params.subjectid  || 0 
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};  
   if (FacultyId !=0){  where['$subject->field->department->faculty.id$']=FacultyId }  
   if (DepartmentId !=0){  where['$subject->field->department.id$']=DepartmentId }   
   if (FieldId !=0){  where['$subject->field.id$']=FieldId }
   if (SubjectId !=0){  where.subjectId=SubjectId }
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.Model.findAndCountAll({
      where: where,
      ...limits,
      attributes: {  
        exclude: ['createdAt', 'updatedAt'],
        include: [
            [Database.Sequelize.col('subject.title'), 'subjectTitle'],
            [Database.Sequelize.col('subject->field.id'), 'fieldid'],[Database.Sequelize.col('subject->field.title'), 'fieldTitle'],
            [Database.Sequelize.col('subject->field->department.id'), 'departmentid'],[Database.Sequelize.col('subject->field->department.title'), 'departmentTitle'],
            [Database.Sequelize.col('subject->field->department->faculty.id'), 'facultyid'],[Database.Sequelize.col('subject->field->department->faculty.title'), 'facultyTitle']

        ]
      },
      include:[
        { 
            model: Database.Subject , attributes: [],
            include:{model: Database.Field , attributes: [],
            include:{ model:Database.Department,attributes: [],
            include:{ model:Database.Faculty,attributes: []}}}
           }
      ]

  }).then( result =>{    
    if (result){        
        metadata = {offset:offset,limit:limit,total:result.count}
    return res.status(200).json({  data :{items:result.rows,metadata:metadata} }) 
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
            itemsDelete = await Database.Model.destroy({ 
                where: { id: items}
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

   
    
    router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(modelSchema),FindDuplicate(Database.Model,["title","urlModel","subjectId"])
,async function (req,res) {  
   
    
    Database.Model.create({
        Title: req.body.title,                
        Description : req.body.description,        
        SubjectId : req.body.subjectId,
        UrlModel  :req.body.urlModel, 
        Parameters  :req.body.parameters, 
        GeneralModel  :req.body.generalModel, 
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


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(modelSchema),FindDuplicate(Database.Model,["title","urlModel","subjectId"]),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.Model.update(
        {
            Title: req.body.title,                
            Description : req.body.description,               
            SubjectId : req.body.subjectId,
            UrlModel  :req.body.urlModel, 
            Parameters  :req.body.parameters, 
            GeneralModel  :req.body.generalModel, 
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