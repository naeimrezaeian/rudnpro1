  module.exports = function(sequelize,Sequelize) {  
    const MessageRecipient = sequelize.define('message_recipient', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        //defaultValue: Sequelize.UUIDV4,
        autoIncrement: true,        
        primaryKey : true,
        allowNull: false
      },
      isGroup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      timeago: {
        type: Sequelize.VIRTUAL(Sequelize.DATE, ['createDate']),
        get() { return this.get('createdAt') },
      },
     
     
    }, {timestamps: false, createdAt: false,    updatedAt: false,});
    
    
    MessageRecipient.associate = (models) => {  

      MessageRecipient.belongsTo(models.User,{foreignKey : 'creatorId',as: 'creator'})
      MessageRecipient.belongsTo(models.User,{foreignKey : 'recipientId',as: 'recipient'})
      MessageRecipient.belongsTo(models.Room,{foreignKey : 'roomId'})   
      MessageRecipient.belongsTo(models.Message,{foreignKey : {        allowNull: false }})

      
    };

    return MessageRecipient;
  };