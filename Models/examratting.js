class ExamRatting{
    constructor(ExamId,StudentId,Ratting,Comment,Status){        
        this.examId=ExamId;
        this.studentId=StudentId;
        this.ratting=Ratting;
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
    getRatting(){
        return this.Ratting;
    }
    setRatting(Ratting){
        this.Ratting=Ratting;
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
            Ratting:this.Ratting,
            Comment:this.Comment,           
            Status:this.Status
        }
    }

}
module.exports=ExamRatting;