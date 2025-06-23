const joi =require('joi');

const SingUPValidation=(req,res,next)=>{
    const Schema=joi.object({
        name: joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    })
    const {error}=Schema.validate(req.body);
    if(error){

      return  res.status(400).json({message: "Bad Request",error})
        
    }
    next();
}
const SingINValidation=(req,res,next)=>{
    const Schema=joi.object({
        email:joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    })
    const {error}=Schema.validate(req.body);
    if(error){

      return  res.status(404).json({message: "Bad Request",error})
        
    }
    next();
}

module.exports={
    SingINValidation,
    SingUPValidation
}