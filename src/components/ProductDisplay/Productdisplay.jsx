import React, { useContext, useState } from 'react'
import '../ProductDisplay/Productdisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from '../Assets/star_dull_icon.png'
import { Relatedproduct } from '../Relatedproducts/Relatedproduct'
import { ShopContext } from '../../context/ShopContext'
import { useNavigate } from 'react-router-dom';

export const Productdisplay = (props) => {
  const { product } = props;
  const { addToCart, currentUser } = useContext(ShopContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      alert('Please login to buy products.');
      navigate('/login');
      return;
    }
    if (!currentUser.address || !currentUser.address.trim()) {
      alert('Please add your delivery address in your profile before buying.');
      navigate('/profile');
      return;
    }
    addToCart(product.id); // Add the product to the cart
    navigate('/payment', { state: { totalAmount: product.new_price, productId: product.id } });
  };

  return (
    <div className='Productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          

        </div>
        <img className='productdisplay-main-img' src={product.image} alt="" />
      </div>
      <div className="productdisplay-right">
        <h1>
          {product.name}
        </h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>


        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Elevate your girl's wardrobe with this trendy and ultra-soft t-shirt, designed for both 
          comfort and style. Made from premium cotton blend fabric, it's breathable, gentle on the skin
          , and perfect for all-day wear. Whether it's for school, playtime, or a casual outing, this tee pairs
           easily with jeans, skirts, or shorts. Available in multiple colors and fun prints she'll love.
        </div>
      <div className="productdisplay-right-size">
        <h1>Select Size</h1>
        <div className="productdisplay-right-size">
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXl</div>
        </div>
      </div>
      <div className="productdisplay-right-buttons">
        <button onClick={handleAddToCart}>{added ? 'Added!' : 'ADD TO CART'}</button>
        <button className="buy-now-btn" onClick={handleBuyNow}>BUY NOW</button>
      </div>
      <p className='productdisplay-right-category'><span>Category:</span>Woman,T-Shirt Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags:</span>Modern,latest</p>
      </div>
      
    </div>
  )
}
