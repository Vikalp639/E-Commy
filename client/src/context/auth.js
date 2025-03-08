import { useState,useContext,createContext,useEffect } from "react";
import axios from "axios";
const AuthContext=createContext();
const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:"",
    });
    // const[productid,setproductid]=useState(null);
      //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        const data=localStorage.getItem("auth")
    
        if(data){
            const parsedData=JSON.parse(data);
            setAuth({...auth,user:parsedData.d,token:parsedData.token});
        }
    },[]);
    return (<AuthContext.Provider value={[auth,setAuth]}>{children}</AuthContext.Provider>);
};
 const useAuth=()=>useContext(AuthContext);
 export {useAuth,AuthProvider};