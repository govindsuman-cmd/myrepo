import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";
const Header = () => {
  const [auth,setAuth]=useAuth()
  const handleLogout=()=>{
    setAuth({
      ...auth,user:null,token:""
    })
    localStorage.removeItem('auth');
    toast.success("Logout succesfully")
   }
  return (
    <>
       <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div>
          <Link to="/" className="text-white text-lg font-bold">Logo</Link>
        </div>
        
        {/* Navigation links on the right */}
        <div className="flex items-center space-x-4 mr-8">
          <Link to="/" className="text-white text-2xl ">Home</Link>
          {auth.user? (
            <Link to="/dashboard" className="text-white text-2xl">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="text-white text-2xl">Login</Link>
              <Link to="/signup" className="text-white text-2xl">SignUp</Link>
            </>
          )}
        </div>

        {/* Logout button if user is authenticated */}
        {auth.user && (
          <button className="text-white w-25" onClick={handleLogout}>LogOut<span><IoIosLogOut /></span></button>
        )}
      </div>
    </nav>
    </>
  );
};

export default Header;