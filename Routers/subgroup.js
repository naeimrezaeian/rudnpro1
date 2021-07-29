const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { subgroupSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()
const { Op } = require("sequelize");

router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.SubGroup.findOne({
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
router.get('/Filter/:groupid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
  
   const GroupId = req.params.groupid   
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};   
  
   if (GroupId !=0){  where.GroupId=GroupId }     
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.SubGroup.findAndCountAll({
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



router.delete('/',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.TEACHER]), async function(req, res)  {
    items=req.body.items      
    if (items !=null){                     
        itemsDelete = await Database.SubGroup.destroy({ 
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

   

router.post('/',authChek,authRole([Config.ROLE.ADMIN])
,validate(subgroupSchema)
,FindDuplicate(Database.SubGroup,["title","grouprelationId"])

,async function (req,res) {  
    const userarray=req.body.dataArray
   
Database.SubGroup.create({                  
    title: req.body.title,    
    grouprelationId: req.body.grouprelationId, 
    status: req.body.status,
    
}).then( async  function  (response){
if (response){  
   
    let resultArray=[]
    if (typeof userarray !== 'undefined') {
       
    
    if(userarray.length!=0)  {    
       

    userarray.forEach(function (value, index) { 
        userarray[index]={'userId':value['userId'],'subgroupId':response['dataValues']['id']}
      });



       
      await  asyncForEach(userarray,async (dataItem) =>{              
          let where={}
          field=["subgroupId","userId"]
          field.forEach(element => where[element]={ [Op.eq]: dataItem[element]});
          await Database.SubGroupStudent.findOne({
              where: where
          }).then(response =>{                
              if (!response){      resultArray.push(dataItem)           }
          })           
          
        })
      
    




Database.SubGroupStudent.bulkCreate(resultArray).then(function(response){
    if (response){        
        return res.status(200).json({message:Config.ERROR_200})
    }else{
       
        return res.status(400).json({message:Config.ERROR_400})
    }
}).catch(error => {
         return res.status(500).json({message:Config.ERROR_500,errors:error})
});


}else{
    console.log("2")
    return res.status(200).json({message:Config.ERROR_200})
}
}
}

}).catch(error => {
   console.log(error)
        return res.status(500).json({message:Config.ERROR_500,errors:error})
});

})


   
router.post('/old',authChek,authRole([Config.ROLE.ADMIN]),validate(subgroupSchema),
FindDuplicate(Database.SubGroup,["title","groupId"])

,async function (req,res) {  

Database.SubGroup.create({                  
    Title: req.body.title,    
    GroupId: req.body.groupId, 
    Status: req.body.status,
    
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


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(subgroupSchema),
FindDuplicate(Database.SubGroup,["title","grouprelationId"]),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.SubGroup.update(
        {
        title: req.body.title,    
        grouprelationId: req.body.grouprelationId, 
        status: req.body.status,
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
 
 async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


   module.exports = router