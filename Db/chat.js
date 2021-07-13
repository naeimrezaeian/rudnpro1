const Sequelize = require('sequelize')

//Id,SenderId,ReciverId,RoomId,Content,File,Status
module.exports = function(sequelize) {
    return sequelize.define('chat',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        }, 
        senderId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        reciverId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        roomId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        content:{
            type: Sequelize.STRING,
            allowNull: false
        },
        file :{
            type: Sequelize.STRING,
            allowNull: false
        },   
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
};