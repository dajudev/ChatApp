import mongoose from "mongoose";

const conversationSchema =  new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
},{timestamps:true});

//CREATING CONVERSATION MODEL USING THE SCHEMA DEFINED ABOVE
const Conversation = mongoose.model("Conversation",conversationSchema);
export default Conversation;