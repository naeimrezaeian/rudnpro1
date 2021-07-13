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
        
        getTitle(){
            return this.Title;
        }
        setTitle(Title){
            this.Title=Title;
        }
       
        getGroupId(){
            return this.GroupId;
        }
        setGroupId(GroupId){
            this.GroupId=GroupId;
        }
        getTeacherId(){
            return this.TeacherId;
        }
        setTeacherId(TeacherId){
            this.TeacherId=TeacherId;
        }
        getExamDateTime(){
            return this.ExamDateTime;
        }
        setExamDateTime(ExamDateTime){
            this.ExamDateTime=ExamDateTime;
        }
        getExamDuration(){
            return this.ExamDuration;
        }
        setExamDuration(ExamDuration){
            this.ExamDuration=ExamDuration;
        }
        getExamLimit(){
            return this.ExamLimit;
        }
        setExamLimit(ExamLimit){
            this.ExamLimit=ExamLimit;
        }
        getDescriptionShort(){
            return this.DescriptionShort;
        }
        setDescriptionShort(DescriptionShort){
            this.DescriptionShort=DescriptionShort;
        }
        getDescription(){
            return this.Description;
        }
        setDescription(Description){
            this.Description=Description;
        }
        getExamImage(){
            return this.ExamImage;
        }
        setExamImage(ExamImage){
            this.ExamImage=ExamImage;
        }
        getExamSetting(){
            return this.ExamSetting;
        }
        setExamSetting(ExamSetting){
            this.ExamSetting=ExamSetting;
        }
        
        getStatus(){
            return this.Status;
        }
        setStatus(Status){
            this.Status=Status;
        }
        toJSON(){
            return {               
                Title:this.Title,
                GroupId:this.GroupId,
                TeacherId:this.TeacherId,
                ExamDateTime:this.ExamDateTime,
                ExamDuration:this.ExamDuration,
                ExamLimit:this.ExamLimit,
                DescriptionShort:this.DescriptionShort,
                Description:this.Description,
                ExamImage:this.ExamImage,
                ExamSetting:this.ExamSetting,
                Status:this.Status,
            }
        }
}

module.exports=Exam;