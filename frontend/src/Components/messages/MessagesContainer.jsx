import Chat from "./Chat";
import MessageInput from "./MessageInput";
import IntroMessage from "./IntroMessage";
import useConversations from '../../zustand/useConversations'
import { useEffect } from "react";

const MessagesContainer = () => {
  
  const {selectedConversation,setSelectedConversation} = useConversations();

  useEffect(() => {
    //cleanup function unmounts
    return () => {
      setSelectedConversation(null);
    }
  }, [setSelectedConversation])
  

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {/* Header */}
      {!selectedConversation ? (
        <IntroMessage />
      ) : (
        <>
          <div className="bg-slate-500 px-4 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.fullName} </span>
          </div>
          <Chat />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;
