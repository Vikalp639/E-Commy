import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = (props) => {
    const [toggle,setToggle]=useState(false);
    return (
        <div className='' >
         <div className='sticky top-0 z-[1110]'>
         <Header toggle={toggle} setToggle={setToggle}></Header>
         </div>
            
     

            <main  onClick={()=>{
            setToggle(false);
         }}className='min-h-[84vh] apap '>  {props.children}</main>
      <div  onClick={()=>{
            setToggle(false);
         }}>
      <Footer></Footer>
      </div>
           
            
        </div>
    );
}
export default Layout;