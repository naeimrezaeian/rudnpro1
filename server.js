const Config = require('./config.js');
const express = require('express')
const Routers=require('./Routers');
const sockets = require("socket.io");
const app=express()
const redis = require("redis");
//const client = redis.createClient();
const redisAdapter = require('socket.io-redis')
var JWTR =  require('jwt-redis').default;
var client = redis.createClient({
  host:Config.REDIS_HOST
});
var jwtr = new JWTR(client);

client.on("error", function(error) {
  console.error(error);
});
//  client.keys('keyusers:*', (err, keys) => {
//   console.log(keys)
//  });
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
app.use('/api/SubjectUser', Routers.SubjectUser)
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
app.use('/api/Helper', Routers.Helper)
app.use('/api/Helper', Routers.Helper)
app.use('/api/Permission', Routers.Permission)
app.use('/api/PermissionUser', Routers.PermissionUser)
app.get('/',cors(),(req,res)=>{  
    res.sendStatus(200)  
    
})
//Socket 
const bindListeners = (io) => { 
  io.on('connection', (socket) => {   
    //
    //console.log(`${socket.id} connected`)
    socket.emit("newToken", {'socketid':socket.id,'uuid':socket.decoded.id});

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
}

//End Socket

server = app.listen(Config.PORT, () => {
    console.log('Server is listening on Port:', Config.PORT)
  })
const io = sockets(server, {cros:{origin: '*',}, transports: [ 'websocket', 'polling' ]})
//io.adapter(redisAdapter({ host: 'redis-11994.c267.us-east-1-4.ec2.cloud.redislabs.com', port: 11994,password: 'FrxCtEwUM5hbqu50stZ22k0IGyS46j5e' }))
io.adapter(redisAdapter({ host: Config.REDIS_HOST}))

io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){

    jwtr.verify( socket.handshake.query.token, Config.ACCESS_TOKEN_SECRET)
    .then((data)=>{              
      //console.log(data)    
      socket.decoded = data;  
        next()
    })
    .catch((error)=>{
      console.log("token error")
      next(new Error('Authentication error'));
      socket.disconnect();
       
    });
  }else{
    console.log("token error")
      next(new Error('Authentication error'));
      socket.disconnect();
  }
 
})

bindListeners(io)

//app.set('view engine', 'ejs');
app.set('socketIo', io);
app.set('client', client);