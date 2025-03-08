import React from "react";
import { NavLink } from "react-router-dom";
const Adminmenu=(props)=>{
return (
    <div>
          <div className=" h-[400px] w-[300px] overflow-hidden relative left-[10px]  top-[20px]   text-center">
        <h1 className="text-[30px]">Dashboard</h1>
        <div className="flex flex-col gap-[10px] mt-[20px]">
        <NavLink to='/admindashboard/createcategory ' className='hover:bg-sky-800 focus:bg-sky-800'  >Create Category</NavLink>
        <NavLink to='/admindashboard/createproducts' className='hover:bg-sky-800 focus:bg-sky-800'>Create Products</NavLink>
        <NavLink to='/admindashboard/products' className='hover:bg-sky-800 focus:bg-sky-800'>Products</NavLink>
        <NavLink to='/admindashboard/orders' className='hover:bg-sky-800 focus:bg-sky-800'>Orders</NavLink>
        <NavLink to='/admindashboard/users' className='hover:bg-sky-800 focus:bg-sky-800'>Users</NavLink>
        </div>
      
    </div>
     <div className="relative left-[400px] bottom-[350px]">{props.children}</div> 
    </div>
  
)
}
export default Adminmenu;