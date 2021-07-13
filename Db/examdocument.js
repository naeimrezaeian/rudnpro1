//Id,ExamId,ExamFile,Status
module.exports = function(sequelize,Sequelize) {  
    const ExamDocument = sequelize.define('examdocument',{
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
        examFile:{
            type: Sequelize.STRING,
            allowNull: false
        },      
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    return ExamDocument;

};