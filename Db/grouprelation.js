//Id,GroupId,TeacherId,SubjectId,Status
module.exports = function(sequelize,Sequelize) {  
    const GroupRelation =  sequelize.define('grouprelation',{
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
    GroupRelation.associate = (models) => {  
        GroupRelation.hasMany(models.SubGroup,{foreignKey : 'grouprelationId'})
        GroupRelation.hasMany(models.GroupStudent,{foreignKey : 'groupStudendId'})
        GroupRelation.belongsTo(models.Group,{foreignKey : {allowNull: false}})
        GroupRelation.belongsTo(models.Subject,{foreignKey : {allowNull: false}})
        GroupRelation.belongsTo(models.User,{foreignKey : {allowNull: false}})

       };

    return GroupRelation;

};