
module.exports = function(sequelize,Sequelize) {  
    const Country = sequelize.define('country',{
        
        code:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey : true,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        fullname:{
            type: Sequelize.STRING,
            allowNull: false
        },
        alpha2:{
            type: Sequelize.STRING,
            allowNull: false
        }, 
        alpha3:{
            type: Sequelize.STRING,
            allowNull: false
        }},{
            timestamps:false
    });
    return Country;

};