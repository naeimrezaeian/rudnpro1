//Id,Title,Address,Phone,Email,Description,Photo,Status
module.exports = function(sequelize,Sequelize) {  
    const Faculty =  sequelize.define('faculty',{
        id:{
            type: Sequelize.INTEGER,
           autoIncrement :  true,
            //type: Sequelize.UUID,
            //defaultValue: Sequelize.UUIDV4,
            primaryKey : true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        address:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phone:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        photo:{
            type: Sequelize.STRING,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true,
            //tableName: 'facultys'
            //freezeTableName: true
    });
    Faculty.associate = (models) => {
        Faculty.hasMany(models.Department,{foreignKey : 'facultyId'})
       
       
       };

    return Faculty;

};