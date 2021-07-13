const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { subgroupstudentSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()
//SubGroupId,StudentId,Status


router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.SubGroupStudent.findOne({
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

router.get('/Filter/:subgroupid/:userid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
   const SubGroupId = req.params.subgroupid
   const UserId = req.params.userid

   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};    
   
   if (SubGroupId !=0){  where.subgroupId=SubGroupId } 
   if (UserId !=0){  where.userId=UserId } 
   
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.SubGroupStudent.findAndCountAll({
      where: where,
      ...limits,
      attributes:['id','userId','subgroupId',[Database.Sequelize.col('subgroup.title'), 'subgroupTitle'],
       [Database.Sequelize.col('user.name'), 'usrerName'],[Database.Sequelize.col('user.photo'), 'photo'],
      
    ],
      include:[
          { model:Database.SubGroup,attributes: []},
          { model:Database.User,attributes: []},
      ],
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

router.get('/Filter/:groupid',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
const GroupId = req.params.groupid


const offset = parseInt(req.params.offset) || 0
const limit = parseInt(req.params.limit) || 0    

let where = {status: 1};
let limits = {};    


if (GroupId !=0){  where['$subgroup.groupId$']=GroupId }  

if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

    await Database.SubGroupStudent.findAndCountAll({
    where: where,
    ...limits,
    raw:true,
    group: ['subgroupId'],
    attributes:['id','subgroupId',[Database.Sequelize.col('subgroup.title'), 'subgroupTitle'],
    [Database.Sequelize.fn("COUNT", Database.Sequelize.col("subgroupId")), "groupCount"]
],
    include:[
        { model:Database.SubGroup,attributes: []},
        
    ],
}).then( result =>{    
    if (result){        
        metadata = {offset:offset,limit:limit,total:result.count.length}
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
            itemsDelete = await Database.SubGroupStudent.destroy({ 
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

   
    
    router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(subgroupstudentSchema),
    FindDuplicate(Database.SubGroupStudent,["subGroupId","studentId"])
,async function (req,res) {  
   //SubGroupId,StudentId,Status
    Database.SubGroupStudent.create({                  
        groupId: req.body.subGroupId,    
        userId: req.body.studentId,
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




   module.exports = router