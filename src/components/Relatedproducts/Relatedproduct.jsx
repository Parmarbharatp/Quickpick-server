import React, { useContext } from 'react'
import '../Relatedproducts/Relatedproducts.css'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom'

export const Relatedproduct = ({ currentProduct }) => {
  const { All_products } = useContext(ShopContext);
  
  // Get related products based on the same category, excluding the current product
  const getRelatedProducts = () => {
    if (!currentProduct) {
      return All_products.slice(0, 4);
    }
    
    const relatedProducts = All_products.filter(product => 
      product.category === currentProduct.category && 
      product.id !== currentProduct.id
    );
    
    return relatedProducts.slice(0, 4);
  };

  const relatedProducts = getRelatedProducts();

  // If no related products found, show some products from the same category or fallback
  if (relatedProducts.length === 0) {
    const fallbackProducts = All_products
      .filter(product => product.id !== currentProduct?.id)
      .slice(0, 4);
    
    return (
      <div className='relatedproduct'>
        <h1>You Might Also Like</h1>
        <hr/>
        <div className="relatedproduct-item">
          {fallbackProducts.map((item, i) => (
            <Link to={`/product/${item.id}`} key={i} className="related-product-card">
              <div className="related-product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="related-product-info">
                <h3>{item.name}</h3>
                <div className="related-product-price">
                  <span className="new-price">${item.new_price}</span>
                  <span className="old-price">${item.old_price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='relatedproduct'>
      <h1>Related Products</h1>
      <hr/>
      <div className="relatedproduct-item">
        {relatedProducts.map((item, i) => (
          <Link to={`/product/${item.id}`} key={i} className="related-product-card">
            <div className="related-product-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="related-product-info">
              <h3>{item.name}</h3>
              <div className="related-product-price">
                <span className="new-price">${item.new_price}</span>
                <span className="old-price">${item.old_price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
