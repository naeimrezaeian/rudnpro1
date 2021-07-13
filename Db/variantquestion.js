//Id,QuestionId,VariantId,Status
module.exports = function(sequelize,Sequelize) { 
    const VariantQuestion =  sequelize.define('variantquestion',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        questionId:{
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
    return VariantQuestion;

};