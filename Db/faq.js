//Id,GroupId,Question,Answer,Status
module.exports = function(sequelize,Sequelize) {  
    const Faq= sequelize.define('faq',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        groupId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        question:{
            type: Sequelize.STRING,
            allowNull: false
        },
        answer:{
            type: Sequelize.STRING,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    return Faq;

};