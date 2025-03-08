import React,{useEffect,useState} from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cart';
 import banner from '../images/a.webp'
const Home = () => {
    // const [auth,setAuth]=useAuth();
    // const [productid,setproductid]=useProd();
    const [cart,setCart]=useCart();
    const navi=useNavigate();
    const Price=[
      {
        _id:0,
        name:'$0 to 19',
        array:[0,19],
      },{
        _id:1,
        name:'$20 to 39',
        array:[20,39],
      },{
        _id:2,
        name:'$40 to 59',
        array:[40,59],
      },{
        _id:3,
        name:'$60 to 79',
        array:[60,79],
      },{
        _id:4,
        name:'$80 to 99',
        array:[80,99],
      },{
        _id:5,
        name:'$100 or more',
        array:[100,99999],
      }
    ]
    const[products,setProducts]=useState([]);
    const[categories,setCategories]=useState([]);
    const[checked,setChecked]=useState([]);
    const[radio,setRadio]=useState([]);
    // const handlecheck=(value,id)=>{
    //   let all=[...checked];
    //   if(value){
    //     all.push(id);
        
    //   }
    //   else{
    //     all=all.filter(c=>c!==id);
       
    //   }
    //   setChecked(all);
 
    // }
    const handlecheck=(value,id)=>{
      setChecked(prev=>value?[...prev,id]:prev.filter(c=>c!==id));
    }
const getproducts=async()=>{
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/getproducts`);
     setProducts(data.products);
   
  }
  // useEffect(()=>{
  //   getproducts();

  // },[products]);
  useEffect(() => {
    if (checked.length===0 && radio.length===0) getproducts();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length)
      {
        
       (async () => {
        try {
          
          const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/filterproducts`, {
            checked,
            radio,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      })();
      } 
  }, [checked, radio]);
  // const getcategory=async()=>{
  //   try{
  //     const aa=await axios.get(`${process.env.REACT_APP_API}/api/v1/getcategory`);
  //     setCategories(aa.data.category);
  //   }
  //  catch(e){
  //   console.log(e);
  //  }
   
  // }
  useEffect(()=>{
   (async()=>{
    try{
      const aa=await axios.get(`${process.env.REACT_APP_API}/api/v1/getcategory`);
      setCategories(aa.data.category);
    }
   catch(e){
    console.log(e);
   }
   
  })(); 
  },[]);
  // const filterProduct = async () => {
  //   try {
      
  //     const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/filterproducts`, {
  //       checked,
  //       radio,
  //     });
  //     setProducts(data?.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
    return (
        <div className=''> 
            <Layout>
            <img
        src={banner}
        className="banner-img mb-[50px]"
        alt="bannerimage"
        width={"100%"}
      />
      <div className='text-[30px] relative left-[740px]  ml-[20px] mt-[20px] text-[gray] text-[40px]'>All Products</div>
                <div className='flex '>
                <div className='   border-r-[2px]   mr-[40px] pl-[10px]'> 
                    <div className='text-[27px] mt-[10px] mb-[10px]'>Filter by Categories</div>
                    {
                        categories?.map((c,inde)=>(
                            <div key={inde}  className=''>
                               <input type='checkbox' name={c._id} id={c._id} className='' onChange={(e)=>{
                                    handlecheck(e.target.checked,c._id);
                                  }}></input>
                              <label htmlFor={c._id} className='ml-[20px]'>{c.name}
                             
                                  </label>
                                  
                                 
                            </div>
                           
                          
                        ))
                    }

<div className='text-[27px] mt-[10px] mb-[10px]'>Filter by Price</div>
                

{
                        Price?.map((c,inz)=>(
                            <div key={inz} className=''>
                             
                              <input type='radio' value={c.array} name="price" id={c._id} className='' onChange={(e)=>
                                    setRadio(e.target.value.split(",").map(Number))
                                 
                                   
                                  }></input>
                                   <label  className='ml-[20px]' htmlFor={c._id}>{c.name}
                                  </label>
                                
                                  
                                 
                            </div>
                           
                          
                        ))
                    }
                    {/* <button className='bg-red-600 mt-[50px]  w-[120px] rounded-[5%] h-[30px] text-[white]' onClick={()=>{
                      window.location.reload();
                    }}>Reset Filters</button> */}
                     <button className='Butto nn'  onClick={()=>{
                      window.location.reload();
                    }}>Reset Filters</button>
                </div>
               <div>

               
                   
                   <div className='flex gap-[25px] flex-wrap w-[1200px]   overflow-y-hidden mt-[20px] p-[20px]'>
                   {
                   products.map((p)=>(
<div className='border-[2px]  p-[18px]  bg-[white] hah  hover:scale-[1.1] ml-[20px] mt[20px] ' key={p._id} onClick={()=>{
                  
                   
                 }} >
<img className='w-[200px] h-[160px] rounded-[5%] border-b-[2px] mb-[15px] ml-[15px]' src={`${process.env.REACT_APP_API}/api/v1/getphoto/${p._id}`} alt='photoff'onClick={()=>{
                        navi(`/singleproduct/${p.slug}`);
                       }}></img>
<div className='flex justify-between' onClick={()=>{
                        navi(`/singleproduct/${p.slug}`);
                       }}>
<div className='text-[20px]' >{p.name} </div>
<div className='mt-[8px] text-[green]'>${p.price}</div>
</div>

                       <div>{p.description}</div>
                     
                       <div className='flex gap-[40px] mt-[30px] ml-[0px]'>
                       < button className=' Butto m-[1px] p-[8px] text-[16px] ' onClick={()=>{
                        navi(`/singleproduct/${p.slug}`);
                       }}>More details</button> 


                       {
                        !cart?.some(item=>item._id===p._id)?(
                          <button className=' Butto m-[1px] p-[8px] text-[16px] ' onClick={()=>{
                            setCart([...cart,p]);
                            localStorage.setItem('cart',JSON.stringify([...cart,p]));
                           }}>Add to Cart</button>
                        ):(
                          <button className=' Butto m-[1px] p-[8px] text-[16px] ' onClick={()=>{
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
               </div>
                    
                   
                    
                </div>
              
               {/* <div>{products.length}</div> */}
               
                </Layout></div>
    )
}


export default Home;