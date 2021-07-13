class GroupRelation{

    constructor(GroupId,TeacherId,SubjectId,Status){        
        this.groupId=GroupId;
        this.teacherId=TeacherId;
        this.subjectId=SubjectId;
        this.status=Status;
    }

    
    getGroupId(){
        return this.GroupId;
    }
    setGroupId(GroupId){
        this.GroupId=GroupId;
    }
    getTeacherId(){
        return this.TeacherId;
    }
    setTeacherId(TeacherId){
        this.TeacherId=TeacherId;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    getSubjectId(){
        return this.SubjectId;
    }
    setSubjectId(SubjectId){
        this.SubjectId=SubjectId;
    }

    toJSON(){
        return {  
            GroupId : this.GroupId,
            TeacherId : this.TeacherId,
            SubjectId:  this.SubjectId,
            Status : this.Status                
        }
    }

}
module.exports=GroupRelation;