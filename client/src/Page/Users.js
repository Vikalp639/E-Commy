import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import Adminmenu from "./Adminmenu";
const  Users=()=> {
  
    return (
        <div>
            <Layout>
            <Adminmenu>
           
            <div>All users</div>
            
           
            </Adminmenu>
            
           
            </Layout>
        
        </div>
    );
};
export default Users;