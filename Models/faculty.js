class Faculty{

    constructor(Title,Address,Phone,Email,Description,Photo,Status){        
        this.title=Title;
        this.address = Address;
        this.phone = Phone;
        this.email = Email;
        this.description = Description;
        this.photo = Photo ;
        this.status = Status;
}


  getTitle() {
    return this.title;
  }
  
  setTitle(Title) {
    this.Title =Title ;
  }
  getAddress() {
    return this.Address;
  }
  
  setAddress(Address) {
    this.Address =Address ;
  }
  getPhone() {
    return this.Phone;
  }
  
  setPhone(Phone) {
    this.Phone =Phone ;
  }
  getEmail() {
    return this.Email;
  }
  
  setEmail(Email) {
    this.Email = Email ;
  }
  get() {
    return this.Description;
  }
  
  setDescription(Description) {
    this.Description =Description ;
  }
  getPhoto() {
    return this.Photo;
  }
  
  setPhoto() {
    this.Photo =Photo ;
  }
  getStatus() {
    return this.Status;
  }
  
  setStatus(Status) {
    this.Status =Status ;
  }

  toJSON(){
    return {        
        Title:this.Title,
        Address : this.Address,
        Phone : this.Phone,
        Email : this.Email,
        Description : this.Description,
        Photo : this.Photo ,
        Status : this.Status
    
    }
  }
}
module.exports = Faculty;
