class ExamScore{
    constructor(ExamId,StudentId,QuestionId,Score1,Score2,Status){        
        this.examId=ExamId;
        this.studentId=StudentId;
        this.questionId=QuestionId;
        this.score1=Score1;
        this.score2=Score2;
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
    getScore1(){
        return this.Score1;
    }
    setScore1(Score1){
        this.Score1=Score1;
    }
    getScore2(){
        return this.Score2;
    }
    setScore2(){
        this.Score2=Score2;
    }
    toJSON(){
        return {           
            ExamId:this.ExamId,
            StudentId:this.StudentId,
            QuestionId:this.QuestionId,
            Score1:this.Score1,
            Score2:this.Score2,
            Status:this.Status

        }
    }

}
module.exports=ExamScore;