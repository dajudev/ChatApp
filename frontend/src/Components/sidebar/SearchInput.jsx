import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversations from "../../zustand/useConversations"
import useGetConversations from "../../Hooks/useGetConversations"
import toast from "react-hot-toast";

const SearchInput = () => {

  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversations();
  const {conversations} = useGetConversations()

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search)return;

    const conversationFilter = conversations.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversationFilter){
      setSelectedConversation(conversationFilter)
      setSearch("")
    }else{
      toast.error("No such user found!")
      setSearch("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2"> 
       <input type="text" placeholder="Search..." className="input input-bordered rounded-full bg-neutral-800 text-white"  
        value={search}  
        onChange={(e) => setSearch(e.target.value)} /> 
       <button type="submit" className="btn btn-circle bg-sky-500 text-white hover:bg-neutral-600">
       <IoSearchSharp  className="w-6 h-5 outline-none"/>
       </button>
    </form>
  )
}

export default SearchInput
