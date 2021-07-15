//Id,Title,GroupId,Status
module.exports = function(sequelize,Sequelize) {  
    const SubGroup = sequelize.define('subgroup',{
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
           
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    
    SubGroup.associate = (models) => { 
        SubGroup.hasMany(models.SubGroupStudent,{foreignKey : 'subgroupId',onDelete: 'cascade'})        
        SubGroup.belongsTo(models.GroupRelation,{foreignKey : {          allowNull: false        }})
        
    };

    return SubGroup;

};