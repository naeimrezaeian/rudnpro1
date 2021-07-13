
  module.exports = function(sequelize,Sequelize) {  
    const SubjectUser = sequelize.define('subject_user', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,           
        primaryKey : true,
        allowNull: false
      }, 
  
     
     }, {timestamps: false, createdAt: false,    updatedAt: false,});
    
     SubjectUser.associate = (models) => { 
      SubjectUser.belongsTo(models.Subject,{foreignKey : {
        allowNull: false
      }})

      SubjectUser.belongsTo(models.User,{foreignKey : {
        allowNull: false
      }})
      
    };
    return SubjectUser;
  };