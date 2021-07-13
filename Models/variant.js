class Variant{
    constructor(Title,GroupRelationId,Status){
        
        this.title=Title;
        this.groupRelationId=GroupRelationId;
        this.status=Status;
    }
    
    getTitle(){
        return this.Title;
    }
    setTitle(Title){
        this.Title=Title;
    }
    getGroupRelationId(){
        return this.GroupRelationId;
    }
    setGroupRelationId(GroupRelationId){
        this.GroupRelationId=GroupRelationId;
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
            GroupRelationId:this.GroupRelationId,
            Status:this.Status

        }
    }

}
module.exports=Variant;