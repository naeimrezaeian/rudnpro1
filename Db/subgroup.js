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
        // groupId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    
    SubGroup.associate = (models) => { 
        SubGroup.hasMany(models.SubGroupStudent,{foreignKey : 'subgroupId'})        
        SubGroup.belongsTo(models.Group,{foreignKey : {          allowNull: false        }})
        
    };

    return SubGroup;

};