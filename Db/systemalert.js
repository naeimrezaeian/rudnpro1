//Id,EventId,EventType,StudentId,Message,AlertDateTime,Status
module.exports = function(sequelize,Sequelize) {  
    const SystemAlert =  sequelize.define('systemalert',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        // eventId:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        eventType:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId:{
            type: Sequelize.UUID,
            allowNull: false
        },   
        message:{
            type: Sequelize.STRING,
            allowNull: true
        },  
        alertDateTime:{
            type:Sequelize.DATE,
            allowNull: false
        },    
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });

    SystemAlert.associate = (models) => {  
        SystemAlert.belongsTo(models.SystemAlertEvent,{foreignKey: 'eventId'})
         
      };

    return SystemAlert;

};