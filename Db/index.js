const  Sequelize = require('sequelize')
const mysql = require('mysql2/promise');

const sequelize = new Sequelize('rudn',"root",'n366811',{   
    host:'188.126.44.111',
    dialect:'mysql',
    //operatorsAliases:Sequelize.Op,
    logging: false,
    define: {
      underscored: false,
    }
  })

  const models = {   
     User : require('./user')(sequelize,Sequelize),
     Faculty : require('./faculty')(sequelize,Sequelize),
     Department : require('./department')(sequelize,Sequelize),
     Field : require('./field')(sequelize,Sequelize),
     Subject : require('./subject')(sequelize,Sequelize),
     SubjectUser : require('./subjectuser')(sequelize,Sequelize),
     Model : require('./model')(sequelize,Sequelize),
     Faq : require('./faq')(sequelize,Sequelize),
     Group : require('./group')(sequelize,Sequelize),
     GroupStudent : require('./groupstudent')(sequelize,Sequelize),
     GroupRelation : require('./grouprelation')(sequelize,Sequelize),
     Question : require('./question')(sequelize,Sequelize),
     QuestionAnswer : require('./questionanswer')(sequelize,Sequelize),
     Variant : require('./variant')(sequelize,Sequelize),
     VariantQuestion : require('./variantquestion')(sequelize,Sequelize),
     Exam : require('./exam')(sequelize,Sequelize),
     SubGroup : require('./subgroup')(sequelize,Sequelize),
     SubGroupStudent : require('./subgroupstudent')(sequelize,Sequelize),
     ExamDocument : require('./examdocument')(sequelize,Sequelize),
     ExamScore : require('./examscore')(sequelize,Sequelize),
     ExamComment : require('./examcomment')(sequelize,Sequelize),
     ExamRatting : require('./examratting')(sequelize,Sequelize),
     SystemAlert : require('./systemalert')(sequelize,Sequelize),
     SystemAlertEvent : require('./systemalertevent')(sequelize,Sequelize),
     Room: require('./room')(sequelize,Sequelize),
     RoomUser: require('./roomuser')(sequelize,Sequelize),
     Message:require('./message')(sequelize,Sequelize),
     MessageRecipient:require('./messagerecipient')(sequelize,Sequelize),
     
     Country:require('./country')(sequelize,Sequelize),
  };
  
  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });



  models.sequelize = sequelize;
  models.Sequelize = Sequelize;
  

  module.exports=models