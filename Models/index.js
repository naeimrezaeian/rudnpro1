const User = require('./user.js');
const Faculty = require('./faculty.js');
const Department= require('./department')
const Field = require('./field.js');
const Subject = require('./subject.js');
const Model = require('./model.js');
const Faq = require('./faq.js');
const Group = require('./group.js');
const GroupStudent = require('./groupstudent.js');
const GroupRelation = require('./grouprelation.js');
const ChatRoom = require('./chatroom.js');
const Chat = require('./chat.js');
const Question = require('./question.js');
const QuestionAnswer =  require('./questionanswer.js');
const Variant = require('./variant.js');
const VariantQuestion = require('./variantquestion.js');
const Exam = require('./exam.js');
const SubGroup = require('./subgroup.js');
const SubGroupStudent = require('./subgroupstudent.js');
const ExamDocument = require('./examdocument.js');
const ExamScore = require('./examscore.js');
const ExamComment = require('./examcomment.js');
const ExamRatting = require('./examratting.js');
const SystemAlert = require('./systemalert.js');
const SystemAlertEvent = require('./systemalertevent.js');
const Message = require('./message.js');
const Room = require('./room.js');
const Permission =require('./permission.js');
const PermissionUser =require('./permissionuser.js');
module.exports={    
    Chat:Chat,
    ChatRoom:ChatRoom,
    Department:Department,
    Exam:Exam,
    ExamComment:ExamComment,
    ExamRatting:ExamRatting,
    ExamDocument:ExamDocument,
    ExamScore:ExamScore,   
    Faculty:Faculty,
    Faq:Faq,
    Field:Field,
    Group:Group,
    GroupStudent:GroupStudent,
    GroupRelation:GroupRelation,
    Model:Model,
    Question:Question,
    QuestionAnswer:QuestionAnswer,
    SubGroup:SubGroup,
    SubGroupStudent:SubGroupStudent,
    Subject:Subject,
    SystemAlert:SystemAlert,
    SystemAlertEvent:SystemAlertEvent,
    User:User,
    Variant:Variant,
    VariantQuestion:VariantQuestion,
    Message:Message,
    Room:Room,
    Permission,
    PermissionUser
    
  }