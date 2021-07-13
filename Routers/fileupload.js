const Config = require('../config.js');
const express = require('express')
const multer  = require('multer')
const crypto = require('crypto')
const { fileuploadSchema, validate } = require('../Middleware/validator.js');
const { authRole,authChek }=require('../Middleware/Auth');

const router = express.Router()


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      let customFileName = crypto.randomBytes(18).toString('hex'),
            fileExtension = file.originalname.split('.')[1]

       cb(null,customFileName+ '.' + fileExtension)
    }
  })
   const fileFilter = (req,file,cb) =>{   
     //application/pdf 
     //image/png
     //image/jpeg

      
         if (file.mimetype === 'image/png' ||
             file.mimetype === 'image/jpeg' ||
             file.mimetype === 'application/pdf' )
         {
          
        cb(null,true)
       }else{
        cb(null,false)
       
       }
       
       
   }
  const  multerupload   = multer({ 
    storage: storage,
    limits:{fileSize:1024 * 1024 * 90},
    fileFilter : fileFilter,
    
})
var upload = multerupload.single('file')

  
router.post('/',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.TEACHER,Config.ROLE.STUDENT])
,async function (req,res) {  
    
    upload( req, res, ( err ) => {
      //console.log(req)
        if ( !req.file ){   
             return res.status(408).json({message:Config.ERROR_408})
        }else{  
              
          return res.status(200).json({  data :{filename:req.file.filename,mimetype:req.file.mimetype,filesize:req.file.size} }) 
             
        }
        
    })   
   
})


     
    

    

 

   module.exports = router