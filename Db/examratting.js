//Id,ExamId,StudentId,Ratting,Comment,Status
module.exports = function(sequelize,Sequelize) {  
    const ExamRatting =  sequelize.define('examratting',{
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
        ratting:{
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
return ExamRatting;
};