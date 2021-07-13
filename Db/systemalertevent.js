module.exports = function(sequelize,Sequelize) {  
    const SystemAlertEvent = sequelize.define('systemalertevent',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement :  true,
            primaryKey : true,
            allowNull: false
        },
        event:{
            type: Sequelize.STRING,
            allowNull: false
        },   
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });

    
    SystemAlertEvent.associate = (models) => {  
        SystemAlertEvent.hasMany(models.SystemAlert, {foreignKey: 'eventId'});
         
      };
    return SystemAlertEvent;

};