class Message{

    constructor(MsgContent,MsgFile){        
        this.msgContent= MsgContent;
        this.msgFile = MsgFile;
       
    }
    
    getMsgContent(){
        return this.MsgContent;
    } 
    setMsgContent(MsgContent){
        this.MsgContent=MsgContent;
    }
    getMsgFile(){
        return this.MsgFile;
    }
    setMsgFile(MsgFile){
        this.MsgFile=MsgFile;
    }
    
    toJSON(){
    return {    
        MsgFile: this.MsgFile,
        MsgContent : this.MsgContent,    
        }
    }

}
module.exports = Message;