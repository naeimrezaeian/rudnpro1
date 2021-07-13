//GroupId,TeacherId,
//ExamDateTime,ExamDuration,ExamLimit,DescriptionShort,Description,ExamImage,
//ExamSetting,ExamRating,Status

module.exports = function(sequelize,Sequelize) {  
    const Exam =  sequelize.define('exam',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },        
        teacherId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },       
        groupId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        examDateTime:{
            type:Sequelize.DATE,
            allowNull: false
        },
        examDuration:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        examLimit:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        descriptionShort:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.STRING,
            allowNull: false
        },
        examImage:{
            type: Sequelize.STRING,
            allowNull: false
        },
        examSetting:{
            type: Sequelize.STRING,
            allowNull: false
        },       
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
return Exam;
};