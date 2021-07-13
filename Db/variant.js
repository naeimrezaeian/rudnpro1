//Id,Title,GroupRelationId,Status
module.exports = function(sequelize,Sequelize) { 
    const Variant =  sequelize.define('variant',{
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
        groupRelationId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },        
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }},{
            timestamps:true
    });
    return Variant;

};