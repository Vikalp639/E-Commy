import React from 'react';
import Layout from '../components/Layout';
import aboutImage from '../images/about.jpeg';
const About = () => {
    return (
        <div>
        <Layout >
            <div className='flex  justify-center items-center relative top-[26px] gap-[16px]'>
            <img className=' relative bottom-[20px]' src={aboutImage} alt="Contact Us" />
            <div className='relative bottom-[60px]'>
                lorem ipsum dolor sit amet, consectetur adipiscing elit<br></br> sed do eiusmod tempor incididunt ut labore etdolore ma<br></br>gna aliqua. Ut enim ad minim veniam, quis nostrud<br></br> exercitation ullamco laboris nisi ut aliquip ex ea commodo<br></br> consequat. Duis aute irure dolor in reprehenderit in voluptate velit<br></br> esse cillum dolore eu fugiat nulla pariatur.
            </div>
            </div>
           
        </Layout>
    </div>
    );
};

export default About;