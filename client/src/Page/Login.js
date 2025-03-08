import React from 'react';
import Layout from '../components/Layout';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import {useAuth} from '../context/auth';
// import { toast } from 'react-toastify';
const Login = () => {
   const navi=useNavigate();
   const [auth,setAuth]=useAuth();
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    function forgot(){
        navi('/forgot');
    }
    async function handle(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email,password });
            if (res.data.success) {
                toast.success(res.data.message);
                console.log(res.data.success);
                console.log(res.data.message);
                setAuth({...auth,user:res.data.d,token:res.data.token});
                localStorage.setItem("auth",JSON.stringify(res.data));
                // localStorage.setItem("aut", JSON.stringify({ ...auth,user: res.data.d, token: res.data.token }));
                navi('/');
            
            } else {
             toast.error(res.data.message);
          
            }
        } catch (e) {
            console.log(e);
        }
       
    }
    return (
        <div>
        <Layout >
            <div className='h-[100vh] w-[100%]  '>
            <div className='relative  top-[60px]  opacity-[0.9] left-[600px]  rounded-[5%] h-[500px] w-[400px] pl-[50px] pb-[30px] text-black'>
            <h1 className='text-[40px] mb-[30px] relative left-[50px]'>LOGIN</h1>
           <div className='relative  w-[300px]  '>
           <form className='flex flex-col gap-[20px] ' onSubmit={handle}>
        
            <input className='hah p-[6px] pl-[10px] border-[3px] relative right-[30px]' type="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}></input>
       
            <input className='hah p-[6px] pl-[10px] border-[3px] relative right-[30px]' type="password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            {/* <input className=' rounded-[9%]' type="password" placeholder="Confirm password"></input> */}
            <button className='Butto lo' >Login</button>
            
           </form>
           <button className='Butto fo' onClick={forgot}>Forgot password</button>
           </div>
            </div>
            </div>
           
          
           
        </Layout>
        <ToastContainer/>
    </div>
    );
};

export default Login;