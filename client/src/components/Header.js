// import React from 'react';
// import './Header.css';
// import {NavLink, useNavigate} from 'react-router-dom';
// import { FaCartShopping } from "react-icons/fa6";
// const Header = () => {
//     const n=useNavigate()
//     function h(){
//         n('/');
//     }
    
//     return (
//         <div className='h-auto w-auto sticky top-0'> <div className='leading-[55px] sticky top-[0px] bg-[#131921] text-white flex justify-between items-center z-[1] pt-[10px] overflow-y-hidden '> 
//         <h2 className='ml-[22px] relative top-[2px]'><FaCartShopping className='relative top-[30px] text-[20px]'></FaCartShopping><p className='relative left-[25px] bottom-[7px] text-[20px] cursor-pointer ' onClick={h}>ECOMMERCE APP lor</p></h2>
//         <div className='flex gap-[10px] mr-[20px]'>
//         < NavLink className='opacity-[0.9]  text-white hover:opacity-[1] hover:underline ' to='/'>Home</NavLink>
//         < NavLink className='opacity-[0.9]  text-white hover:opacity-[1] hover:underline' to='/category'>Category</NavLink>
//         < NavLink className='opacity-[0.9]  text-white hover:opacity-[1] hover:underline' to='/register'>Register</NavLink>
//         < NavLink className='opacity-[0.9]  text-white hover:opacity-[1] hover:underline' to='/login'>Login</NavLink>
//         < NavLink className='opacity-[0.9]  text-white hover:opacity-[1] hover:underline' to='/cart'>Cart</NavLink>
//         </div>
//      </div></div>
       
//     );
// }
// export default Header;






import React, { useEffect } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from '../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useSearch } from '../context/search';
import { IoIosSearch } from "react-icons/io";
import { useCart } from '../context/cart';

const Header = (props) => {
    const[ress,setress]=useSearch();
    const [cart,setCart]=useCart();
    // const [toggle,setToggle]=useState(false);
    const toggle=props.toggle;
    const setToggle=props.setToggle;
    function user(){
     setToggle(!toggle)
    }
    const navigate = useNavigate();
function handlelogout(){
    setAuth({user:null,token:""});
    localStorage.removeItem('auth');
    localStorage.removeItem("cart");
    setCart([]);
    toast.success('Logout successfully');
    navigate('/login');
}
    function handleNavigation() {
        navigate('/');
    }
    const [keyword,setKeyword]=useState('');
    const [auth,setAuth]=useAuth();
const searc=async(e)=>{
e.preventDefault();
try {
    const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/search`,{keyword});
    // console.log(data);
    setress(data);
    navigate('/search')
} catch (error) {
    console.log(error);
}
}
// useEffect(()=>{
//     if(ress.length>0){
//         console.log(ress);
//         searc();
//     }

// },[])
//bg-[#131921] text-white
    return (
     <div >
        <div className=' leading-[75px]  overflow-y-hidden sticky  top-0  flex justify-between items-center z-[10] pt-[10px] ba'>
            <h2 className='ml-[22px] flex items-center'>
                <FaCartShopping className='text-[20px] mr-[5px] text-[black]' />
                <p className='text-[20px] cursor-pointer' onClick={handleNavigation}>ECOMMERCE APP</p>
            </h2>
            <div  className='relative left-[20px]'>
                <form onSubmit={searc} className='leading-[30px] flex   '>
                   
                    <input className='   border-[2px] border-[grey] search ' type='text' placeholder='search products' onChange={(e)=>{
                        setKeyword(e.target.value)
                    }}></input>
                   <button className='bg-[#012aa7] bb relative right-[38px] w-[40px] p-[10px] border-[2px] border-[grey] ha'><IoIosSearch className='text-[white]'></IoIosSearch>
                   </button>
                 
                </form>
            </div>
            <div className='flex gap-[16px] mr-[50px]'>
                <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/'>Home</NavLink>
                {/* <NavLink className='opacity-[0.9] text-white hover:opacity-[1] hover:underline' to='/category'>Category</NavLink> */}
{
    auth.user ? ( 
        
       <div onClick={user} className='cursor-pointer'> {auth?.user?.name}</div>
        // <NavLink  className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/login'>Logout</NavLink>
    
    ) :(<div className='flex gap-[16px]'>
        <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/register'>Register</NavLink>
        <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/login'>Login</NavLink>
    </div>)
}

                
                <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/cart'>Cart({cart?.length})</NavLink>
            </div>
      </div>
        <div >
        {
            !toggle?( <div></div>):(<div className='h-[200px] w-[100vw] text-black absolute left-[1400px] top-[90px] flex flex-col gap-[15px]'>
               {auth?.user?.role==1?(
                  <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/admindashboard'>Dashboard</NavLink>):(
                <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/userdashboard'>Dashboard</NavLink>
               )
            }
                <NavLink className='opacity-[0.9]  hover:opacity-[1] hover:underline' to='/login' onClick={handlelogout}>Logout</NavLink>
            </div>)
        }
       
        </div>
        <ToastContainer /> 
        </div>
    );
}

export default Header;

