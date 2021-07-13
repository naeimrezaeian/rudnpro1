  module.exports = function(sequelize,Sequelize) {  
    const MessageRead = sequelize.define('message_read', {
      id:{
        type: Sequelize.INTEGER,        
        autoIncrement: true,        
        primaryKey : true,
        allowNull: false
      }, 
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
     
     
    }, {timestamps: false, createdAt: false,    updatedAt: false,});
    
    
    MessageRead.associate = (models) => {  
      
      MessageRead.belongsTo(models.MessageRecipient,{foreignKey : 'messageRecipientId'})
      MessageRead.belongsTo(models.User,{foreignKey : 'recipientId'})
      

    };

    return MessageRead;
  };