const Config = require('./config.js');
const express = require('express')
const Routers=require('./Routers');
const socket = require("socket.io");
const app=express()
const redis = require("redis");
const client = redis.createClient();
const redisAdapter = require('socket.io-redis')
client.on("error", function(error) {
  console.error(error);
});
// client.keys('keyusers:*', (err, keys) => {
//  console.log(keys)
// });
var cors = require('cors')

app.use(cors())

app.use(express.json({
    verify : (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch(e) {
        return res.status(406).json({message:Config.ERROR_406}) 
        throw new Error('invalid JSON');
      }
    }
  }));

app.use(express.static('uploads'))
app.use('/api/User', Routers.User)
app.use('/api/Profile', Routers.Profile)
app.use('/api/Faculty', Routers.Faculty)
app.use('/api/Department', Routers.Department)
app.use('/api/Field', Routers.Field)
app.use('/api/Subject', Routers.Subject)
app.use('/api/Model', Routers.Model)
app.use('/api/Faq', Routers.Faq)
app.use('/api/Group', Routers.Group)
app.use('/api/GroupStudent', Routers.GroupStudent)
app.use('/api/GroupRelation', Routers.GroupRelation)
app.use('/api/ChatRoom', Routers.ChatRoom)
app.use('/api/Chat', Routers.Chat)
app.use('/api/Question', Routers.Question)
app.use('/api/Variant', Routers.Variant)
app.use('/api/VariantQuestion', Routers.VariantQuestion)
app.use('/api/Exam', Routers.Exam)
app.use('/api/ExamDocument', Routers.ExamDocument)
app.use('/api/ExamScore', Routers.ExamScore)
app.use('/api/ExamComment', Routers.ExamComment)
app.use('/api/ExamRatting', Routers.ExamRatting)
app.use('/api/SubGroup', Routers.SubGroup)
app.use('/api/SubGroupStudent', Routers.SubGroupStudent)
app.use('/api/SystemAlert', Routers.SystemAlert)
app.use('/api/FileUpload', Routers.FileUpload)
app.use('/api/Country', Routers.County)
app.use('/Test', Routers.Test)
app.get('/',cors(),(req,res)=>{  
    res.sendStatus(200)  
    
})


server = app.listen(Config.PORT, () => {
    console.log('Server is listening on Port:', Config.PORT)
  })
var socketIo = socket(server,{cors: {
  origin: '*',
}, transports: [ 'websocket', 'polling' ]})
//socketIo.set('origins', '*:*')
socketIo.adapter(redisAdapter({ host: 'localhost', port: 6379 }))
socketIo.on("connection", function (socket) {  
  console.log(socket.id)  

  socket.emit("newToken", socket.id);

  socket.on('disconnect', function(){     
    client.keys('keyuser:*', (err, keys) => { 
      keys.map(datakey =>{
        client.srem(datakey, socket.id)
     });
      })        
    socket.disconnect();
});

  socket.on("new user", function (data) {
   
      client.sadd("keyuser:"+data,socket.id)
      socket.userId = data; 
    });
  
})
app.set('view engine', 'ejs');
app.set('socketIo', socketIo);
app.set('client', client);