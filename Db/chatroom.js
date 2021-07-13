const Sequelize = require('sequelize')
//Id,RoomName,RoomAccess,Status

module.exports = function(sequelize) {
    return sequelize.define('chatroom',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },   
        roomName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        roomAccess:{
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