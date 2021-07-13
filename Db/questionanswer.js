

module.exports = function(sequelize,Sequelize) {  
    const QuestionAnswer =  sequelize.define('question_answer',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },       
       
        answerContent:{
            type: Sequelize.STRING,
            allowNull: false
        },
        answerCorrect:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        
        
        },{
            timestamps:false
    });


    QuestionAnswer.associate = (models) => {
       
        QuestionAnswer.belongsTo(models.Question,{foreignKey : {allowNull: false}})      
       
       
       };
    return QuestionAnswer;

};