const moment=require('moment')
//Id,Title,YearStudy,FacultyId,DepartmentId,FieldAdd,
//TypeStudy,FormStudy,Description,Students,Status

module.exports = function(sequelize,Sequelize) {  
    const Group =  sequelize.define('group',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        yearStudy:{
            type:Sequelize.STRING,
            allowNull: false,
           
        },        
        typeStudy:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        
        description:{
            type: Sequelize.STRING,
            allowNull: false
        },
              
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });

    Group.associate = (models) => { 
        Group.hasMany(models.GroupStudent,{foreignKey : 'groupId'})
        Group.hasMany(models.GroupRelation,{foreignKey : 'groupId'})
        Group.hasMany(models.SubGroup,{foreignKey : 'groupId'})
        
        Group.belongsTo(models.Field,{foreignKey : {            allowNull: false          }})
  
       
        
      };
    return Group;

};