const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const router = express.Router()
const { canViewProfile, scopedData,canEditProfile } = require('../Permissions/profile')
const { validationResult } = require('express-validator');
const { userStatusSchema,userSchema, validate } = require('../Middleware/validator.js');
const { authUser,authRole,authChek }=require('../Middleware/Auth')
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient({
  host:Config.REDIS_HOST
});

var jwtr = new JWTR(redisClient);


router.post('/Login',authUser, async function (req, res)  {
  
  const user=req.user  
  const accessToken = await jwtr.sign(user, Config.ACCESS_TOKEN_SECRET,{ expiresIn: 60 * 60 * 2 })
  return res.status(200).json({ accessToken: accessToken })   
  })

  router.get('/Logout',async function (req,res){  
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]    
    if (token == null) return res.sendStatus(401)
    jwtr.verify( token, Config.ACCESS_TOKEN_SECRET)
    .then((data)=>{ 
       jwtr.destroy(data.jti) 
       return res.status(200).json({message:'Logout successfully'})
    })
    .catch((error)=>{
      return res.status(400).json({message:'Logout error'})
    });
  })
  
  router.get('/Search/:name/:offset/:limit'
  ,authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER])
  , async function(req, res)  {
    const offset = parseInt(req.params.offset) || 0
    const limit = parseInt(req.params.limit) || 0 
    let limits = {};
    if (limit != 0 ){   limits={offset: offset,limit: limit  }     }
  
    await Database.User.findAndCountAll({
      attributes: {  
        exclude: ['createdAt', 'updatedAt'],
        include: [
       [Database.Sequelize.col('field.title'), 'fieldTitle'],
       [Database.Sequelize.col('field->department.id'), 'departmentId'],[Database.Sequelize.col('field->department.title'), 'departmentTitle'],
       [Database.Sequelize.col('field->department->faculty.id'), 'facultyId'],[Database.Sequelize.col('field->department->faculty.title'), 'facultyTitle']
  ]
     },
     include:[
     { 
     model: Database.Field , attributes: [],
     include:{ model:Database.Department,attributes: [],
     include:{ model:Database.Faculty,attributes: []}}
    }
     ],
      where: {
        name: {
            [Database.Sequelize.Op.like]:  ''+req.params.name +'%' 
        }
      },
      ...limits,
      raw:true,
    }).then(result => {        
    metadata = {offset:offset,limit:limit,total:result.count}
    return res.status(200).json({  data :{items:result.rows,metadata:metadata} })   
      }).catch(error => { 
        return res.status(500).json({message:Config.ERROR_500,errors:error})
   });
    

    

  })
  router.get('/Filter/:search/:usertype/:facultyid/:departmentid/:fieldid/:yearStudy/:offset/:limit'
  ,authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER])
  , async function(req, res)  {
    const UserType = req.params.usertype  || 0  
    const YearStudy = req.params.yearStudy  || 0  
    const FacultyId = req.params.facultyid  || 0  
    const DepartmentId = req.params.departmentid  || 0  
    const FieldId = req.params.fieldid  || 0
    const offset = parseInt(req.params.offset) || 0
    const limit = parseInt(req.params.limit) || 0 
     Search = req.params.search || 0
    if (Search==0){
      Search=''
         }
    let limits = {};
    if (limit != 0 ){   limits={offset: offset,limit: limit  }     }
    let where= { 
      name: {
        [Database.Sequelize.Op.like]:  ''+Search +'%' 
    }

     }
    if (FacultyId !=0){  where['$field->department->faculty.id$']=FacultyId }  
    if (DepartmentId !=0){  where['$field->department.id$']=DepartmentId }  
    if (FieldId !=0){  where.fieldId=FieldId }  
    if (YearStudy !=0){  where.yearStudy=YearStudy }
    if (UserType !=0){  
      if (UserType == 1){  where.access="admin"}
      if (UserType == 2){  where.access="teacher"}
      if (UserType == 3){  where.access="student"}
     
     }  
     if (Search!=0){
     // where[Database.Sequelize.Op.like]={ name: ''+Search +'%' } 
     }
     console.log(where)
       await Database.User.findAndCountAll({
        where: {  ...where     },
        ...limits,
        attributes: {  
          exclude: ['createdAt', 'updatedAt'],
          include: [
         [Database.Sequelize.col('field.title'), 'fieldTitle'],
         [Database.Sequelize.col('field->department.id'), 'departmentId'],[Database.Sequelize.col('field->department.title'), 'departmentTitle'],
         [Database.Sequelize.col('field->department->faculty.id'), 'facultyId'],[Database.Sequelize.col('field->department->faculty.title'), 'facultyTitle']
    ]
       },
       include:[
       { 
       model: Database.Field , attributes: [],
       include:{ model:Database.Department,attributes: [],
       include:{ model:Database.Faculty,attributes: []}}
      }
       ],
    }).then(result => { 
       
        
    metadata = {offset:offset,limit:limit,total:result.count}
    return res.status(200).json({  data :{items:result.rows,metadata:metadata} })   
      }).catch(error => { 
        console.log(error)
        return res.status(500).json({message:Config.ERROR_500,errors:error})
   });
    
    }) 

    router.get('/:id'
    ,authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER])
    , async function(req, res)  {
      const Id = req.params.id  || 0 
      let where= {  status: 1,id:Id      }

      if (req.user.role != Config.ROLE.ADMIN){
        where={id: req.user.id,status: 1 }
    }
      await Database.User.findOne({
        where: {  ...where     },       
       
        attributes: {  
          exclude: ['createdAt', 'updatedAt'],
          include: [
         [Database.Sequelize.col('field.title'), 'fieldTitle'],
         [Database.Sequelize.col('field->department.id'), 'departmentId'],[Database.Sequelize.col('field->department.title'), 'departmentTitle'],
         [Database.Sequelize.col('field->department->faculty.id'), 'facultyId'],[Database.Sequelize.col('field->department->faculty.title'), 'facultyTitle']
    ]
       },
       include:[{ model: Database.Field , attributes: [],
       include:{ model:Database.Department,attributes: [],
       include:{ model:Database.Faculty,attributes: ['title']}}
      }
       ],
    }).then(result => {        
        
   
    return res.status(200).json({  data :result })   
      }).catch(error => { 
        return res.status(500).json({message:Config.ERROR_500,errors:error})
   });

    })

router.delete('/',authChek,authRole([Config.ROLE.ADMIN]), async function(req, res)  {
      items=req.body.items
    
      if (items !=null){                          
          itemsDelete = await Database.User.destroy({ where: { id: items }}).then(function(response){ 
              
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
            return res.status(400).json({message:"Email Error"})
        }else{
           
        Database.User.create({
        Name : req.body.name,
        Birthday : req.body.birthday,
        Sex : req.body.sex,
        Email : req.body.email,
        Phone : req.body.phone,
        Address : req.body.address,
        Country : req.body.country,
        City : req.body.city,       
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
 

  router.put('/Status/:id',authChek,authRole([Config.ROLE.ADMIN,]),validate(userStatusSchema),async function  (req, res) {  
    const dataId = req.params.id
    UpdateData={    
      status : req.body.status
    }
    await Database.User.update(   UpdateData,
      { where: {id: dataId}}
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