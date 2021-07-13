//Id,Title,FacultyId,DepartmentId,FieldId,SubjectId,UrlModel,
//Parameters,Description,GeneralModel,Status

module.exports = function(sequelize,Sequelize) {  
    const Model = sequelize.define('model',{
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
        // facultyId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        // departmentId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        // fieldId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        // subjectId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        urlModel:{
            type: Sequelize.STRING,
            allowNull: false
        },
        parameters:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.STRING,
            allowNull: false
        },
        generalModel:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });

    Model.associate = (models) => {       
        
        Model.belongsTo(models.Subject,{foreignKey : {allowNull: false}})

       };

return Model;
};