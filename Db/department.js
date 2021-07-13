
//Id,FacultyId,Title,Description,Status

module.exports = function(sequelize,Sequelize) {  
    const Department =  sequelize.define('department',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        // facultyId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        },       
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });

    Department.associate = (models) => {
        Department.hasMany(models.Field,{foreignKey : 'departmentId'})     
        
        Department.belongsTo(models.Faculty,{foreignKey : {            allowNull: false          }})

       };

return Department;
};