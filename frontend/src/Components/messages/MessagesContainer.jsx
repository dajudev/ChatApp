import Chat from "./Chat";
import MessageInput from "./MessageInput";
import IntroMessage from "./IntroMessage";

const MessagesContainer = () => {
  const noChatSelected = false;

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {/* Header */}
      {noChatSelected ? (
        <IntroMessage />
      ) : (
        <>
          <div className="bg-slate-500 px-4 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">John doe</span>
          </div>
          <Chat />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;
