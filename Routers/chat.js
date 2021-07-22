const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { chatSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()
const { QueryTypes, EmptyResultError } = require('sequelize');
const { Op } = require("sequelize");
const { RoomUser } = require('../Db');
const  TimeAgo =require( 'javascript-time-ago')
const ru  = require( 'javascript-time-ago/locale/ru');
const  months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

TimeAgo.addLocale(ru)
const timeAgo = new TimeAgo('ru-RU')
router.get('/List',
authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), 
async function (req, res)  {
const uuid = req.user.id
SqlQuery=`select * from (
  select topPart.id,topPart.isGroup,topPart.createDate,topPart.userId,topPart.roomId,topPart.name,topPart.photo,m.msgContent,m.msgFile from (
  select part.id,part.isGroup,part.createDate,part.userId,part.roomId,part.name,part.photo,part.messageId,max(part.maxMessageId) as message from (
  select part1.* from (
  select mr.id,mr.isGroup,mr.createDate,mr.creatorId as userId,mr.roomId,mr.messageId,MAX(mr.messageId)  as maxMessageId ,u.name,u.photo
  from message_recipients as mr
  LEFT OUTER JOIN users as u On u.id = mr.creatorId
  
  where  mr.recipientId=:uuid  and mr.isGroup = false  GROUP BY creatorId  ) as part1
  
  union 
  
  select part2.* from (
  select mr.id,mr.isGroup,mr.createDate ,mr.recipientId as userId ,mr.roomId,mr.messageId,MAX(mr.messageId)  as maxMessageId ,u.name,u.photo
  from message_recipients as mr
  LEFT OUTER JOIN users as u On u.id = mr.recipientId
  where  mr.creatorId=:uuid  and mr.isGroup = false  GROUP BY mr.recipientId  ) as part2
  ) as part
  GROUP BY part.userId) as topPart
  LEFT OUTER JOIN messages as m On m.id = topPart.message
  
  union 
  select partGroup.id,partGroup.isGroup,partGroup.createDate,partGroup.creatorId,partGroup.roomId,partGroup.roomName,partGroup.photo,m.msgContent,m.msgFile from (
  SELECT mr.id,mr.isGroup,mr.createDate,mr.creatorId,mr.roomId,r.roomName, COALESCE(null) AS photo,max(mr.messageId) as messageId
  FROM message_recipients as mr 
  LEFT OUTER JOIN rooms as r On r.id = mr.roomId
  where  mr.isGroup = true and mr.roomId IN (SELECT roomId FROM room_users WHERE userId = :uuid) group by  roomId) as partGroup
  LEFT OUTER JOIN messages as m On m.id = partGroup.messageId) as ChatList 
  order by ChatList.createDate desc`
  await Database.sequelize.query(SqlQuery,
      {
        replacements: { uuid: uuid },
        type: QueryTypes.SELECT
      }


  ).then( result =>{
    
    const resObj = result.map(data => {
      return Object.assign(
        {},{
          id:data.id,
          userId:data.userId, 
          name:data.name  ,  
          photo:data.photo,       
          isGroup:data.isGroup,                  
          roomId: data.roomId,
          rooomName:data.roomName,
          createDate:new Date(data.createDate).getDay()+" "+ months[new Date(data.createDate).getMonth()],
          messageContet:data.msgContent,
          messageFile:data.msgFile

        }) 
         })
         return res.status(200).json({  data : resObj })
        
  }  ).catch(error => {
    return res.status(500).json({message:Config.ERROR_500,errors:error})   
  })
     
})
 

