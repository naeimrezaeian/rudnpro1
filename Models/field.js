class Field {
 

constructor(DepartmentId,Title,CourseCode,Description,Status){
this.departmentId = DepartmentId;
this.title = Title;
this.courseCode = CourseCode;
this.description = Description;
this.status = Status;
}

getDepartmentId(){
    return this.DepartmentId;
}
setDepartmentId(DepartmentId){
    this.DepartmentId=DepartmentId;
}
getTitle(){
    return this.Title
}
setTitle(Title){
    this.Title=Title;
}
getCourseCode(){
    return this.CourseCode;
}
setCourseCode(CourseCode){
    this.CourseCode=CourseCode;
}
getDescription(){
    return this.Description;
}
setDescription(Description){
    this.Description=Description;
}
getStatus(){
    return this.Status;
}
setStatus(Status){
    this.Status=Status;
}

toJSON(){
    return {        
        DepartmentId : this.DepartmentId,
        Title:this.Title,
        CourseCode : this.CourseCode,
        Description : this.Description,        
        Status : this.Status    
    }
  }

}
module.exports = Field;