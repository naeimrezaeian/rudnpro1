//Id,ExamId,StudentId,QuestionId,Score1,Score2,Status
module.exports = function(sequelize,Sequelize) {  
    const ExamScore =  sequelize.define('examscore',{
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
        score1:{
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        score2:{
            type: Sequelize.DOUBLE,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    return ExamScore;

};