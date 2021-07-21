//Id,Name,Birthday,Sex ,Email ,Phone ,Address ,Country ,City ,FacultyId ,
//DepartmentId ,FieldId,TypeStudy ,FormStudy ,YearStudy ,Additional ,
//Photo ,Access,Status,Password
module.exports = function(sequelize,Sequelize) {  
    const User =  sequelize.define('user',{
        id:{           
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,           
            primaryKey : true,
            allowNull: false
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday:{
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        sex:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        phone:{
            type: Sequelize.STRING,
            allowNull: false

        },
        address:{
            type: Sequelize.STRING,
            allowNull: false

        },
        country:{
            type: Sequelize.STRING,
            allowNull: false

        },
        city:{
            type: Sequelize.STRING,
            allowNull: false

        },       
        fieldId:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        typeStudy:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        formStudy:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        yearStudy:{
            type:Sequelize.STRING,
            allowNull: false

        },
        additional:{
            type: Sequelize.STRING,
            allowNull: false
        } ,
        photo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        access:{
            type: Sequelize.STRING,
            allowNull: false
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        }
    
    },{
            timestamps:true
    });
    
    User.associate = (models) => {
        User.hasMany(models.SubjectUser,{foreignKey : 'userId'})
        User.hasMany(models.RoomUser,{foreignKey : 'userId'})
        User.hasMany(models.GroupStudent,{foreignKey : 'userId'})
        User.hasMany(models.GroupRelation,{foreignKey : 'userId'})
        User.hasMany(models.GroupStudent,{foreignKey : 'userId'})
        User.hasMany(models.SubGroupStudent,{foreignKey : 'userId'})
        User.hasMany(models.Question,{foreignKey : 'userId'})
        User.hasMany(models.PermissionUser,{foreignKey : 'userId'})
        
        User.hasMany(models.MessageRecipient,{foreignKey : 'creatorId'})
        User.hasMany(models.MessageRecipient,{foreignKey : 'recipientId'})

        //User.belongsTo(models.Faculty,{foreignKey : {allowNull: false}})
       // User.belongsTo(models.Department,{foreignKey : {allowNull: false}})
        User.belongsTo(models.Field,{foreignKey : {allowNull: false}})
       
       };

    return User;
};