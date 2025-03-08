import React from 'react';
import Layout from '../components/Layout';
import contactImage from '../images/contactus.jpeg';
import { CiMail,CiPhone} from "react-icons/ci";
import { PiHeadset } from "react-icons/pi";


const Contact = () => {
    return (
        <div>
            <Layout >
                <div className='flex  justify-center items-center relative top-[56px] gap-[20px]'>
                <img src={contactImage} alt="Contact Us" />
                <div className='relative bottom-[60px]'>
                    <h1 className='text-[39px] bg-[#3d4852] text-center text-white mb-[10px]'> Contact Us</h1>
                    <p className='mb-[19px]'>Any query and info about product feel free to ask anytime</p>
                    <p className='flex gap-[7px] relative left-[2px]'><CiMail className='relative top-[5px]'></CiMail><span>www.help@ecommerceapp.com</span></p>
                    <p className='flex gap-[7px] relative left-[2px]'><CiPhone  className='relative top-[5px]'></CiPhone><span>012-346578</span></p>
                    <p className='flex gap-[7px] relative left-[2px]'><PiHeadset  className='relative top-[5px]'></PiHeadset><span>1800-0000-0000</span></p>
                </div>
                </div>
               
            </Layout>
        </div>
    );
};

export default Contact;