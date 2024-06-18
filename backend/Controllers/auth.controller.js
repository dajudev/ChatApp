import bcrypt from 'bcryptjs';
import User from "../Models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req,res) =>{
    try {
        const {fullName, username, password, confirmPassword, role} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }
        const user =  await User.findOne({username})
        if(user){return res.status(400).json({error: "Username already exists"})}

        //HASH PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const profilePic = `https://avatar.iran.liara.run/username?username=${username}&length=1`
        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            role,
            profilePic
        })
        if(newUser){
            //GENERATE JWT TOKEN
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName: fullName,
                username: username,
                profilePic: profilePic
            })
        }else{
            return res.status(400).json({error: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error Signup Controller: "+error.message);
        return res.status(500).json({error: "Internal Error"})
    }
}

export const login = async (req,res) =>{
    try {
        const {username, password} = req.body;
        const user =  await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid credentials"})
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error Login Controller: "+error.message);
        return res.status(500).json({error: "Internal Error"})
    }
}

export const logout = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out succesfully"})
    } catch (error) {
        console.log("Error Logout Controller: "+error.message);
        return res.status(500).json({error: "Internal Error"})
    }
}
