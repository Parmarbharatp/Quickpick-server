import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import './CSS/Cart.css'
import { useNavigate } from 'react-router-dom';

function getRandomCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let str = '';
  for (let i = 0; i < 5; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return {
    question: str,
    answer: str
  };
}

export const Cart = () => {
  const {
    cartItems,
    All_products,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    addOrder,
    orders,
    currentUser
  } = useContext(ShopContext);
  const [orderMsg, setOrderMsg] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [lastOrder, setLastOrder] = useState(null);
  const [captcha, setCaptcha] = useState(getRandomCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const navigate = useNavigate();

  // Debug: log orders before rendering
  console.log('Orders in context:', orders);

  const cartProductList = All_products.filter(product => cartItems[product.id] > 0);

  const handleOrder = async () => {
    if (!currentUser) {
      alert('Please login to place an order.');
      return;
    }
    if (!currentUser.address || !currentUser.address.trim()) {
      alert('Please add your delivery address in your profile before placing an order.');
      return;
    }
    if (getTotalCartItems() === 0) {
      alert('Your cart is empty!');
      return;
    }
    const now = new Date();
    const order = {
      items: cartProductList.map(product => ({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.new_price,
        quantity: cartItems[product.id],
        subtotal: product.new_price * cartItems[product.id]
      })),
      address: currentUser.address,
      total: getTotalCartAmount(),
      date: now.toISOString(),
    };
    setOrderLoading(true);
    await addOrder(order);
    setOrderLoading(false);
    setOrderMsg('Order placed successfully!');
    setLastOrder(order);
    clearCart();
    setTimeout(() => setOrderMsg(''), 4000);
    navigate('/payment', { state: { totalAmount: order.total } });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setAddressError('Please enter your address.');
      return;
    }
    setAddressError('');
    if (captchaInput.trim() !== captcha.answer) {
      setCaptchaError('Captcha answer is incorrect. Please try again.');
      setCaptcha(getRandomCaptcha());
      setCaptchaInput('');
      return;
    }
    setCaptchaError('');
    const now = new Date();
    const order = {
      items: cartProductList.map(product => ({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.new_price,
        quantity: cartItems[product.id],
        subtotal: product.new_price * cartItems[product.id]
      })),
      // address, // address is not saved in backend order model
      total: getTotalCartAmount(),
      date: now.toISOString(),
    };
    setOrderLoading(true);
    await addOrder(order); // This will trigger backend save and context refresh
    setOrderLoading(false);
    setOrderMsg('Order placed successfully!');
    setLastOrder(order);
    clearCart();
    setShowAddressForm(false);
    setAddress('');
    setTimeout(() => setOrderMsg(''), 4000);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {orderMsg && <div className="cart-order-msg">{orderMsg}</div>}
      {orderLoading && <div className="cart-order-msg">Saving your order...</div>}
      {cartProductList.length === 0 ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartProductList.map(product => (
                  <tr key={product.id}>
                    <td><img src={product.image} alt={product.name} className="cart-item-img" /></td>
                    <td>{product.name}</td>
                    <td>${product.new_price}</td>
                    <td>
                      <button className="cart-qty-btn" onClick={() => removeFromCart(product.id)}>-</button>
                      <span className="cart-qty">{cartItems[product.id]}</span>
                      <button className="cart-qty-btn" onClick={() => addToCart(product.id)}>+</button>
                    </td>
                    <td>${(product.new_price * cartItems[product.id]).toFixed(2)}</td>
                    <td>
                      <button className="cart-remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-total-row">
            <div className="cart-total-label">Total:</div>
            <div className="cart-total-value">${getTotalCartAmount().toFixed(2)}</div>
          </div>
          <div className="cart-order-btn-row">
            <button className="cart-btn cart-btn-primary" onClick={handleOrder}>Order Now</button>
          </div>
        </>
      )}
      {/* Order List Section */}
      <div className="cart-orders-section">
        <h2 className="cart-orders-title">My Orders</h2>
        {orders && orders.length > 0 ? (
          <div className="cart-orders-list">
            {orders.map((order, idx) => (
              <div key={idx} className="cart-order-card">
                <div className="cart-order-meta">
                  <span className="cart-order-date">Order Date: {order.date ? new Date(order.date).toLocaleString() : 'N/A'}</span>
                  <span className="cart-order-total">Total: ${order.total?.toFixed(2) ?? '0.00'}</span>
                </div>
                <div className="cart-order-items">
                  <span>Items:</span>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i} className="cart-order-item">
                        <img src={item.image} alt={item.name} className="cart-order-item-img" />
                        {item.name} x {item.quantity} (${item.price} each)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cart-empty">No orders yet.</div>
        )}
      </div>
    </div>
  )
}
