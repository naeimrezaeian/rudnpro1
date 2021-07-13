class SystemAlertEvent{
    constructor(Event,Status){
        
        this.event=Event;        
        this.status=Status;
    }
    
    getEvent(){
        return this.Event;
    }
    setEvent(Event){
        this.Event;
    }
    
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return{           
            Event:this.Event,           
            Status:this.Status
        }
    }
}
module.exports=SystemAlertEvent;