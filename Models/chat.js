class Chat{

    constructor(SenderId,ReciverId,RoomId,Content,File,CreateAt,Status){        
        this.senderId= SenderId;
        this.reciverId = ReciverId;
        this.roomId=RoomId;
        this.content=Content;
        this.file=File;
        this.createAt=CreateAt
        this.status=Status;
    }
    
    getSenderId(){
        return this.SenderId;
    } 
    setSenderId(SenderId){
        this.SenderId=SenderId;
    }
    getReciverId(){
        return this.ReciverId;
    }
    setReciverId(ReciverId){
        this.ReciverId=ReciverId;
    }
    getRoomId(){
        return this.RoomId;
    }
    setRoomId(RoomId){
        this.RoomId=RoomId;
    }
    getContent(){
        return this.Content;
    }
    setContent(Content){
        this.Content=Content;
    }
    getFile(){
        return this.File;
    }
    setFile(File){
        this.File=File;
    }
    getCreateAt(){
        return this.CreateAt;
    }
    setCreateAt(CreateAt){
        this.CreateAt=CreateAt;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return {
        
        SenderId: this.SenderId,
        ReciverId : this.ReciverId,
        RoomId:this.RoomId,
        Content:this.Content,
        File:this.File,
        CreateAt:this.CreateAt,
        Status:this.Status,
        }
    }

}
module.exports = Chat;