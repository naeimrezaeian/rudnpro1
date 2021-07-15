class SystemAlert{
    constructor(EventId,EventType,UserId,Message,AlertDateTime,Status){
        
        this.eventId=EventId;
        this.eventType=EventType;
        this.userId=UserId;
        this.message=Message;
        this.alertDateTime=AlertDateTime;
        this.status=Status;
    }
    
   
}
module.exports=SystemAlert;