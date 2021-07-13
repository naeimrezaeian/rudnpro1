class Model{
     
    constructor(Title,SubjectId,UrlModel,
        Parameters,Description,GeneralModel,Status){            
            this.title=Title;           
            this.subjectId=SubjectId;
            this.urlModel=UrlModel;
            this.parameters=Parameters;
            this.description=Description;
            this.generalModel=GeneralModel;
            this.status=Status;
    }
    
}
module.exports = Model;