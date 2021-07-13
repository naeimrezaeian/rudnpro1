class SubGroup{

    constructor(Title,GroupId,Status){        
        this.title=Title;
        this.groupId=GroupId;
        this.status=Status;
    }
    
    getTitle(){
        this.Title=this.Title;
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
   
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return {           
            Title: this.Title,
            GroupId:this.GroupId,           
            Status:this.Status

        }
    }


}
module.exports=SubGroup;