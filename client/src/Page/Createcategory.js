import React, { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import Adminmenu from "./Adminmenu";
import { ToastContainer, toast } from 'react-toastify';


const  Createcategory=()=> {
    const [categories,Setcategories]=useState([]);
  const getcategory=async()=>{
    const aa=await axios.get(`${process.env.REACT_APP_API}/api/v1/getcategory`);
     Setcategories(aa.data.category);
   
  }
  useEffect(()=>{
    getcategory();
  },[]);
  const [name,setName]=useState("");
  const[visible,setVisible]=useState(true);
  const [c1,setc1]=useState('');
  const [updatedname,setupdatedname]=useState('');
  async function hanler(e) {
    e.preventDefault();
    try{
        const re=await axios.post(`${process.env.REACT_APP_API}/api/v1/createcategory`,{name});
        if(re?.data?.success){
       getcategory();
       toast.success('category is created');
        }
        else{
            toast.error('category is not created');
            console.log('htt2');
        }
    }
   catch(e){
    toast.error('error in catch');
    console.log('htt3');
    console.log(e);
   }
  }
//   function updatecategory(){
//    setVisible(!visible);
//    setc1()
//   }
    return (
        <div>
            <Layout>
            <Adminmenu>
           
            <div>
                <p className="text-[30px]"> Manage Categories</p>
               
                <div className="mt-[40px]">
                   
                   {visible?(<div>
                    <form onSubmit={hanler} className="flex flex-col w-[300px] mb-[30px]">
                    <input className="w-[200px] mt-[10px]" type='text' placeholder="Enter new Category name" onChange={(e)=>{setName(e.target.value)}}></input>
                    <button className="relative right-[20px] mt-[20px] bg-sky-600 w-[160px]">Submit</button>
                </form>
                    <div className="flex gap-[420px] relative left-[10px] bottom-[7px] underline">
                    <div className="text-[20px]">Name</div>
                    <div className="text-[20px]">Action</div>
                    </div>
                    {
    categories?.map((c,index)=>(
        <div key={index}>
          
             <div className=" flex m-[10px] ">
             <div key={c._id}>{c.name}</div>
           <div>
             <button className="bg-sky-600 absolute left-[450px] w-[50px] cursor-pointer " onClick={()=>{
                setVisible(!visible);
                setc1(c);
               setupdatedname(c.name)
             }}>Edit</button>
             <button className="bg-red-600 absolute left-[520px] w-[60px] " onClick={async()=>{
                await axios.delete(`${process.env.REACT_APP_API}/api/v1/deletecategory/${c._id}`);
                getcategory();
             }}>Delete</button>
            </div>
         
        </div>
        </div>
       
       
        
    ))
}
                   </div>):(<div></div>)}
               
                </div>

            </div>
            
           
            </Adminmenu>
            
           
            </Layout>
            {!visible?(<div className=" h-[200px]  z-[1000] absolute top-[300px] left-[600px] translate-z-[100px]">
                <form onSubmit={async(e)=>{
                    e.preventDefault();
                   
                    try{ const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/updatecategory/${c1._id}`,{name:updatedname});
                    if(data?.success){
                       
                        getcategory();
                       
                    }
                    else{
                       
                        console.log(data.message);
                    }
                    setVisible(!visible);
                    setupdatedname('');
                     setc1('');}
                     catch(e){
                        console.log(e);
                      
                     }
                   
                }}>
                   
                    <input type='text' value={updatedname} onChange={(e)=>{
                        setupdatedname(e.target.value);
                        
                    }}></input>
                    <button className=" bg-sky-600 absolute top-[50px] right-[180px] ">Change</button>
                </form>
            </div>):(<div ></div>)}
            <ToastContainer />
        </div>
    );
};
export default Createcategory;