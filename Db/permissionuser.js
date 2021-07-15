module.exports = function(sequelize,Sequelize) {  
    const PermissionUser=  sequelize.define('permission_user',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        access:{
            type: Sequelize.INTEGER,
            allowNull: false
        },              
       },{
            timestamps:false
    });

    PermissionUser.associate = (models) => {       
        PermissionUser.belongsTo(models.User,{foreignKey : {allowNull: false}})
        PermissionUser.belongsTo(models.Permission,{foreignKey : {allowNull: false}})

       };

    return PermissionUser;

};