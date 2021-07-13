module.exports = function(sequelize,Sequelize) {  
    const Message = sequelize.define('message', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        //defaultValue: Sequelize.UUIDV4,        
        primaryKey : true,
        allowNull: false
      }, 
      msgContent:{
        type: Sequelize.STRING,        
      },
      msgFile:{
        type: Sequelize.STRING,        
      },  

    }, {timestamps: false, createdAt: false,    updatedAt: false,});
  
    Message.associate = (models) => {     
      Message.hasMany(models.MessageRecipient,{foreignKey : 'messageId'})
       
     };
    return Message;
  };