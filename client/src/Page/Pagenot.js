import React from 'react';
import Layout from '../components/Layout';
import {useNavigate} from 'react-router-dom';

const Pagenot = () => {
    const navigate=useNavigate();
    return (
        <div>
            <Layout>
            <div className='flex flex-col justify-center items-center relative top-[130px]'>
                <h1 className='text-[90px]'>404</h1>
                <h1 className='text-[20px]'>Oops! Page Not Found</h1>
                <button className='bg-[green] h-[30px] w-[90px] rounded-[10%] mt-[17px]' onClick={()=>{
                    navigate('/');
                }}>Go Back</button>
            </div>
            </Layout>
            
           
        </div>
    );
};

export default Pagenot;