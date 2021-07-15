class ExamComment{
    constructor(ExamId,StudentId,QuestionId,Comment,Status){        
        this.examId=ExamId;
        this.studentId=StudentId;
        this.questionId=QuestionId;
        this.comment=Comment;       
        this.status=Status;
    }
    
   
}
module.exports=ExamComment;