class ExamDocument{
    constructor(ExamId,ExamFile,Status){        
        this.examId=ExamId;
        this.examFile=ExamFile;
        this.status=Status;
    }
    
    getExamId(){
        return this.ExamId;
    }
    setExamId(ExamId){
        this.ExamId=ExamId;
    }
    getExamFile(){
        return this.ExamFile;
    }
    setExamFile(ExamFile){
        this.ExamFile=ExamFile;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return {            
            ExamId:this.ExamId,
            ExamFile:this.ExamFile,
            Status:this.Status
        }
    }


}
module.exports=ExamDocument;