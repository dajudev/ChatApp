import Conversation from '../Models/conversation.model.js'
import Message from '../Models/message.model.js'
import {getReceiverSokcetId,io} from '../Socket/socket.js'

export const sendMessage = async (req,res)=>{
    try {
        
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, receiverId]
            }
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSokcetId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        
        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessages controller", error.message);
        return res.status(500).json({"Message": "Interal server error"});
    }
}


export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, userToChatId]
            }
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        return res.status(500).json({"Message": "Interal server error"});
    }
}