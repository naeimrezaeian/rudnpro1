//Id,GroupId,UserId,Status
module.exports = function(sequelize,Sequelize) {  
    const GroupStudent =  sequelize.define('groupstudent',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },status:{
            type: Sequelize.INTEGER,
            defaultValue:1,
            allowNull: false
        }
        
    },{
            timestamps:false
    });

 

      GroupStudent.associate = (models) => {     
        GroupStudent.belongsTo(models.Group,{foreignKey : {allowNull: false}})       
        GroupStudent.belongsTo(models.User,{foreignKey : {allowNull: false}})

       };
    return GroupStudent;

};