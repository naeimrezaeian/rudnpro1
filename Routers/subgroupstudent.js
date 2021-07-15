const Config = require('../config.js');
const express = require('express')
const Database=require('../Db');
const { authRole,authChek }=require('../Middleware/Auth');
const { subgroupstudentSchema, validate } = require('../Middleware/validator.js');
const {FindDuplicateArray}= require('../Middleware/Duplicate')
const { Op } = require("sequelize");
const router = express.Router()
//SubGroupId,StudentId,Status
async function GetRelation(RelationId){
    return await Database.GroupRelation.findAll({
        attributes:['id', 'groupId'
        ,[Database.Sequelize.col('group.title'), 'groupTitle']
    ],
        where:{Id:{[Op.eq]:RelationId}},
        include:[           
            {model:Database.Group,attributes:[]}
        ],
        raw:true,

    })
}

async function GetListSubgroup(RelationId){
    return await Database.SubGroup.findAll({
        attributes:['id','title','grouprelationId'
        ,[Database.Sequelize.fn("COUNT", Database.Sequelize.col("subgroupstudents.subgroupId")), "groupCount"]
        ,[Database.Sequelize.col('grouprelation.groupId'), 'groupId']
        ,[Database.Sequelize.col('grouprelation->group.title'), 'groupTitle']
    ],
        where:{grouprelationId:{[Op.eq]:RelationId}},
        include:[
            {model:Database.SubGroupStudent,attributes:[]},
            {model:Database.GroupRelation,attributes:[],include:{model:Database.Group,attributes:[]}}
        ],
        group: ['subgroupstudents.subgroupId'],
        raw:true,
        order: [['id', 'ASC']  ],
       })
}
async function GetUserSubgroup(SubGroupId){
   
    return await Database.SubGroupStudent.findAll({
        attributes:['id','userId',
        [Database.Sequelize.col('user.name'), 'usrerName'],
        [Database.Sequelize.col('user.photo'), 'photo']
    ],
        where:{subgroupId:{[Op.in]:SubGroupId}},
        include:[
            {model:Database.User,attributes:[]}
        ],       
        raw:true,      
       })   
}

async function GetGroupStudents(GroupId,UserList){
    return await Database.GroupStudent.findAll({
        attributes:['id','userId',
        [Database.Sequelize.col('user.name'), 'usrerName'],
        [Database.Sequelize.col('user.photo'), 'photo']
    ],
        where:{
            [Op.and]:[
           { groupId:{[Op.eq]:GroupId}},
           { userId:{[Op.notIn]:UserList}}
            ]
        },
        include:[
            {model:Database.User,attributes:[]}
        ],       
        raw:true
       })     
}



router.get('/Filter/:relationId',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  {
    const RelationId = req.params.relationId
    const CheckRelation = await GetRelation(RelationId)
    

    if (CheckRelation.length!=0){   
    const GroupId = CheckRelation[0].groupId 
    const GroupTitle =  CheckRelation[0].groupTitle 
    
    const SubgroupList = await GetListSubgroup(RelationId)   
    FirstSubgroupStudentList=null
    FirstSubgroupId=null
    FirstSubgroupTitle=null
    GroupList=null
    if (SubgroupList.length!=0){
     
    const SubGroupId = SubgroupList.map(subgroup =>subgroup.id )    
    FirstSubgroupId=SubGroupId[0]   
    FirstSubgroupTitle=SubgroupList[0].title
    FirstSubgroupStudentList =  await GetUserSubgroup([FirstSubgroupId]) 

    const SubGroupUserList= await GetUserSubgroup(SubGroupId)   
    const UserList=SubGroupUserList.map(user=>user.userId)   
    GroupList= await GetGroupStudents(GroupId,UserList)
    
    }else{
         GroupList= await GetGroupStudents(GroupId,[]) 
      }
      metadata={gropupId:GroupId,groupName:GroupTitle,FirstSubgroupId:FirstSubgroupId,FirstSubGroupName:FirstSubgroupTitle}
    
    return res.status(200).json({  data :{SubgroupList:SubgroupList,FirstSubgroupList:FirstSubgroupStudentList,GroupList:GroupList,metadata:metadata} } ) 
    }else{
        return res.status(404).json({message:Config.ERROR_404})
    }
   
   result={}
   
   console.log(result)

 
})

router.get('/Filter/List/:id',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.STUDENT,Config.ROLE.TEACHER]), async function (req, res)  { 
    const Id = req.params.id || 0  
    await  GetUserSubgroup([Id]).then( (response) =>{        
        if (response.length > 0 ){
            
            return res.status(200).json({  data :{items:response} }) 
        }
            
            return res.status(404).json({message:Config.ERROR_404})

    }).catch(error => {        
        return res.status(500).json({message:Config.ERROR_500,errors:error})

    })

})


router.delete('/',authChek,authRole([Config.ROLE.ADMIN]), async function(req, res)  {
    items=req.body.items
    if (items !=null){                     
        itemsDelete = await Database.SubGroupStudent.destroy({ 
            where: { id: items }
        }).then( (response) =>{
            if (response > 0 ){
                
                return res.status(200).json({message:Config.ERROR_200})
            }
                
                return res.status(404).json({message:Config.ERROR_404})

        }).catch(error => {
            return res.status(500).json({message:Config.ERROR_500,errors:error})

        })
    
    }else{            
        return res.status(404).json({message:Config.ERROR_404})
    }
})

router.post('/',authChek,authRole([Config.ROLE.ADMIN,Config.ROLE.TEACHER]),FindDuplicateArray(Database.SubGroupStudent,["subgroupId","userId"])
,async function (req,res) {  
   
    Database.SubGroupStudent.bulkCreate(req.dataArray).then(function(response){
    if (response){        
        return res.status(200).json({message:Config.ERROR_200})
    }else{
       
        return res.status(400).json({message:Config.ERROR_400})
    }
}).catch(error => {
         return res.status(500).json({message:Config.ERROR_500,errors:error})
});
})





   module.exports = router