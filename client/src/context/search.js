import { useState,useContext,createContext,useEffect } from "react";
import axios from "axios";
const AuthContext=createContext();
const SearchProvider=({children})=>{
    // const [auth,setAuth]=useState({
    //     user:null,
    //     token:"",
    // });
    const[ress,setress]=useState([]);
      //default axios
//   axios.defaults.headers.common["Authorization"] = auth?.token;
//     useEffect(()=>{
//         const data=localStorage.getItem("auth")
      
//         if(data){
//             const parsedData=JSON.parse(data);
//             setAuth({...auth,user:parsedData.d,token:parsedData.token});
//         }
//     },[]);
    return (<AuthContext.Provider value={[ress,setress]}>{children}</AuthContext.Provider>);
};
 const useSearch=()=>useContext(AuthContext);
 export {useSearch,SearchProvider};