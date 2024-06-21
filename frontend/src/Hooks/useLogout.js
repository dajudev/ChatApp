import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

const useLogout = () => {

    const [loading, setLoading] = useState(false); 
    const {setAuthUser} = useAuthContext();

    const logout = async()=>{
        setLoading(true)
        try {
          const res = await fetch("/api/v1/auth/logout",{
            method: "POST",
            headers: {"Content-Type" : "application/json"}
          })
    
          const resData = await  res.json();
          if(resData.error){
            throw new Error(data.error);
          }
    
          localStorage.removeItem("user_info");
          setAuthUser(null)
        } catch (error) {
          toast.error(error.message)
        } finally{
          setLoading(false)
        }
    }

    return {loading, logout}
}

export default useLogout