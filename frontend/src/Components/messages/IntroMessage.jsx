import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../Context/AuthContext";

const IntroMessage = () => {

  const {authUser} = useAuthContext();


  return (
    <div className="flex flex-col justify-center w-full h-full">
        <div className="px-4 text-cente sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p>Welcome 👋 {authUser.fullName} ⚽</p>
            <p> Select a  chat to start messaging</p>
            <TiMessages  className="text-3xl md:text-6xl text-center"/>
        </div>
    </div>
  )
}

export default IntroMessage