import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

export const Cart=()=>{
    const [cart,setCart]=useCart();
    const [auth,setAuth]=useAuth();
    const navi=useNavigate();
  const[total,setTotal]=useState(0);
  let a=0;
  const totalprice=()=>{
    try{
        cart?.map((item)=>{
            a=a+item.price;
        })
        setTotal(a);
    }
   catch(e){
    console.log(e);
   }
  }
  useEffect(()=>{
   
    totalprice();
  },[cart]);
  let arr=[];
  cart.map((c)=>{
    arr.push(c._id);
  })
  const aa=auth?.user?._id;
  async function pay(){
    try {
        if(auth?.user?._id){
            const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/make`,{
                arr,aa
            })
            if(data.success){
            //     console.log(arr);
            //     console.log(arr.length);
            //   console.log(data.q);
              arr=[];
              localStorage.removeItem('cart');
              navi('/userdashboard/order')
               setCart([]);
            }
            else{
                console.log(data.message)
            }
        }
        
    } catch (error) {
        console.log(error);
    }
  }
    return (<div>
        <Layout>


   
    <div> {
        
                cart?.length>0?(<div className="flex gap-[450px]">
                <div className="flex flex-col gap-[10px] mt-[30px]">
                    <div className="mb-[20px] text-center text-[17px]">Total Items in Cart : {cart.length}</div>
                    {
                        cart?.map((p,index)=>(
                            <div className='flex  ' key={index}>
                          
            <div className='border-[2px] p-[18px]  bg-[white] hah flex w-[600px] gap-[70px] '  onClick={()=>{
                           
                            
                          }} >
            <img className='w-[200px] h-[160px] rounded-[5%] border-b-[2px] mb-[15px] ml-[15px]' src={`${process.env.REACT_APP_API}/api/v1/getphoto/${p._id}`} alt='photoff'></img>
            
            <div>
            <div className='text-[20px]' >{p.name} </div>
                                <div>{p.description}</div>
                                <div className='mt-[8px]'>${p.price}</div>
                                <div className='flex gap-[40px] mt-[30px] ml-[0px]'>
                               
                                <button className='bg-red-500 w-[100px] rounded-[5%] h-[26px]' onClick={()=>{
                    let arr=[...cart];
                    let idx=arr.findIndex((item)=>item._id===p._id);
                    arr.splice(idx,1);
                 setCart(arr);
                 localStorage.setItem('cart',JSON.stringify(arr));
                }}>Remove</button>
                                </div>
            </div>
            
                          
                               
            </div>
                                
                               
                                
                            
                            </div>
                        ))
                    }
                   </div>
                   <div className="mt-[30px] flex flex-col gap-[20px] ">
                   <div className="text-[26px]">Cart Summary</div>
                   <div className="">Total Price: ${total}</div>
                   {
                    auth?.user?.address?(<div>
                        <div>Current Address:{auth?.user?.address}</div>
                        <div className="flex flex-col gap-[20px] mt-[20px]">
                        <button className="bg-yellow-600 hah w-[140px]" onClick={()=>{
                                navi('/userdashboard/profile')
                        }}>Update Address</button>
                        <button className="bg-sky-500 w-[140px] hah" onClick={pay}>Make Payment</button>
                        </div>
                    </div>):(<div>
                        <div>Please Login to CheckOut</div>
                        <button  className="bg-sky-600 hah p-[4px] w-[90px]" onClick={()=>{
                            navi('/login')
                        }}>Login</button>
                          {/* <button className="bg-sky-500 w-[140px] hah" onClick={pay}>Make Payment</button> */}
                    </div>)
                   }
                   
   </div>
   </div>):(
                    <div>
                        <div className="text-center text-[26px] mt-[200px]">No Items in the Cart</div>
                        <button className="bg-[green] relative left-[700px] mt-[20px] w-[130px] h-[30px] hah">
                        <NavLink to='/'>
                        Go to Home
                        </NavLink>
                        </button>
                      
                        
                    </div>)
                    
            }</div>
             
           
       
        </Layout>
      
    </div>)
}