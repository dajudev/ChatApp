import Message from "./Message"

const Chat = () => {
  return (
    <div className="px-4 flex-1 overflow-auto" id="chatContainer">
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Chat