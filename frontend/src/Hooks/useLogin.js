import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../Context/AuthContext";

const useLogin = () => {

  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext()
  
  const login = async({username,password})=>{
    setLoading(true)
    try {
      const res = await fetch("/api/v1/auth/login",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username,password})
      })
      const resData = await  res.json();
      if(resData.error){
        return resData.error;
      }

      localStorage.setItem("user_info", JSON.stringify(resData));
      setAuthUser(resData)
    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  };

  return  {loading, login}
}

export default useLogin