router.get('/Feed/:userId/:roomId/:offset/:limit',
authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), 
async function (req, res)  {
  let limits = {};   
  let where = {};
  let include = {};
const UserId = req.params.userId || 0
const RoomId = req.params.roomId || 0
const offset = parseInt(req.params.offset) || 0
const limit = parseInt(req.params.limit) || 0 
const uuid = req.user.id
if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

if (  (uuid===String(UserId)) || (UserId!=0 & RoomId!=0 ) ){  
  return res.status(404).json({message:Config.ERROR_404})
}

if (UserId!=0){ 
  where = {
    [Op.or]: [
      { [Op.and]: [
        { creatorId: UserId },
        { recipientId: uuid }
      ] },
      { [Op.and]: [
        { creatorId: uuid},
        { recipientId: UserId }
      ] }
    ]
  }

  //
  await Database.MessageRecipient.findAndCountAll({
    attributes:['id','isGroup','createDate','creatorId','recipientId'],      
    where: where,    
    order: [    ['createDate', 'DESC'],  ],    
    ...limits,
    raw:false,   
     include:[{model:Database.User,as:'creator',attributes:['name','photo'] },
     {model:Database.User,as:'recipient',attributes:['name','photo'] },
     {model:Database.Message,attributes:['msgContent','msgFile'] }],   
  }).then( result =>{   
   //console.log(result)
  if (result.rows){   
    
    var obj =result.rows.map(data => {    
      return Object.assign({},{
      id:data.id,     
      //isGroup:data.isGroup,
      createDate:data.createDate,
      timeAgo:timeAgo.format(new Date(data.createDate)),
      creatorId:data.creatorId,
      creatorName:data.creator.name,
      creatorPhoto:data.creator.photo,
      //recipientId:data.recipientId,
      //recipientName:data.recipient.name,
      //recipientPhoto:data.recipient.photo,
      msgContent:data.message.msgContent,
      msgFile:data.message.msgFile,
       })  
    })
       metadata = {offset:offset,limit:limit,total:result.count}
     
 return res.status(200).json({  data :{items:obj,metadata:metadata} } ) 
  
  }else{
      return res.status(404).json({message:Config.ERROR_404})
  }   
  }).catch(error => {
   return res.status(500).json({message:Config.ERROR_500,errors:error})      
  })


}


if(RoomId!=0){
  await Database.RoomUser.findOne({
    where: {
      userId: uuid,
        roomId: RoomId
    }
}).then( result =>{    
  if (result){        
     
//

where = { roomId: RoomId },

  


 Database.MessageRecipient.findAndCountAll({
  attributes:['id','isGroup','createDate','creatorId','recipientId'],      
  where: where,
  order: [    ['createDate', 'DESC'],  ],    
  ...limits,
  raw:false,   
   include:[{model:Database.User,as:'creator',attributes:['name','photo'] },
   {model:Database.User,as:'recipient',attributes:['name','photo'] },
   {model:Database.Message,attributes:['msgContent','msgFile'] }],   
}).then( result =>{   
 
if (result.rows){   
  
  var obj =result.rows.map(data => {    
    return Object.assign({},{
    id:data.id,     
   
    createDate:data.createDate,
    timeAgo:timeAgo.format(new Date(data.createDate)),
    creatorId:data.creatorId,
    creatorName:data.creator.name,
    creatorPhoto:data.creator.photo,
   
    msgContent:data.message.msgContent,
    msgFile:data.message.msgFile,
     })  
  })
     metadata = {offset:offset,limit:limit,total:result.count}
   
return res.status(200).json({  data :{items:obj,metadata:metadata} } ) 

}else{

    return res.status(404).json({message:Config.ERROR_404})
}   
}).catch(error => {
 return res.status(500).json({message:Config.ERROR_500,errors:error})      
})


//

  }else{
      return res.status(404).json({message:Config.ERROR_404})
  }   
}).catch(error => {
  return res.status(500).json({message:Config.ERROR_500,errors:error})      
})


//



}



})

router.post('/',
authChek,
authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]),
async function (req,res,next) { 
  const uuid = req.user.id
  //const uuid="962c20a8-682c-4c46-b1a5-4e26556f223f"
  const RoomId = req.body.roomId || 0
  const RecipientId =  req.body.recipientId || 0;
  const msgContent = req.body.msgContent;
  const msgFile = req.body.msgFile;
  let addMessage= false;
  let messagerecipient={
    isGroup:0,  
    creatorId:uuid,
    recipientId:null,
    roomId:null}

 
  if (RoomId && RecipientId){    
    return res.status(404).json({message:"Parametrs error"})
  }else{ 
    if (RoomId !=0){      
      messagerecipient.roomId=RoomId,
      messagerecipient.isGroup = 1 
      // Check User in Group 
      await Database.RoomUser.findOne({
        where: {userId: uuid,roomId: RoomId }
    }).then( result =>{    
      if (!result){ 
          return res.status(404).json({message:"Group Access Error "})
         
        }else{
          addMessage=true;
        }  
    }).catch(error => {       
      return res.status(500).json({message:Config.ERROR_500,errors:error})      
    })
    }

    if (RecipientId !=0){      messagerecipient.recipientId=RecipientId , addMessage=true;   }
    
if(addMessage){
  
    Database.Message.create({ msgContent: msgContent, msgFile:msgFile })
  .then(result =>{    
    messagerecipient.messageId=result.id
    
    Database.MessageRecipient.create(messagerecipient).then(result =>{
      
      Database.MessageRecipient.findAndCountAll({
        where: { id: result.id},
        include:[{model:Database.User,as:'creator',attributes:['name','photo'] }],
        raw:false,
    }).then(result =>{
     
      var obj = result.rows.map(data => {    
        return Object.assign({},{
        id:data.id, 
        createDate:data.createDate,
        timeAgo:timeAgo.format(new Date(data.createDate)),
        creatorId:data.creatorId,
        creatorName:data.creator.name,
        creatorPhoto:data.creator.photo,       
        msgContent:msgContent,
        msgFile:msgFile,
         })  
      })
        
     
    return res.status(200).json( {data: obj[0] } ) 

      

    }).catch(error => {
      console.log(error)
      return res.status(500).json({message:Config.ERROR_500,errors:error})
    });
     
     
    
    }).catch(error => {
      console.log(error)
      return res.status(500).json({message:Config.ERROR_500,errors:error})
    });

  }).catch(error => {   
     console.log("error")
    return res.status(500).json({message:Config.ERROR_500,errors:error})
});

  }
  }
})
   module.exports = router