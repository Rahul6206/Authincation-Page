const jwt=require('jsonwebtoken');

const iscorrectJwt=(req,res,next)=>{
    const Auth= req.headers['authorization'];
    if(!Auth){
        res.status(403).json({message:"Unauthorize Request"})
    }
    try {
        const decodec=jwt.verify(Auth,process.env.JWT_SECRET)
        req.user=decodec;
        next();
    } catch (error) {
        res.status(401).json({message: error});
    }

}

module.exports=iscorrectJwt;