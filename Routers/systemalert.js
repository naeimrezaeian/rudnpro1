const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { systemalertSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()


router.get('/Notification/:offset/:limit',authChek,
authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]),
async function (req, res)  {  
    const offset = parseInt(req.params.offset) || 0
    const limit = parseInt(req.params.limit) || 0    
 
    let where = {status: 1};
    where.userId=req.user.id
   
    let limits = {};    
    if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

 
 
//Database.SystemAlertEvent.hasMany(Database.SystemAlert, {foreignKey: 'id'});
//Database.SystemAlert.belongsTo(Database.SystemAlertEvent, {foreignKey: 'eventId'});

Database.SystemAlert.findAndCountAll({ 
    where: where,
    ...limits,
  include: { model: Database.SystemAlertEvent  , attributes: ['event'] }
  }).then(result =>{  
    if (result){  
        const resObj = result.rows.map(data => {
            return Object.assign(
              {},{
                id: data.id,
                eventType: data.eventType,
                message: data.message,
                alertDateTime: data.alertDateTime,
                event: data.systemalertevent.event
      
              })
               })// resObj 
               metadata = {offset:offset,limit:limit,total:result.count}
               return res.status(200).json({  data :{items:resObj,metadata:metadata} }) 
    }else{
        return res.status(404).json({message:Config.ERROR_404})

    }

    
  
  }).catch(error => {
    return res.status(500).json({message:Config.ERROR_500,errors:error})      
  })  

})  


router.get('/NotificationCount/',authChek,
authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]),
async function (req, res)  {   

    let where = {status: 1 };    
    where.userId = req.user.id
    await Database.SystemAlert.findAndCountAll({
        where: where,        
  
    }).then( result =>{    
      if (result){        
       
      return res.status(200).json({total:result.count}) 
      }else{
          return res.status(404).json({message:Config.ERROR_404})
      }   
    }).catch(error => {
      return res.status(500).json({message:Config.ERROR_500,errors:error})      
    })
    
      
    
    
})

router.get('/Filter/:eventid/:eventtype/:studentid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
   
   const EventId = req.params.eventid
   const EventType = req.params.eventtype
   const StudentId = req.params.studentid
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    
    
   let where = {status: 1};
   let limits = {};   
     
   if (EventId !=0){  where.EventId=EventId } 
   if (EventType !=0){  where.EventType=EventType }   
   if (StudentId !=0){  where.StudentId=StudentId } 
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.SystemAlert.findAndCountAll({
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



    router.delete('/',authChek,
    authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), 
    async function(req, res)  {
        items=req.body.items
       
        if (items !=null){                     
            itemsDelete = await Database.SystemAlert.destroy({ 
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

   
    
    router.post('/',authChek,authRole([Config.ROLE.ADMIN]),validate(systemalertSchema)
,async function (req,res) {
    const Id=req.user.id  

    Database.SystemAlert.create({                  
        eventId: req.body.eventId,    
        eventType: req.body.eventType, 
        userId: req.body.userId, 
        message: req.body.message, 
        alertDateTime: req.body.alertDateTime,        
        status : req.body.status
       
}).then(async function(response){
    if (response){   
        //socket  
        let where = {status: 1 };    
    where.userId = req.body.userId
    await Database.SystemAlert.findAndCountAll({
        where: where,        
  
    }).then( result =>{    
      if (result){    
        var socket = req.app.get('socketIo');
        var client = req.app.get('client');
        
         client.smembers("keyuser:"+req.body.userId,(err,data)=>{    
            
            if (err) throw err;
            if (data !=null){
              data.map(user =>{                  
                socket.to(user).emit('ans', result.count);
              })
            }
           })    
       
     
      } 
    })
        
         //socket.emit('ans', '100');   
        return res.status(200).json({message:Config.ERROR_200,Id:response['dataValues']['Id']})
    }else{
       
        return res.status(400).json({message:Config.ERROR_400})
    }
}).catch(error => {
         return res.status(500).json({message:Config.ERROR_500,errors:error})
});

})


router.put('/:id',authChek,authRole([Config.ROLE.ADMIN]),validate(systemalertSchema),
async function  (req, res) {   

   
    const dataId = parseInt(req.params.id)  
   
     await Database.SystemAlert.update(
        {
            eventId: req.body.eventId,    
            eventType: req.body.eventType, 
            userId: req.body.userId, 
            message: req.body.message, 
            alertDateTime: req.body.alertDateTime,        
            status : req.body.status
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