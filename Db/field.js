//Id,DepartmentId,Title,CourseCode,Description,Status
module.exports = function(sequelize,Sequelize) {  
    const Field =  sequelize.define('field',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        // departmentId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        courseCode:{
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


    Field.associate = (models) => {
        Field.hasMany(models.Group,{foreignKey : 'fieldId'})     
        Field.hasMany(models.Subject,{foreignKey : 'fieldId'}) 
        Field.belongsTo(models.Department,{foreignKey : {            allowNull: false          }})

       };

    return Field;

};