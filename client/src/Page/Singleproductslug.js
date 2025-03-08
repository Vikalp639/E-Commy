import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
const Singleproductslug = () => {
  const[cart,setCart]=useCart()
  const navi=useNavigate();
  const [product, setProduct] = useState({});
  let [relatedp,setrelatedp]=useState([]);
  const params = useParams();
  const singlep = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/getsingleproduct/${params.slug}`
      );
      if (data?.product) {
       
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const relatedpr=async()=>{
    try {
      if(product._id){
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/getrelatedproducts/${product?._id}/${product?.category?._id}`);
        data.related=data.related.filter(c=>c.name!==product.name)
        
        setrelatedp(data.related);
      // relatedp=relatedp.filter(c=>c!==product?.category)
      
       
      }
     
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    // console.log(relatedp);
    relatedpr();
  },[product]);
  useEffect(() => {
    if (params?.slug) singlep();
  }, [params?.slug]);
  return (
    <div className="">
      <Layout>
        <div className="flex gap-[365px] flex-wrap w-[100vw] mt-[80px] ">
          <div className="border-[0px]  ml-[55px] mt-[10px] hah " onClick={() => {}}>
            {product?._id?(<img
              className="w-[363px] h-[360px] rounded-[5%] border-[0px] mt-[10px]  bg-[white] "
              src={`${process.env.REACT_APP_API}/api/v1/getphoto/${product?._id}`}
              alt="photoff"
            ></img>):(<div> </div>)}
            
           
          </div>
          <div className="mt-[50px] ml-[170px]">
           <p className="text-[40px] mb-[10px]">  Product Details:</p>
          <div className="text-[20px]">Name:<span className="ml-[3px]"> {product.name} </span> </div>
          <div className="text-[20px]">Category:<span className="ml-[3px]"> {product?.category?.name} </span> </div>
            <div className="text-[20px]">Description:<span className="ml-[3px]"> {product.description} </span></div>
            <div className="mt-[8px] text-[20px]">Price:<span className="ml-[3px]"> ${product.price} </span></div>
            <div className="flex gap-[40px] mt-[30px] ml-[0px]">
              {/* <button className="bg-[grey] w-[150px] rounded-[5%] h-[36px]">
                Add to Cart
              </button> */}
                {
                        !cart?.some(item=>item._id===product._id)?(
                          <button className='bg-[grey] w-[100px] rounded-[5%] h-[26px]' onClick={()=>{
                            setCart([...cart,product]);
                            localStorage.setItem('cart',JSON.stringify([...cart,product]));
                           }}>Add to Cart</button>
                        ):(
                          <button className='Butto' onClick={()=>{
                            let arr=[...cart];
                            let idx=arr.findIndex((item)=>item._id===product._id);
                            arr.splice(idx,1);
                         setCart(arr);
                         localStorage.setItem('cart',JSON.stringify(arr));
                           }}>Remove</button>
                        )
                       }
            </div>
          </div>
          <div className="ml-[20px] relative bottom-[200px] left-[55px]">
            <div className="text-[30px] mb-[20px]">Similar Products</div>
          {
            
              <div className='flex gap-[25px] flex-wrap w-[1000px] '>
              {
              relatedp.map((p)=>(
<div className='border-[2px] p-[18px]  bg-[white] hah' key={p._id} onClick={()=>{
             
              
            }} >
<img className='w-[200px] h-[160px] rounded-[5%] border-b-[2px] mb-[15px] ml-[15px] ' src={`${process.env.REACT_APP_API}/api/v1/getphoto/${p._id}`} alt='photoff'></img>
<div className='text-[20px]' >{p.name} </div>
                  <div>{p.description}</div>
                  <div className='mt-[8px]'>${p.price}</div>
                  <div className='flex gap-[40px] mt-[30px] ml-[0px]'>
                  <button className='Butto' onClick={()=>{
                   navi(`/singleproduct/${p.slug}`);
                  }}>More details</button>
                  {/* <button className='bg-[grey] w-[100px] rounded-[5%] h-[26px]' onClick={}>Add to Cart</button> */}
                  {
                        !cart?.some(item=>item._id===p._id)?(
                          <button className='Butto' onClick={()=>{
                            setCart([...cart,p]);
                            localStorage.setItem('cart',JSON.stringify([...cart,p]));
                           }}>Add to Cart</button>
                        ):(
                          <button className='Butto' onClick={()=>{
                            let arr=[...cart];
                            let idx=arr.findIndex((item)=>item._id===p._id);
                            arr.splice(idx,1);
                         setCart(arr);
                         localStorage.setItem('cart',JSON.stringify(arr));
                           }}>Remove</button>
                        )
                       }
                  </div>
            
                 
</div>
                  
                 
                  
              ))
            }
              </div>
            
          }
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Singleproductslug;
