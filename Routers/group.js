const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { groupSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()
const { Sequelize, DataTypes } = require('sequelize');

router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.Group.findAndCountAll({
       where: {
           Id: Id,
           status: 1
       },
       raw:false,
include: { model: Database.Field , attributes: ['title','id'],
include:{ model:Database.Department,attributes: ['title','id'],
include:{ model:Database.Faculty,attributes: ['title','id']}},}
   }).then( result =>{    
       
     if (result.count==1){   
       
        var obj = result.rows.map(data => {    
            return Object.assign({},{
            id:data.id, 
            title:data.title,
            yearStudy:data.yearStudy,
            typeStudy:data.typeStudy,
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

router.get('/Filter/:facultyid/:departmentid/:fieldid/:typestudy/:yearstudy/:offset/:limit'
,authChek
,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
  
  
   const YearStudy = req.params.yearstudy  || 0    
   const FacultyId = req.params.facultyid  || 0  
   const DepartmentId = req.params.departmentid  || 0  
   const fieldId = req.params.fieldid  || 0  
   const TypeStudy = req.params.typestudy  || 0    

   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};     
  
   if (FacultyId !=0){  where['$field->department->faculty.id$']=FacultyId }  
   if (DepartmentId !=0){  where['$field->department.id$']=DepartmentId }  
   if (fieldId !=0){  where.fieldId=fieldId }  
   if (TypeStudy !=0){  where.typeStudy=TypeStudy }  
   if (YearStudy !=0){  where.yearStudy=YearStudy } 
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }
 
       await Database.Group.findAndCountAll({
        subQuery: false,
      where: where,
      ...limits,
    
      attributes: {  exclude: ['createdAt', 'updatedAt'],
      
              include: [
                  [Sequelize.fn("COUNT", Sequelize.col("groupstudents.groupId")), "groupCount"],'id'] 
    },
    order: [
        ['id', 'ASC'],      
    ],
      include :[{  model: Database.GroupStudent, attributes: []  },
      { model: Database.Field , attributes: ['title','id'],
      include:{ model:Database.Department,attributes: ['title','id'],
      include:{ model:Database.Faculty,attributes: ['title','id']}}}],
  
   raw:true,
      group: ['group.id']
  }).then( result =>{   
    
    if (result){            
        
         var obj = result.rows.map(data => {
            return Object.assign({},{
            id:data.id, 
            title:data.title,
            yearStudy:data.yearStudy,
            typeStudy:data.typeStudy,
            description:data.description,
            fieldId:data.fieldId,
           fieldTitle:data['field.title'],       
           departmentId:data['field.department.id'],
           departmentTitle:data['field.department.title'],
           facultyId:data['field.department.faculty.id'],
            facultyTitle:data['field.department.faculty.title'],
            groupCount:data.groupCount
            })  

           
          })
        
         metadata = {offset:offset,limit:limit,total:result.count.length}
       
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
            itemsDelete = await Database.Group.destroy({ 
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

   
    
    router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(groupSchema),FindDuplicate(Database.Group,["title","yearStudy"])
,async function (req,res) {        
    Database.Group.create({
    title:req.body.title,
    yearStudy:req.body.yearStudy,   
    fieldId:req.body.fieldId,
    typeStudy:req.body.typeStudy,  
    description:req.body.description,   
    status : req.body.status
       
}).then(function(response){
    if (response){  
        response["groupCount"]=100
        data={id:response.id,title:response.title,yearStudy:response.yearStudy,fieldId:response.fieldId,typeStudy:response.typeStudy,description:response.description,status:response.status,groupCount:0}
        return res.status(200).json({data:data})
    }else{
        return res.status(400).json({message:Config.ERROR_400})
    }
}).catch(error => {
         return res.status(500).json({message:Config.ERROR_500,errors:error})
});

})


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(groupSchema),FindDuplicate(Database.Group,["title","yearStudy"]),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.Group.update(
        {
    title:req.body.title,
    yearStudy:req.body.yearStudy,   
    fieldId:req.body.fieldId,
    typeStudy:req.body.typeStudy,  
    description:req.body.description,   
    status : req.body.status
        },
       { where: {Id: dataId}}
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