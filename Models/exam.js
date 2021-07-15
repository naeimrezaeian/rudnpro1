class Exam{
    constructor(Title,GroupId,TeacherId,
        ExamDateTime,ExamDuration,ExamLimit,DescriptionShort,Description,ExamImage,
        ExamSetting,Status){      
        this.title=Title;        
        this.groupId=GroupId;
        this.teacherId=TeacherId;
        this.examDateTime=ExamDateTime;
        this.examDuration=ExamDuration;
        this.examLimit=ExamLimit;
        this.descriptionShort=DescriptionShort;
        this.description=Description;
        this.examImage=ExamImage;
        this.examSetting=ExamSetting;        
        this.status=Status;
        }
       
}

module.exports=Exam;