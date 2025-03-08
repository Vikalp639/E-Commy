import { useState,useContext,createContext,useEffect } from "react";
import axios from "axios";
const CartContext=createContext();
const CartProvider=({children})=>{
    // const [auth,setAuth]=useState({
    //     user:null,
    //     token:"",
    // });
    const[cart,setCart]=useState([]);
      //default axios
//   axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        let existing=localStorage.getItem('cart')
      
        if(existing){
            setCart(JSON.parse(existing));
        }
    },[]);
    // useEffect(()=>{
    //     if(cart.length==0){
    //         localStorage.removeItem('cart')
    //     }
    // },[cart])
    return (<CartContext.Provider value={[cart,setCart]}>{children}</CartContext.Provider>);
};
 const useCart=()=>useContext(CartContext);
 export {useCart,CartProvider};