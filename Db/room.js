  module.exports = function(sequelize,Sequelize) {  
    const Room = sequelize.define('room', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
       // defaultValue: Sequelize.UUIDV4,        
        primaryKey : true,
        allowNull: false
      },
      roomName: {
        type: Sequelize.STRING,
       
      },      
     
    }, {timestamps: false, createdAt: false,    updatedAt: false,});
  
    Room.associate = (models) => { 
      Room.hasMany(models.RoomUser,{foreignKey : 'roomId'})
      Room.hasMany(models.MessageRecipient,{foreignKey : 'roomId'})
    };
    
    return Room;
  };