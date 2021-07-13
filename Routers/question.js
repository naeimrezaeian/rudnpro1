const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { questionSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicate }= require('../Middleware/Duplicate')
const router = express.Router()


router.get('/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const Id=req.params.id
        await Database.Question.findOne({
       where: {
           id: Id,
           status: 1
       },
       attributes: {  
       exclude: ['createdAt', 'updatedAt'],      
       include: ['id','questionContent','questionType','questionScore','model',
       'userId',[Database.Sequelize.col('user.name'), 'userName'],[Database.Sequelize.col('user.photo'), 'userPhoto'],
       'subjectId',[Database.Sequelize.col('subject.title'), 'subjectTitle']
     ]},
 
       include :[
           { model: Database.QuestionAnswer, attributes: ['answerContent','answerCorrect'] },
           { model: Database.Subject, attributes: [] },
           { model: Database.User, attributes: [] }
       ]
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
router.get('/Filter/:userid/:subjectid/:offset/:limit',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
  
   const UserId = req.params.userid  || 0    
   const SubjectId = req.params.subjectid  || 0 
  
   const offset = parseInt(req.params.offset) || 0
   const limit = parseInt(req.params.limit) || 0    

   let where = {status: 1};
   let limits = {};    
   
   if (UserId !=0){  where.userId=UserId }       
   if (SubjectId !=0){  where.subjectId=SubjectId }  
   if (limit != 0 ){      limits={ offset: offset,limit: limit }      }

       await Database.Question.findAndCountAll({
      where: where,
      ...limits,
      attributes: {  exclude: ['createdAt', 'updatedAt'],
      
      include: ['id','questionContent','questionType','questionScore','model',
      'userId',[Database.Sequelize.col('user.name'), 'userName'],[Database.Sequelize.col('user.photo'), 'userPhoto'],
      'subjectId',[Database.Sequelize.col('subject.title'), 'subjectTitle']
    ]},

      include :[
          { model: Database.QuestionAnswer, attributes: ['answerContent','answerCorrect'] },
          { model: Database.Subject, attributes: [] },
          { model: Database.User, attributes: [] }
      ]

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



router.delete('/',authChek,authRole([Config.ROLE.ADMIN]), async function(req, res)  {
        items=req.body.items
        if (items !=null){                     
            itemsDelete = await Database.Question.destroy({ 
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

   
 //UserId,SubjectId,QuestionContent,QuestionType,QuestionScore,Model,Status   
router.post('/',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.TEACHER]),validate(questionSchema)
   
,async function (req,res) {  
    const t = await Database.sequelize.transaction();
    try {
    const question= await Database.Question.create({                       
        userId: req.body.userId,   
        subjectId: req.body.subjectId,   
        questionContent: req.body.questionContent,       
        questionType: req.body.questionType, 
        questionScore: req.body.questionScore, 
        model : req.body.model,       
        status : req.body.status
       
}, { transaction: t })
let answers=req.body.answers
answers.forEach(element => {   element.questionId=question.id  });

await Database.QuestionAnswer.bulkCreate(answers, { transaction: t })

await t.commit().then(()=>{
    return res.status(200).json({message:Config.ERROR_200,id:question.id})
});
}catch (error) {

    return res.status(500).json({message:Config.ERROR_500,errors:error})
    //await t.rollback();
  
  }

// .catch(error => {
//          return res.status(500).json({message:Config.ERROR_500,errors:error})
// });

})


    

    

 

   module.exports = router