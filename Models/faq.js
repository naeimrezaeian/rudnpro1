class Faq{
    //
    constructor(GroupId,Question,Answer,Status){        
        this.groupId=GroupId;
        this.question=Question;
        this.answer=Answer;
        this.status=Status;
    }
    
    getGroupId(){
        return GroupId;
    }
    setGroupId(GroupId){
        this.GroupId=GroupId;
    }
    getQuestion(){
        return this.Question;
    }
    setQuestion(Question){
        this.Question=Question;
    }
    getAnswer(){
        return Answer;
    }
    setAnswer(Answer){
        this.Answer=Answer;
    }
    getStatus(){
        return Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return {            
            GroupId:this.GroupId,
            Question:this.Question,
            Answer:this.Answer,            
            Status : this.Status    
        }
      }
}
module.exports=Faq;