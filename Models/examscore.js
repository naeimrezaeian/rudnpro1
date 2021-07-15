class ExamScore{
    constructor(ExamId,StudentId,QuestionId,Score1,Score2,Status){        
        this.examId=ExamId;
        this.studentId=StudentId;
        this.questionId=QuestionId;
        this.score1=Score1;
        this.score2=Score2;
        this.status=Status;
    }
        

}
module.exports=ExamScore;