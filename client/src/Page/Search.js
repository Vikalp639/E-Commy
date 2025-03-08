import React from 'react';
import Layout from '../components/Layout';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
const Search=()=>{
    const [ress,setress]=useSearch();
    const navi=useNavigate();
    const [cart,setCart]=useCart();
    return (
        <div> 
            <Layout>
                <div className='ml-[50px]'>
                Search Results:{ress.length}

<div className='mt-[30px]'>
    {
        ress.length>0?(<div>
             <div className='flex gap-[25px] flex-wrap w-[1000px] '>
   {
   ress.map((p)=>(
<div className='border-[2px] p-[18px]  ' key={p._id} onClick={()=>{
  
   
 }} >
<img className='w-[200px] h-[160px] rounded-[5%] border-b-[2px] mb-[15px] ml-[15px]' src={`${process.env.REACT_APP_API}/api/v1/getphoto/${p._id}`} alt='photoff'></img>
<div className='text-[20px]' >{p.name} </div>
       <div>{p.description}</div>
       <div className='mt-[8px]'>${p.price}</div>
       <div className='flex gap-[40px] mt-[30px] ml-[0px]'>
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
 
      
</div>
       
      
       
   ))
 }
   </div>
        </div>):(<div> No products found</div>)
    }
</div>
                </div>
               
            </Layout>
        </div>
    )
}
export default Search;