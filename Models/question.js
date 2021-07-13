class Question{
    constructor(UserId,SubjectId,QuestionContent,QuestionType,QuestionScore,Model,Status){
        
        this.userId=UserId;
        this.subjectId=SubjectId;
        this.questionContent=QuestionContent;      
        this.questionType=QuestionType;
        this.questionScore=QuestionScore
        this.model = Model;
        this.status = Status;
    }
 

}
module.exports=Question;