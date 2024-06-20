import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2"> 
       <input type="text" placeholder="Search..." className="input input-bordered rounded-full bg-neutral-800 text-white" /> 
       <button type="submit" className="btn btn-circle bg-sky-500 text-white hover:bg-neutral-600">
       <IoSearchSharp  className="w-6 h-5 outline-none"/>
       </button>
    </form>
  )
}

export default SearchInput