import React, { useEffect,useState } from "react";
import axios from "axios"; 
import { useProd } from "../context/prod";
import Adminmenu from "./Adminmenu";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
const SingleProduct=()=>{
    const [productid,setproductid]=useProd();
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
    async function del(){
        let ans=window.prompt('Are you sure you want to delete');
        if(!ans)
            return;
        await axios.delete( `${process.env.REACT_APP_API}/api/v1/deleteproduct/${productid}`);
        navi('/admindashboard/products');
    }
     async function h (e) {
      e.preventDefault();
      console.log(productid);
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
       productData.append("category",sel);
      //  productData.append("shipping",shipping);
        const { data } = await axios.put(
         `${process.env.REACT_APP_API}/api/v1/updateproduct/${productid}`,
          productData
        );
        if (data?.success) {
       console.log('updated')
       
        } else {
         console.log('not updated product')
        }
      } catch (error) {
       
        console.log(error);
      
      }
    };
    const upd=async()=>{
      try {
        if(productid){
          const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/getproductbyid`,{productid});
        if(data?.success){
         
         setPrice(data.product.price);
         setQuantity(data.product.quantity);
         setName(data.product.name);
         setDescription(data.product.description)
       
         setsel(data.product.category.name)
        }
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
    upd();
    },[productid])
      return (
          <div>
              <Layout>
              <Adminmenu>
             <div className="text-[30px] mb-[20px]">Update Product</div>
             <div>
             <form className="flex flex-col gap-[20px]" onSubmit={h}>
                 <div>
                  <label>Category:</label>
                  <select value={sel} onChange={(e)=>{
                    setsel(e.target.value)
                    // console.log(e.target.value);
                  }
                  
                  }
                  required>  
                    <option value=''>{sel}</option>
                    {
                      categories.map((c)=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))
                    }
                  </select>
                 </div>
                  <input type='text' placeholder="Enter name of product" value={name} onChange={async(e)=>{
                 setName(e.target.value);
                  }}></input>
                  <textarea placeholder="Enter decription" value={description} onChange={async(e)=>{
                 setDescription(e.target.value);
                  }}></textarea>
                  <input type='text' placeholder="Enter price of product" value={price} onChange={async(e)=>{
                 setPrice(e.target.value);
  
                  }}></input>
                  <input type='text' placeholder="Enter quantity" value={quantity} onChange={async(e)=>{
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
                  <button className=" w-[140px] h-[30px] rounded-[5%]  bg-sky-600">Update</button>
                
                  </div>
                
              </form>
             </div>
              
          
             <button className=" w-[140px] h-[30px] rounded-[5%] bg-red-600 ml-[100px] relative left-[270px] bottom-[30px]" onClick={del}>Delete</button>
              </Adminmenu>
              
             
              </Layout>
         
          </div>)
}

export default SingleProduct;