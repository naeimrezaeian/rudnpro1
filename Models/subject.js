class Subject{

   
    constructor(Title,Description,FieldId,Image,Status){        
        this.title=Title;
        this.description=Description;
        this.fieldId = FieldId;
        this.image=Image;
        this.status= Status
}

getTitle(){
    return this.Title
}
setTitle(Title){
    this.Title=Title;
}

getDescription(){
    return this.Description;
}
setDescription(Description){
    this.Description=Description;
}
getFieldId(){
    return this.FieldId;
}
setFieldId(FieldId){
    this.FieldId=FieldId;
}
getImage(){
    return this.Image;
}
setImage(Image){
    this.Image=Image;
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
        Description : this.Description,  
        FieldId : FieldId,
        Image:Image,
        Status : this.Status    
    }
  }
}
module.exports = Subject;