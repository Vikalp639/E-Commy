import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { ProdProvider } from './context/prod';
import Search from './Page/Search';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ProdProvider>
            <SearchProvider>
                <CartProvider>
                <BrowserRouter>
        <App></App>
</BrowserRouter>
                </CartProvider>
           
            </SearchProvider>
        
</ProdProvider>
    </AuthProvider>

   
 
);



