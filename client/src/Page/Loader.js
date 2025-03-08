import React, { useEffect } from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
const Loader=()=> {
    const navigate=useNavigate();
    const [count,setCount]=useState(5);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount(count-1);
        },1000);
        if(count==0){
            navigate("/");
            clearInterval(interval);
        }
    },[count,navigate]);
    return(
        <div className=" h-[100vh]  flex flex-col justify-center items-center gap-[10px]">
            <h1>Loading...</h1>
            <div className="loader"></div>
            {
                count==0?(navigate("/login")):( <div>Redirecting you to home page in {count} </div>)
            }
           
        </div>
    )
};
export default Loader;