class ExamComment{
    constructor(ExamId,StudentId,QuestionId,Comment,Status){        
        this.examId=ExamId;
        this.studentId=StudentId;
        this.questionId=QuestionId;
        this.comment=Comment;       
        this.status=Status;
    }
    
    getExamId(){
        return this.ExamId;
    }
    setExamId(ExamId){
        this.ExamId=ExamId;
    }
    getStudentId(){
        return this.StudentId;
    }
    setStudentId(StudentId){
        this,StudentId=StudentId;
    }
    getQuestionId(){
        return this.QuestionId;
    }
    setQuestionId(QuestionId){
        this.QuestionId=QuestionId;
    }
    getComment(){
        return this.Comment;
    }
    setComment(Comment){
        this.Comment=Comment;
    }
    
    toJSON(){
        return {            
            ExamId:this.ExamId,
            StudentId:this.StudentId,
            QuestionId:this.QuestionId,
            Comment:this.Comment,           
            Status:this.Status
        }
    }

}
module.exports=ExamComment;