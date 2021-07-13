class SystemAlert{
    constructor(EventId,EventType,UserId,Message,AlertDateTime,Status){
        
        this.eventId=EventId;
        this.eventType=EventType;
        this.userId=UserId;
        this.message=Message;
        this.alertDateTime=AlertDateTime;
        this.status=Status;
    }
    
    getEventId(){
        return this.EventId;
    }
    setEventId(EventId){
        this.EventId;
    }
    getEventType(){
        return this.EventType;
    }
    setEventType(EventType){
        this.EventType=EventType;
    }
    getStudentId(){
        return this.StudentId;
    }
    setStudentId(StudentId){
        this.StudentId=StudentId;
    }
    getMessage(){
        return this.Message;
    }
    setMessage(Message){
        this.Message=Message;
    }
    getAlertDateTime(){
        return this.AlertDateTime;
    }
    setAlertDateTime(AlertDateTime){
        this.AlertDateTime=AlertDateTime;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return{           
            EventId:this.EventId,
            UserId:this.StudentId,
            Message:this.Message,
            AlertDateTime:this.AlertDateTime,
            Status:this.Status
        }
    }
}
module.exports=SystemAlert;