//Id,ExamId,StudentId,QuestionId,Comment,Status
module.exports = function(sequelize,Sequelize) {  
    const ExamComment =  sequelize.define('examcomment',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        }, 
        examId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        studentId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        questionId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment:{
            type: Sequelize.STRING,
            allowNull: false
        },       
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
return ExamComment;
};