//Id,Title,Description,FieldId,Image,Status
module.exports = function(sequelize,Sequelize) {  
    const Subject=  sequelize.define('subject',{
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
        description:{
            type: Sequelize.STRING,
            allowNull: false
        },       
        image:{
            type: Sequelize.STRING,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            defaultValue:1,
            allowNull: false
        }},{
            timestamps:true
    });

    Subject.associate = (models) => {
        Subject.hasMany(models.SubjectUser,{foreignKey : 'subjectId'})
        Subject.hasMany(models.GroupRelation,{foreignKey : 'subjectId'}) 
        Subject.hasMany(models.Question,{foreignKey : 'subjectId'}) 
        Subject.hasMany(models.Model,{foreignKey : 'subjectId'})
        
        Subject.belongsTo(models.Field,{foreignKey : {allowNull: false}})

       };

    return Subject;

};