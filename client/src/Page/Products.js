import React, { useState,useEffect } from 'react';
import Layout from '../components/Layout';
import Adminmenu from './Adminmenu';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useProd } from '../context/prod';

const Products=()=>{
    const [productid,setproductid]=useProd();
    const[products,setProducts]=useState([]);
    
const getproducts=async()=>{
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/getproducts`);
     setProducts(data.products);
   
  }
  useEffect(()=>{
    getproducts();
  },[products]);

    return (
        <div> 
            <Layout>
                <Adminmenu>
               
                    <div className='text-[30px] relative left-[330px] mb-[40px]'>All Products</div>
                    <NavLink to="/admindashboard/singleproduct" >
                    <div className='flex gap-[25px] flex-wrap w-[1000px]'>
                    {
                    products.map((p)=>(
<div className='border-[2px] p-[18px]' key={p._id} onClick={()=>{
                    setproductid(p._id);
                    
                    
                  }} >
<img className='w-[200px] h-[200px] rounded-[5%]' src={`${process.env.REACT_APP_API}/api/v1/getphoto/${p._id}`} alt='photoff'></img>
<div  >{p.name}
                        
                        </div>
                        <div>{p.description}</div>
                    
                       
</div>
                        
                       
                        
                    ))
                  }
                    </div>
                    </NavLink>
                    
               
                </Adminmenu>
                </Layout></div>
    )
}
export default Products;