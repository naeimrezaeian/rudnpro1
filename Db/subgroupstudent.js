//Id,SubGroupId,StudentId,Status
module.exports = function(sequelize,Sequelize) {  
    const SubGroupStudent = sequelize.define('subgroupstudent',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
       
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    SubGroupStudent.associate = (models) => { 
        SubGroupStudent.belongsTo(models.User,{foreignKey : {          allowNull: false        }})
        SubGroupStudent.belongsTo(models.SubGroup,{foreignKey : {          allowNull: false        }})
    };
return SubGroupStudent;
};