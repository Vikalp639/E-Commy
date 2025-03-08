import React from "react";
import { NavLink } from "react-router-dom";
const Usermenu=(props)=>{
return (
    <div>
          <div className=" h-[400px] w-[300px] overflow-hidden relative left-[10px]  top-[20px] border-r-[1px] border-b-[1px] border-black  text-center">
        <h1 className="text-[30px]">Dashboard</h1>
        <div className="flex flex-col gap-[10px] mt-[20px]">
        <NavLink to='/userdashboard/profile ' className='hover:bg-sky-800 focus:bg-sky-800'  >Profile</NavLink>
        <NavLink to='/userdashboard/order' className='hover:bg-sky-800 focus:bg-sky-800'>Orders</NavLink>
        </div>
      
    </div>
     <div className="relative left-[400px] bottom-[350px]">{props.children}</div> 
    </div>
  
)
}
export default Usermenu;