module.exports = function(sequelize,Sequelize) {  
    const Permission=  sequelize.define('permission',{
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
        tag:{
            type: Sequelize.STRING,
            allowNull: false
        },       
       },{
            timestamps:false
    });

    Permission.associate = (models) => {
        Permission.hasMany(models.PermissionUser,{foreignKey : 'permissionId'})
        
       };

    return Permission;

};