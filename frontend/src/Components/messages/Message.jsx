import {useAuthContext} from '../../Context/AuthContext';
import useConversation  from "../../zustand/useConversations";
import { extractTime } from '../../Utils/extractTime';

const Message = ({message}) => {
  
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id
  const formmattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBg = fromMe ? 'bg-blue-500' : '';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";


  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile Img"
            src= {profilePic}
          />
        </div>
      </div>
      <div className= {`chat-bubble ${bubbleBg} pb-2 ${shakeClass} `} >{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">{formmattedTime}</div>
    </div>
  );
};

export default Message;
