//Id,ExamId,GroupId,VariantId,Status

module.exports = function(sequelize,Sequelize) {  
    const ExamGroup = sequelize.define('examgroup',{
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
        groupId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        variantId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
return ExamGroup;
};