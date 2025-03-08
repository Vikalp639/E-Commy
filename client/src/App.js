import React from 'react';
import './App.css';


import {Routes,Route} from 'react-router-dom';
import Home from './Page/Home';
import About from './Page/About';
import Contact from './Page/Contact';
import Policies from './Page/Policies';
import Pagenot from './Page/Pagenot';
import Register from './Page/Register';
import Login from './Page/Login';
import PrivateRoute from './Page/PrivateRoute';
import UserDashboard from './Page/UserDashboard';
import Forgot from './Page/Forgot';
import PrivateAdmin from './Page/PrivateAdmin';
import AdminDashboard from './Page/AdminDashboard';
import Profile from './Page/Profile';
import Orders from './Page/Orders';
import Createproduct from './Page/Createproduct';
import Createcategory from './Page/Createcategory';
import Users from './Page/Users';
import Products from './Page/Products';
import SingleProduct from './Page/SingleProduct';
import Search from './Page/Search';
import Singleproductslug from './Page/Singleproductslug';
import { Cart } from './Page/Cart';
import AdminOrders from './Page/AdminOrders';
import "@fontsource/roboto"; 
import "@fontsource/roboto/700.css"; 
import "@fontsource/roboto/700-italic.css"; 
function App() {
  return (
    <div >
           <Routes>
           <Route path="/cart" element={<Cart/>} />
            <Route path="/forgot" element={<Forgot/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/singleproduct/:slug" element={<Singleproductslug/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/admindashboard" element={<PrivateAdmin/>}>
              <Route path="" element={<AdminDashboard/>} />
              <Route path="/admindashboard/createproducts" element={<Createproduct/>} />
              <Route path="/admindashboard/createcategory" element={<Createcategory/>} />
              <Route path="/admindashboard/products" element={<Products/>} />
              <Route path="/admindashboard/singleproduct" element={<SingleProduct/>}/>
              <Route path="/admindashboard/users" element={<Users/>} />
              <Route path="/admindashboard/orders" element={<AdminOrders/>} />
            </Route>
            <Route path="/userdashboard" element={<PrivateRoute/>}>
              <Route path="" element={<UserDashboard/>} />
              <Route path="/userdashboard/profile" element={<Profile/>} />
              <Route path="/userdashboard/order" element={<Orders/>} />
            </Route>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/policy" element={<Policies/>} />
           < Route path="*" element={<Pagenot/>} />
            </Routes>    
          
            </div>
  );
}

export default App;
