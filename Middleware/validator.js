const { body, validationResult } = require('express-validator')
const Config = require('../config.js');
const userStatusSchema =[
  body('status').isInt(),
]
const userSchema = [
body('name').isLength({ min: 3 }),
body('birthday').isDate({format: 'YYYY-MM-DD'}),
body('sex').isBoolean(),
body('email').isEmail(),
body('phone').isLength({ min: 3 }),
body('address').isLength({ min: 3 }),
body('country').isLength({ min: 3 }),
body('city').isLength({ min: 3 }),
body('facultyId').isInt(),
body('departmentId').isInt(),
//body('fieldId').isInt(),
body('typeStudy').isInt(),
//body('formStudy').isInt(),
body('yearStudy').isLength({ min: 9,max:9 }),
body('additional').isLength({ min: 3 }),
body('photo').isLength({ min: 3 }),
body('access').isLength({ min: 3 }),
body('status').isInt(),
body('password').isLength({ min: 3 })
 
 ];
 const facultySchema = [
  body('title').isLength({ min: 3 }),
  body('address').isLength({ min: 3 }),
  body('phone').isLength({ min: 3 }),
  body('email').isEmail(),
  body('description').isLength({ min: 3 }),
  body('photo').isLength({ min: 3 }),
  body('status').isInt()
 ];

 const departmentSchema = [
  body('facultyId').isInt(),
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 3 }),  
  body('status').isInt()
 ];

 const fieldSchema = [
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 3 }),
  body('departmentId').isInt(),
  body('courseCode').isInt(),
  body('status').isInt()
 ];

 const subjectSchema = [
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 3 }),
  body('fieldId').isInt(),
  body('image').isLength({ min: 3 }),

 ]

 const modelSchema = [
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 3 }),  
  body('subjectId').isInt(),
  body('urlModel').isLength({ min: 3 }),
  //body('parameters').isLength({ min: 3 }),
  body('generalModel').isBoolean(),
  body('status').isInt()
 ]

const faqSchema = [
  body('groupId').isInt(),
  body('question').isLength({ min: 3 }),
  body('answer').isLength({ min: 3 }),
  body('status').isInt()
]
const groupSchema = [  
  body('title').isLength({ min: 3 }),
  body('yearStudy').isLength({ min: 9,max:9 }),
  body('typeStudy').isInt(),
  body('description').isLength({ min: 3 }),
  body('status').isInt()
]

const groupstudentsSchema = [
  body('groupId').isInt(),
  body('userId').isLength({ min: 36,max:36 }),,
]

const grouprelationSchema = [
  body('groupId').isInt(),
  body('userId').isInt(),
  body('subjectId').isInt(),
  body('status').isInt()

]

const chatroomSchema = [
  body('roomName').isLength({ min: 3 }),
  body('roomAccess').isInt(),
  body('status').isInt()
]

const chatSchema = [
  body('senderId').isInt(),
  body('reciverId').isInt(),
  body('roomId').isInt(),
  body('content').isLength({ min: 1 }), 
  body('status').isInt()
]

const questionSchema = [
  body('userId').isLength({ min: 30 }),
  body('subjectId').isInt(),
  body('questionContent').isLength({ min: 3 }), 
  body('questionType').isInt(),
  body('questionScore').isInt(),
  body('model').isInt(),
  body('status').isInt()
]


const variantSchema = [
  body('title').isLength({ min: 3 }), 
  body('groupRelationId').isInt(),
  body('status').isInt()
]


const variantquestionSchema = [
  body('questionId').isInt(),
  body('variantId').isInt(),
  body('status').isInt()
]

const examSchema = [
  body('title').isLength({ min: 3 }), 
  body('groupId').isInt(),
  body('teacherId').isInt(),
 // body('ExamDateTime').isDate({format: 'YYYY-MM-DD hh:mm:ss'}),
  body('examDuration').isInt(),
  body('examLimit').isInt(),
  body('descriptionShort').isLength({ min: 3 }), 
  body('description').isLength({ min: 3 }), 
  body('examImage').isLength({ min: 3 }), 
  body('examSetting').isLength({ min: 1 }),  
  body('status').isInt(),
]
//ExamDocument
//ExamId,ExamFile,Status
const examdocumentSchema = [
  body('examId').isInt(),
  body('examFile').isLength({ min: 1 }),
  body('status').isInt(),
]
//examScore
//ExamId,StudentId,QuestionId,Score1,Score2,Status
const examscoreSchema = [
  body('examId').isInt(),
  body('studentId').isInt(),
  body('questionId').isInt(),
  body('score1').isInt({min:0,max:100}),
  body('score2').isInt({min:0,max:100}),
  body('status').isInt(),
]
//examComment
//ExamId,StudentId,QuestionId,Comment,Status
const examcommentSchema = [
  body('examId').isInt(),
  body('studentId').isInt(),
  body('questionId').isInt(),
  body('comment').isLength({ min: 1 }),
  body('status').isInt(),
]
//examRating
//ExamId,StudentId,Ratting,Comment,Status
const examratingSchema = [
  body('examId').isInt(),
  body('studentId').isInt(),
  body('ratting').isInt(),
  body('comment').isLength({ min: 1 }),
  body('status').isInt(),
]

//SubGroup
//Title,GroupId,Status
const subgroupSchema = [
  body('title').isLength({ min: 1 }),
  body('groupId').isInt(),  
  body('status').isInt(),
]

//SubGroupStudent
//SubGroupId,StudentId,Status
const subgroupstudentSchema = [
  body('subGroupId').isInt(),
  body('studentId').isLength({ min: 1 }),
  body('status').isInt(),
]
//SystemAlert
//EventId,EventType,StudentId,Message,Status
const systemalertSchema = [
  body('eventId').isInt(),
  body('eventType').isInt(),
  body('userId').isLength({ min: 1 }),
  body('message').isLength({ min: 1 }),
  body('status').isInt(),
]

//subjectUserSchema
const subjectUserSchema = [
  body('userId').isLength({ min: 1 }),
  body('subjectId').isInt(),
  
]

const fileuploadSchema = [
  //body('file').isLength({ min: 5 }),
  
]
//permissionSchema
const permissionSchema = [
  body('title').isLength({ min: 1 }),
  body('tag').isLength({ min: 1 }),
]
//permissionuserSchema
const permissionuserSchema=[
  body('userId').isLength({ min: 30 }),
  body('permissionId').isLength({ min: 1 }), 
  body('access').isInt(),

]
 const validate = (schemas)  => {
    return async (req, res, next) => {
      await Promise.all(schemas.map((schema) => schema.run(req)));

      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors = result.array();
      return res.status(405).json({message:Config.ERROR_405, errors: errors });
       };
  }
module.exports = {
  userSchema,
  userStatusSchema,
  facultySchema,
  departmentSchema,
  fieldSchema,
  subjectSchema,
  modelSchema,
  faqSchema,
  groupSchema,
  groupstudentsSchema,
  grouprelationSchema,
  chatroomSchema,
  chatSchema,
  questionSchema,
  variantSchema,
  variantquestionSchema,
  examSchema,
  examdocumentSchema,
  examscoreSchema,
  examcommentSchema,
  examratingSchema,
  subgroupSchema,
  subgroupstudentSchema,
  fileuploadSchema,
  systemalertSchema,
  subjectUserSchema,
  permissionSchema,
  permissionuserSchema,
  validate,
}