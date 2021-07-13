class Room{
    constructor(RoomName){        
        this.roomName =RoomName;
    }
    
    getRoomName(){
        return this.RoomName;
    }
    setRoomName(RoomName){
        this.RoomName = RoomName;
    }
    
    toJSON(){
        return{        
        RoomName :this.RoomName,
       
        }
    }
}
module.exports=Room;