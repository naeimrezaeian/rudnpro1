const Config = require('../config.js');
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
const bcrypt = require('bcryptjs');
const Database=require('../Db');
var redisClient = redis.createClient({
   // host:'192.168.0.157'
    host:Config.REDIS_HOST
});
var jwtr = new JWTR(redisClient);


async function authUser(req,res,next){  
    userId=req.body.id
    userEmail=req.body.email
    userPassword=req.body.password
   
     if(userEmail){
        User = await Database.User.findOne({
            where: {
                email: userEmail,
                status: 1
            }
        })
        if (User){      
               const validPassword= bcrypt.compareSync(userPassword,User['dataValues']['password']) 
               if(!validPassword){
                   return res.status(400).json({message:"You need to sign in"})
               }
            req.user={id:User['dataValues']['id'],role:User['dataValues']['access']}
            next()
        }else{
            return res.status(400).json({error:{message:'You need to sign in'}})
             

        }
     }else{
        return res.status(400).json({error:{message:'You need to sign in'}})  
        

     }

     
    
    
}

function authRole(role){
   
    return (req,res,next) =>{
      
        if (!role.includes(req.user.role)) {
           
            return res.status(401) .json({error:{message:'Not allowed'}}) 
           
        }

        
        next()
    }
}

function authChek(req,res,next){
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwtr.verify( token, Config.ACCESS_TOKEN_SECRET)
    .then((data)=>{              
        req.user = data        
        next()
    })
    .catch((error)=>{
        res.sendStatus(403)
      
    });
    
}


module.exports={
    authUser,
    authRole,
    authChek
}