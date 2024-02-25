import React from 'react'
import Layout from '../Component/Layout'
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/auth';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

    const handleSubmit = async(e) => {
      e.preventDefault();
        try {
          const res=await axios.post(`${process.env.REACT_APP_API_}/api/v1/login`,{
              email,password
            });
            if(res && res.data.message){
              toast.success(res && res.data.message)
              setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
              });
              localStorage.setItem('auth',JSON.stringify(res.data));
              navigate("/");
            }
          } catch (error) {
            toast.error("Something Went wrong")
          }
          console.log('Login credentials:', email,password);
        };
      
        const handleForgotPassword = () => {
          // Add your "Forgot Password" logic here
          console.log('Forgot Password clicked');
        };
  return (
      <Layout>
           <div className="max-w-md mx-auto p-6 bg-gray-300 mt-[120px] rounded-md shadow-lg shadow-blue-500/40">
           <h1 className='text-4xl font-semibold mb-[15px]'>Log In</h1>
      <form onSubmit={handleSubmit}>
          <input
            placeholder='Enter your Email'
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-2 mb-4 border rounded-md"
            required
          />
          <input
            placeholder='Enter Password'
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-2 mb-4 border rounded-md"
            required
          />
        <button
          type="submit"
          className="border-2 px-4 py-2 text-blue-600 font-bold rounded-md hover:bg-blue-600
           hover:text-white w-full sm:w-auto"
        >
          SUBMIT
        </button>
      </form>
      <div
        className="mt-4 text-blue-500 cursor-pointer ease-in-out duration-400
         text-center sm:text-left hover:text-blue-700 "
        onClick={()=>{navigate('/forget-password')}}
      >Forgot Password?
      </div>
    </div>
      </Layout>
  )
}

export default Login