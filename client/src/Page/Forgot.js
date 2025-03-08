import React from 'react';
import Layout from '../components/Layout';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import {useAuth} from '../context/auth';


const Forgot = () => {
   const navi=useNavigate();
   const [auth,setAuth]=useAuth();
    const [email,setEmail]=useState('');
    const[newpassword,setPassword]=useState('');
    const[secret,setSecret]=useState('');
    
    async function handle(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/forgot`, { email,secret,newpassword });
            if (res.data.success) {
                toast.success(res.data.message);
                console.log(res.data.success);
                console.log(res.data.message);
             
                navi('/login');
            
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
            <div className='relative  top-[60px]  left-[600px]  rounded-[5%] h-[500px] w-[400px] pl-[50px] pb-[30px] text-black'>
            <h1 className='text-[40px] mb-[60px] relative left-[14px]'>Reset Password</h1>
           <div className='relative  w-[300px] '>
           <form className='flex flex-col gap-[30px] ' onSubmit={handle}>
           
            <input className='hah p-[6px] pl-[10px]' type="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px]' type="text" placeholder="Secret question" onChange={(e)=>{setSecret(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px]' type="password" placeholder="Enter your new password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            
           
            <button className='Butto ho'>Reset</button>
           </form>
           </div>
            </div>
            </div>
           
          
           
        </Layout>
        <ToastContainer/>
    </div>
    );
};

export default Forgot;