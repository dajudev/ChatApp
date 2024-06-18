import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js';

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({"Message": "Unauthorized - No token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({"Message": "Unauthorized - Invalid token"});
        }
        const user =  await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(500).json({"Message": "User not found"});
        }
        req.user =  user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({"Message": "Interal server error"});
    }
}

export default protectRoute;