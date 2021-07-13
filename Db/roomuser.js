
  module.exports = function(sequelize,Sequelize) {  
    const RoomUser = sequelize.define('room_user', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        //defaultValue: Sequelize.UUIDV4,        
        primaryKey : true,
        allowNull: false
      }, 
  
     
     }, {timestamps: false, createdAt: false,    updatedAt: false,});
    
     RoomUser.associate = (models) => { 
      RoomUser.belongsTo(models.Room,{foreignKey : {
        allowNull: false
      }})

      RoomUser.belongsTo(models.User,{foreignKey : {
        allowNull: false
      }})
      
    };
    return RoomUser;
  };