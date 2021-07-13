class department {    
    constructor(FacultyId,Title,Description,Status){        
        this.facultyId=FacultyId;
        this.title=Title;
        this.description=Description;
        this.status=Status;
    }
    
      getFacultyId(){
          return this.FacultyId;
      }
      setFacultyId(FacultyId){
          this.FacultyId =FacultyId ;
      }

      getTitle(){
        return this.Title;
    }
    setTitleTitle(){
        this.Title =Title ;
    }
    getDescription(){
        return this.Description;
    }
    setDescription(Description){
        this.Description =Description ;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status =Status ;
    }

    toJSON(){
        return {            
            FaultyId:this.FacultyId,
            Title:this.Title,            
            Description : this.Description,           
            Status : this.Status        
        }
      }
    
}
module.exports = department;