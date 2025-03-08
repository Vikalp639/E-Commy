import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import { ToastContainer,toast } from "react-toastify";
import Adminmenu from "./Adminmenu";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const  Createproduct=()=> {
  const navi=useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
 
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories,Setcategories]=useState([]);
  const [sel,setsel]=useState("");
  const getcategory=async()=>{
    const aa=await axios.get(`${process.env.REACT_APP_API}/api/v1/getcategory`);
     Setcategories(aa.data.category);
   
  }
  useEffect(()=>{
    getcategory();
  },[]);
   async function h (e) {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
     productData.append("category",sel);
    //  productData.append("shipping",shipping);
      const { data } = await axios.post(
       `${process.env.REACT_APP_API}/api/v1/createproduct`,
        productData
      );
      if (data?.success) {
      toast.success('product is created');
      navi('/admindashboard/products')
      } else {
       console.log('not created product')
      }
    } catch (error) {
      console.log(error);
    
    }
  };
    return (
        <div>
            <Layout>
            <Adminmenu>
           <div className="text-[30px] mb-[20px]">Create Product</div>
           <div>
           <form className="flex flex-col gap-[20px]" onSubmit={h}>
               <div>
                <label>Category:</label>
                <select value={sel} onChange={(e)=>{
                  setsel(e.target.value)
                }
                
                }
                required>
                  <option value="">Select a category</option>
                  {
                    categories.map((c)=>(
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))
                  }
                </select>
               </div>
                <input type='text' placeholder="Enter name of product" onChange={async(e)=>{
               setName(e.target.value);
                }}></input>
                <textarea placeholder="Enter decription" onChange={async(e)=>{
               setDescription(e.target.value);
                }}></textarea>
                <input type='text' placeholder="Enter price of product" onChange={async(e)=>{
               setPrice(e.target.value);

                }}></input>
                <input type='text' placeholder="Enter quantity" onChange={async(e)=>{
               setQuantity(e.target.value);
                }}></input>
                  {/* <select
                  
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <option value={0}>Select shipping</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select> */}
                 <label className="">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                <div className="mt-[30px] relative left-[100px]">
                <button className=" w-[160px]  bg-sky-600">Submit</button>
                </div>
              
            </form>
           </div>
            
        
           
            </Adminmenu>
            
           
            </Layout>
        <ToastContainer/>
        </div>
    );
};
export default Createproduct;