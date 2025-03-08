import React from 'react';
import './Footer.css';
import {NavLink} from 'react-router-dom';
const Footer=()=>{
    return (
    
            <div className='bg-[#181818] h-[15vh] flex flex-col justify-center items-center text-white mt-[20px]'>
            <h1 className='text-center text-[36px]'>All rights reserved </h1>
            <div className='gap-[10px] flex mt-[10px]'>
            <NavLink className='hover:text-[#f1356d]' to='/about'>About</NavLink>
            <NavLink  className='hover:text-[#f1356d]'to='/contact'>Contact</NavLink>
            <NavLink  className='hover:text-[#f1356d]'to='/policy'>Privacy policy</NavLink>
           
            </div>
            
        </div>
       
        
    );
}
export default Footer;