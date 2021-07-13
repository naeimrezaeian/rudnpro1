
//Id,TeacherId,SubjectId,QuestionContent,AnswerContent,QuestionType,Model,Status

module.exports = function(sequelize,Sequelize) {  
    const Question =  sequelize.define('question',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },        
        questionContent:{
            type: Sequelize.STRING,
            allowNull: false
        },
        
        questionType:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        questionScore:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        model:{
            type: Sequelize.INTEGER,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });


    Question.associate = (models) => {
        Question.hasMany(models.QuestionAnswer,{foreignKey : 'questionId'})
       
        Question.belongsTo(models.User,{foreignKey : {allowNull: false}})      
        Question.belongsTo(models.Subject,{foreignKey : {allowNull: false}})   
       
       };
    return Question;

};