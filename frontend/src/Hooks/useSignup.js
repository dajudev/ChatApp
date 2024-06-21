import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../Context/AuthContext";

const useSignup = () => {

  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext()
  
  const signup = async({fullName,username,password,confirmPassword,role})=>{
    setLoading(true)
    try {
      const res = await fetch("/api/v1/auth/signup",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({fullName,username,password,confirmPassword,role})
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

  return  {loading, signup}
}

export default useSignup