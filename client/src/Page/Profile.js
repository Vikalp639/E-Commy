import React, { useState,useEffect } from "react";
import Usermenu from "./Usermenu";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
const  Profile=()=> {
   
    const [auth,setAuth]=useAuth();
    const [name,setName]=useState(auth?.user?.name);
    const[secret,setSecret]=useState(auth?.user?.secret);
    const [email,setEmail]=useState(auth?.user?.email);
    const[phone,setPhone]=useState(auth?.user?.phone);
    const[address,setAddress]=useState(auth?.user?.address);
    const[password,setPassword]=useState('');
 const i=auth?.user?._id;
    async function handle(e) {
        e.preventDefault();
        try {
            
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/update`, {i, name, email, phone, address,password,secret });
            if (res?.data?.success) {
            
                console.log(res.data.success);
                console.log(res.data.message);
               
                setAuth({...auth,user:res?.data?.d}); 
                // console.log(res.data.updated);
                let ls=localStorage.getItem('auth');
                ls=JSON.parse(ls);
                ls.d=res?.data?.d;
                // ls.token=res?.data?.token;
               // localStorage.setItem("auth",JSON.stringify(res.data));
               localStorage.setItem("auth",JSON.stringify(ls));
               
            } else {
                console.log(res.data.success);
                console.log(res.data.message);
          
            }
        } catch (e) {
            console.log(e);
        }
        
    }
    
    //    useEffect(()=>{
    //         const data=localStorage.getItem("auth")
        
    //         if(data){
    //             const parsedData=JSON.parse(data);
    //             setAuth({...auth,user:parsedData.d,token:parsedData.token});
    //         }
    //     },[t]);
    return (
        <div>
        <Layout >
            <Usermenu>
            <div className='h-[100vh] w-[100%]  '>
            <div className='relative  left-[90px]  opacity-[0.9]   rounded-[5%] w-[400px] pl-[50px] pb-[30px] text-black'>
            <h1 className='text-[40px] mb-[20px] relative left-[50px]'>Update Profile</h1>
           <div className='relative  w-[300px] '>
           <form className='flex flex-col gap-[30px] ' id='hh' onSubmit={handle}>
            <input className=' ' type="text" placeholder="Enter your name" id='h1' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <input className='' type="email" placeholder="Enter your email" id='h2' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input className=' ' type="text" placeholder="Enter your phone no" id='h3' value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input>
            <input className=' ' type="text" placeholder="Enter your address" id='h4' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
            <input className='' type="password" placeholder="Enter your password" id='h5'  value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <input className=' ' type="text" placeholder="Secret question " id='h6' value={secret} onChange={(e)=>{setSecret(e.target.value)}}></input>
            <button className='bg-sky-800 w-[200px] h-[40px] relative left-[50px] mt-[40px]' id='b'>Update</button>
           </form>
           </div>
            </div>
            </div>
            </Usermenu>
            
           
          
           
        </Layout>
       
    </div>
    );
};
export default Profile;