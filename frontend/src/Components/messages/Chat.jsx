import { useRef, useEffect } from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "../Skeletons/MessageSkeleton";
import Message from "./Message"
import useListenMessages from "../../Hooks/useListenMessages";

const Chat = () => {

  const {messages, loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  
  useEffect(() => {
    let timer1 = setTimeout(() => lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    return () => {
      clearTimeout(timer1);
    };
  }, [messages])
  

  return (
    <div className="px-4 flex-1 overflow-auto" id="chatContainer">
        {!loading && messages.length > 0 && (
        
          messages.map((message)=>(
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))
        )}
        {loading && <div className="mt-5"> 
          {[...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
          </div> 
        }
        {
          !loading && messages.length === 0 && (
            <p className="text-center text-white mt-5"> Send a new message to  start the conversation </p>
          )
        }
        
    </div>
  )
}

export default Chat