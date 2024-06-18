import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({

    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    role:{
        type: String,
        required: true,
        enum: ['Admin', 'Player']
    },
    profilePic:{
        type: String,
        default: ""
    }

    
},{timestamps:true});

//CREATING USER MODEL USING THE SCHEMA DEFINED ABOVE
const User = mongoose.model("User",userSchema);
export default User;