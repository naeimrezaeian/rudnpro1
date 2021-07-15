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
    
   

}
module.exports = Chat;