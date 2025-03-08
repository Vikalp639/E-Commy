import React from 'react';
import Layout from '../components/Layout';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
const Register = () => {
   const navi=useNavigate();
    const [name,setName]=useState('');
    const[secret,setSecret]=useState('');
    const [email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[address,setAddress]=useState('');
    const[password,setPassword]=useState('');
    async function handle(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, { name, email, phone, address, password,secret });
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
        console.log(name, email, phone, address, password);
    }
    return (
        <div>
        <Layout >
            <div className='h-[100vh] w-[100%]   '>
            <div className='relative  top-[60px]  left-[600px]  rounded-[5%] w-[400px] pl-[50px] pb-[30px] text-black'>
            <h1 className='text-[40px] mb-[20px] relative left-[50px]'>Register</h1>
           <div className='relative  w-[300px] '>
           <form className='flex flex-col gap-[20px] ' onSubmit={handle}>
            <input className='hah p-[6px] pl-[10px] ' type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px]' type="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px] ' type="text" placeholder="Enter your phone no" onChange={(e)=>{setPhone(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px] ' type="text" placeholder="Enter your address" onChange={(e)=>{setAddress(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px]' type="password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            <input className='hah p-[6px] pl-[10px] ' type="text" placeholder="Secret question " onChange={(e)=>{setSecret(e.target.value)}}></input>
            <button className='Butto ho'>Register</button>
           </form>
           </div>
            </div>
            </div>
           
          
           
        </Layout>
        <ToastContainer/>
    </div>
    );
};

export default Register;