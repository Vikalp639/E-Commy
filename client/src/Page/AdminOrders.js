import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import Adminmenu from "./Adminmenu";
import axios from "axios";
const  AdminOrders=()=> {
    const[auth,setAuth]=useAuth();
  const [or,setOrder]=useState([]);
  const[productsid,setProductsid]=useState([])
  const[products,setProducts]=useState([]);
//  let order=[];
// const getpro=async()=>{
//   try {
//     const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/getproductbyid`);
//     if(data.success){
//        console.log(data.d);
//     //    order=[data];
//     setProducts(data.d[0].products)
//         setOrder(data.d);
//         // console.log(order);
//         // console.log(order.length)
//     }
// } catch (error) {
//     console.log(error);
// }
// }
let aq=[];
const st=['Not Process','Processing','Shipped','delievered','cancel']
// const [sel,setsel]=useState('')
const buyerid=auth?.user?._id;
  const getOrders=async()=>{
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/adminorder`,{buyerid});
        if(data.success){
           console.log(data.d);
        //    order=[data];
        data.d.map((c)=>{
        aq.push(c)
        })
        // console.log(aq);
        setProducts(aq);
        // setProducts([data.d.products]
            setOrder(data.d);
           
            // console.log(order);
            // console.log(order.length)
        }
    } catch (error) {
        console.log(error);
    }
  }
  // let rr=[];
  // const fe=async()=>{
  //   try {
  //    products?.map(async(p)=>{
  //     const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/getproductbyid`,{p});
  //     rr.push(data.product);
  //     console.log(data.product)
  //   })
  //   setData(rr);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  
 

  // useEffect(() => {
  //   const fe = async () => {
  //     try {
  //       const responses = await Promise.all(
  //         products?.map(async(id) => axios.post(`${process.env.REACT_APP_API}/api/v1/getproductbyid`,{id}))
  //       );
  //       setData(responses.map((res) => res.data.product));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fe();
  // }, []);

  useEffect(()=>{
   
getOrders();




  },[])
//   const id=or?._id;
//   const [stat,setstat]=useState(or?.status)
  const handlestatus=async(stat,id)=>{
    try {
        const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/updateorder`,{id,stat})
        if(data.success){
            console.log(data);
        }
        else{
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
  }
    return (
        <div>
            <Layout>
            <Adminmenu>
       
            <div>
                {
                    or?.length>0?(<div >
                      <p className="text-[30px] relative left-[300px] mb-[40px]"> All Orders</p>
                   
                    
                    <div>
                      {
products?.length>0?(<div className="w-[100vw]  " >
    {
                   products?.map((pi,idx)=>(
                    <div key={idx} >
                      <div className="flex gap-[20px]"><div>{idx+1}.</div>
                      <div><div className="flex gap-[20px] border-[2px] border-[black] w-[500px] pl-[30px] mb-[20px]"> <div className="border-r-[2px] border-r-[black] pr-[20px]">
                       Buyer:{pi?.buyer?.name}
                      </div>
                      <select  onChange={(e)=>{
                  console.log(e.target.value);
                  handlestatus(e.target.value,pi?._id)
                }
                
                }
                required>
                  <option value="">{pi?.status}</option>
                  {
                    st.map((c)=>(
                       
                      <option key={c} value={c}>{c}</option>
                    ))
                  }
                </select>
                      {/* <div className="border-r-[2px] border-r-[black] pr-[20px]">Staus:{pi?.status}</div> */}
                      <div>Quantity:{pi?.products?.length}</div></div></div></div>
                      

                     
                      {
                         pi?.products?.map((p,i)=>(
                      
                          <div className='ml-[26px]' key={i} onClick={()=>{
                                            
                                             
                                          }} >
                                         
                                          
                                       
                                           <div className='' >name:{p.name} </div>
                          <img className='w-[200px] h-[160px] rounded-[5%] border-b-[2px] mb-[15px] ml-[15px]' src={`${process.env.REACT_APP_API}/api/v1/getphoto/${p._id}`} alt='photoff'></img>
                          
                                                <div>{p.description}</div>
                                                <div className='mt-[8px]'>${p.price}</div>
                                                <div className='flex gap-[40px] mt-[30px] ml-[0px]'>
                                                {/* <button className='bg-sky-600 w-[100px] rounded-[5%] h-[26px]' onClick={()=>{
                                                 navi(`/singleproduct/${p.slug}`);
                                                }}>More details</button> */}
                          
                          
                                                {/* {
                                                 !cart?.some(item=>item._id===p._id)?(
                                                   <button className='bg-[grey] w-[100px] rounded-[5%] h-[26px]' onClick={()=>{
                                                     setCart([...cart,p]);
                                                     localStorage.setItem('cart',JSON.stringify([...cart,p]));
                                                    }}>Add to Cart</button>
                                                 ):(
                                                   <button className='bg-red-500 w-[100px] rounded-[5%] h-[26px]' onClick={()=>{
                                                     let arr=[...cart];
                                                     let idx=arr.findIndex((item)=>item._id===p._id);
                                                     arr.splice(idx,1);
                                                  setCart(arr);
                                                  localStorage.setItem('cart',JSON.stringify(arr));
                                                    }}>Remove</button>
                                                 )
                                                } */}
                                               
                                                </div>
                                          
                                               
                          </div>
                                              ))
                      }
                    </div>
                   
                    

                       
                      
                       
                   ))
                 }
</div>):(<div>not found</div>)
                      }

                  
                    </div>
                    </div>):(<div>nope</div>)
                }
           
            </div>
            
            
           
            </Adminmenu>
            
           
            </Layout>
        
        </div>
    );
};
export default AdminOrders;