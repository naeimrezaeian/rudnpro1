const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek } = require('../Middleware/Auth')
const router = express.Router()
const { canViewProfile, scopedData,canEditProfile } = require('../Permissions/profile')
const { validationResult } = require('express-validator');
const { userSchema, validate } = require('../Middleware/validator.js');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
var salt = bcrypt.genSaltSync(10);
router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]),async function (req, res)  {
    const dataId = req.params.id    
    
    if (!canViewProfile(req.user, dataId)) {            
        return res.status(401).json({message:Config.ERROR_401})
      }
          await Database.User.findOne({
        where: { Id:dataId   }
    }).then(function(response) { 
        if (response){  
            req.data=response
                  
            return res.status(200).json({data:response})
        }else{
           
            return res.status(404).json({message:Config.ERROR_404})
        }
         
       }).catch(error =>{
        return res.status(500).json({message:Config.ERROR_500,errors:error})
           
       })    

    
    })

    router.get('/Teachers/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function(req, res)  {
        const offset =parseInt(req.params.offset) || 0
        const limit =parseInt(req.params.limit) || 0    
        let limits = {};
        if (limit != 0 ){   
            limits={
                offset: offset,
                limit: limit
            }  
        }
        let where= {  status: 1 ,access:'teacher'     }
        
        if (req.user.role != Config.ROLE.ADMIN){
            where={Id: req.user.id,status: 1 ,access:'teacher' }
        }
           await Database.User.findAndCountAll({
            where: {  ...where     },
            ...limits,
        }).then(result => { 
           
            
        metadata = {offset:offset,limit:limit,total:result.count}
        return res.status(200).json({  data :{items:result.rows,metadata:metadata} })   
          }).catch(error => {               
            return res.status(500).json({message:Config.ERROR_500,errors:error})
       });
        
        }) 

router.get('/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function(req, res)  {
    const offset =parseInt(req.params.offset) || 0
    const limit =parseInt(req.params.limit) || 0    
    let limits = {};
    if (limit != 0 ){   
        limits={
            offset: offset,
            limit: limit
        }  
    }
    let where= {  status: 1      }
    
    if (req.user.role != Config.ROLE.ADMIN){
        where={Id: req.user.id,status: 1 }
    }
       await Database.User.findAndCountAll({
        where: {  ...where     },
        ...limits,
    }).then(result => { 
       
        
    metadata = {offset:offset,limit:limit,total:result.count}
    return res.status(200).json({  data :{items:result.rows,metadata:metadata} })   
      }).catch(error => {               
        return res.status(500).json({message:Config.ERROR_500,errors:error})
   });
    
    }) 

router.delete('/',authChek,authRole([Config.ROLE.ADMIN]), async function(req, res)  {
    items=req.body.items
  
    if (items !=null){                          
        itemsDelete = await Database.User.destroy({ where: { id: [items] }}).then(function(response){ 
            
            if (response > 0 ){                 
                return res.status(200).json({message:Config.ERROR_200})
            }    
            return res.status(404).json({message:Config.ERROR_404})

        }).catch(function(error) {               
            return res.status(500).json({message:Config.ERROR_500,errors:error})
    });   
    }else{      
        return res.status(404).json({message:Config.ERROR_404})
    }
       
})




router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(userSchema)
,async function (req,res) {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(405).json({message:Config.ERROR_405, errors: errors.array() });
    }
    
    await Database.User.findOne({where: { Email:req.body.email   }
    }).then(function(response) { 
        if (response){                              
            return res.status(400).json({message:"Email error"})
        }else{
            var Passwordhash = bcrypt.hashSync(req.body.Password, salt);
        Database.User.create({
        Name : req.body.name,
        Birthday : req.body.birthday,
        Sex : req.body.sex,
        Email : req.body.email,
        Phone : req.body.phone,
        Address : req.body.address,
        Country : req.body.country,
        City : req.body.city,
        FacultyId : req.body.facultyId,
        DepartmentId : req.body.departmentId,
        FieldId : req.body.fieldId,
        TypeStudy : req.body.typeStudy,
        FormStudy : req.body.formStudy,
        YearStudy : req.body.yearStudy,
        Additional : req.body.additional,
        Photo : req.body.photo,
        Access : req.body.access,
        Status : req.body.status,
        Password : passwordhash
}).then(function(response){
    if (response){
        
        return res.status(200).json({message:Config.ERROR_200,Id:response['dataValues']['Id']})

    }else{
       
        return res.status(400).json({message:Config.ERROR_400})
    }
}).catch(error => {
         return res.status(500).json({message:Config.ERROR_500,errors:error['errors']})
});

            
        }
         
       }).catch(error =>{
        return res.status(500).json({message:Config.ERROR_500,errors:error})
           
       })
     
    

})

router.put('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT]),validate(userSchema),async function  (req, res) {    
    const dataId = req.params.id
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(405).json({message:Config.ERROR_405, errors: errors.array() });
    }

    if (!canEditProfile(req.user, dataId)) {
        return res.status(401).json({message:Config.ERROR_401})
      }
      UpdateData={
        name : req.body.name,
        birthday : req.body.birthday,
        sex : req.body.sex,        
        phone : req.body.phone,
        address : req.body.address,
        country : req.body.country,
        city : req.body.city,
        facultyId : req.body.facultyId,
        departmentId : req.body.departmentId,
        fieldId : req.body.fieldId,
        typeStudy : req.body.typeStudy,
        formStudy : req.body.formStudy,
        yearStudy : req.body.yearStudy,
        additional : req.body.additional,
        photo : req.body.photo,
        access : req.body.access,
        status : req.body.status
      }
        //Check User Role 

      if(req.user.role == Config.ROLE.ADMIN ){

        await Database.User.findOne({where: { 
          Email: { [Op.eq]: req.body.email},
            Id : {[Op.ne]:dataId }
            }
      }).then(async function(response) { 
          if (response){                              
         return res.status(400).json({message:"Email already exists"})             
          }else{
            UpdateData.email = req.body.email
            //Update Data

      await Database.User.update(   UpdateData,
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
 
        }
         
    }).catch(error =>{
     return res.status(500).json({message:Config.ERROR_500,errors:error})
        
    })               

      }else{
          //Update Data

      await Database.User.update(   UpdateData,
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
 
      }





     
     
    

    
 })
 


async function setData(req, res, next){
    const dataId = req.params.id   
   
    await Database.User.findOne({
        where: {
            Id: dataId
        }
    }).then(function(result) {
       
        req.data = result
       }).catch(error =>{
        return res.status(500).json({message:Config.ERROR_500,errors:error})
           
       })     
    
   

    if (req.data == null){
        
        return res.status(404).json({message:Config.ERROR_404})
    }
    next()
}

module.exports = router