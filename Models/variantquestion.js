
class VariantQuestion{
    constructor(QuestionId,VariantId,Status){        
        this.questionId=QuestionId;
        this.variantId=VariantId;
        this.status=Status;
    }
    
    getQuestionId(){
        return this.QuestionId;
    }
    setQuestionId(QuestionId){
        this.QuestionId=QuestionId;
    }
    getVariantId(){
    return this.VariantId;
    }
    setVariantId(VariantId){
        this.VariantId=VariantId;
    }
    getStatus(){
        return this.Status;
    }
    setStatus(Status){
        this.Status=Status;
    }
    toJSON(){
        return {           
            QuestionId:this.QuestionId,
            VariantId:this.VariantId,
            Status:this.Status
        }
    }
}
module.exports=VariantQuestion;