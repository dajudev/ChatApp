import Sidebar from "../../Components/sidebar/Sidebar";
import MessagesContainer from "../../Components/messages/MessagesContainer";

const Home = () => {
  return <div className="flex sm:h-[450px] md:h-[550px] rounded-lg shadow-md bg-gray-400  bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-20">
    <Sidebar/>
    <MessagesContainer/>
  </div>;
};

export default Home;
