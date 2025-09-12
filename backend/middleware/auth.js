const jwt= require('jsonwebtoken');

module.exports = function(req,res,next){
    const token= req.headers["authorization"] && req.headers["authorization"].replace("Bearer ", "");
    if(!token){
        return res.status(401).json({message:'No token, authorization denied'})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=data;
        next();
    } catch (error) {
         res.status(401).json({message:'Token is not valid'});
    }
}