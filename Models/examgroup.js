class ExamGroup{
    constructor(ExamId,GroupId,VariantId,Status){        
        this.examId=ExamId;
        this.groupId=GroupId;
        this.variantId=VariantId;
        this.status=Status;
    }
    
    getExamId(){
        return this.ExamId;
    }
    setExamId(ExamId){
        this.ExamId=ExamId;
    }
    getGroupId(){
        return this.GroupId;
    }
    setGroupId(GroupId){
        this.GroupId=GroupId;
    }
    getVariantId(){
        return this.VariantId;
    }
    setVariantId(VariantId){
        this.VariantId=VariantId;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }

    toJSON(){
        return {        
        ExamId=this.ExamId,
        GroupId=this.GroupId,
        VariantId=this.VariantId,
        Status=this.Status
        }
    }
}
module.exports=ExamGroup;