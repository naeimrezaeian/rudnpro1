const Config = require('../config.js');
const { Op } = require("sequelize");

const FindDuplicateArray = (db,field) =>{
    
    return async (req, res, next) => {        
        let resultArray=[]
       
        await  asyncForEach(req.body.dataArray,async (dataItem) =>{              
            let where={}
            field.forEach(element => where[element]={ [Op.eq]: dataItem[element]});
            await db.findOne({
                where: where
            }).then(response =>{                
                if (!response){      resultArray.push(dataItem)           }
            })           
            
        }) 
        
        req.dataArray=resultArray
        next()
    }


}

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


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }




module.exports = {
    FindDuplicate,
    FindDuplicateArray
}