import React, { useEffect,useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
const PrivateAdmin=()=> {
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    useEffect(()=>{
        const authcheck=async()=>{
            const r=await axios.get(`${process.env.REACT_APP_API}/api/v1/admin`,{headers:{'Authorization':auth?.token}});
            if(r.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.token)
            authcheck();
        
    },[auth?.token]);
    return (
      ok?<Outlet></Outlet>:<Loader/>
    );
};
export default PrivateAdmin;