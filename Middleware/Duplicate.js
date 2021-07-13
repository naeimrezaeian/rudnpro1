const Config = require('../config.js');
const { Op } = require("sequelize");

const FindDuplicate = (db,fild)  => {
    return async (req, res, next) => {    
      // let where={ status: 1}
       let where={}
        fild.forEach(element => where[element]={ [Op.eq]: req.body[element]});
        
       if (req.method =="PUT"){
        where.Id={[Op.ne]:req.params.id }
       }
      
        await db.findOne({
            where: where
        }).then(response =>{
            if (response){
                return res.status(407).json({message:fild + " is already exists"})
            }else{
                next()
            }
           
    
        }).catch(error =>{
            return res.status(500).json({message:Config.ERROR_500,errors:error})
           
        })
    }
}





module.exports = {
    FindDuplicate
}