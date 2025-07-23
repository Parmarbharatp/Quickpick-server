import React from 'react'
import {ShopContext} from '../context/ShopContext'
import {useParams, useNavigate} from 'react-router-dom';
import { Breadcrums } from '../components/Breadcrums/Breadcrums';
import { useContext, useEffect } from 'react';
import { Productdisplay } from '../components/ProductDisplay/Productdisplay';
import { Relatedproduct } from '../components/Relatedproducts/Relatedproduct';

export const Product = () => {
   const {All_products} = useContext(ShopContext);
   const {productId} = useParams();
   const navigate = useNavigate();
   
   const product = All_products.find((e) => e.id === Number(productId));
   
   // If product is not found, redirect to home page or show error
   useEffect(() => {
     if (!product && productId) {
       console.log('Product not found:', productId);
       console.log('Available products:', All_products.map(p => ({id: p.id, name: p.name})));
       // You can either redirect to home or show an error message
       // navigate('/');
     }
   }, [product, productId, All_products, navigate]);

   // Show loading or error state if product is not found
   if (!product) {
     return (
       <div style={{ 
         display: 'flex', 
         justifyContent: 'center', 
         alignItems: 'center', 
         height: '50vh',
         flexDirection: 'column',
         gap: '20px'
       }}>
         <h2>Product not found</h2>
         <p>Product with ID {productId} could not be found.</p>
         <button 
           onClick={() => navigate('/')}
           style={{
             padding: '10px 20px',
             background: '#2575fc',
             color: 'white',
             border: 'none',
             borderRadius: '8px',
             cursor: 'pointer'
           }}
         >
           Go to Home
         </button>
       </div>
     );
   }

  return (
    <div>
      <Breadcrums product={product}/>
      <Productdisplay product={product}/>
      <Relatedproduct currentProduct={product}/>
    </div>
  )
}
