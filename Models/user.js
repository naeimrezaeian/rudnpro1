class User {   
    constructor(id,name,birthday,sex ,email ,phone ,address ,country ,city ,
       fieldId,typeStudy ,formStudy ,yearStudy ,additional ,
        photo ,access,status,password ){  
            this.id=id,              
            this.name = name;
            this.birthday = birthday;
            this.sex = sex;
            this.email = email;
            this.phone = phone;
            this.address = address;
            this.country = country;
            this.city = city;           
            this.fieldId = fieldId;
            this.typeStudy = typeStudy;
            this.formStudy = formStudy;
            this.yearStudy = yearStudy;
            this.additional = additional;
            this.photo = photo;
            this.access = access;
            this.status = status,
            this.password = password;
        }
        

}
module.exports = User

