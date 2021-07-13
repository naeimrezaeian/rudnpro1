class ChatRoom{
    constructor(RoomName,RoomAccess,Status){        
        this.roomName =RoomName;
        this.roomAccess = RoomAccess;
        this.status = Status
    }
    
    getRoomName(){
        return this.RoomName;
    }
    setRoomName(RoomName){
        this.RoomName = RoomName;
    }
    getRoomAccess(){
        return this.RoomAccess;
    }
    setRoomAccess(RoomAccess){
        this.RoomAccess= RoomAccess;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return{        
        RoomName :this.RoomName,
        RoomAccess : this.RoomAccess,
        Status : this.Status
        }
    }
}
module.exports=ChatRoom;