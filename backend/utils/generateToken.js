import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '2d'
    });

    res.cookie("jwt", token, {
        maxAge: 2*24*60*60*1000, //2DAYS 24 HOURS 60 MINUTES 60 SECONDS 1000 MILISECONDS
        httpOnly: true, //PREVENT XSS attracks cross-site scripting attacks
        sameSite: "strict", //PREVENT CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;