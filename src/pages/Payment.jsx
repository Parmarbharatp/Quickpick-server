import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useContext } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from 'react-router-dom';
import './CSS/Payment.css';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalCartAmount } = useContext(ShopContext);
  const location = useLocation();
  const passedTotal = location.state?.totalAmount;
  // Use the passed totalAmount if available, otherwise fallback
  const totalAmount = passedTotal !== undefined ? passedTotal : getTotalCartAmount();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Stripe expects amount in cents
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        amount: Math.round(totalAmount * 100),
      });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.paymentIntent?.status === "succeeded") {
        setSuccess(true);
        localStorage.removeItem('lastOrderTotal'); // Clear after success
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-root">
      <div className="payment-container">
        <AnimatePresence>
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="payment-success"
            >
              <Confetti width={400} height={400} numberOfPieces={150} recycle={false} />
              <motion.svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <circle cx="40" cy="40" r="40" fill="#4BB543" />
                <motion.path
                  d="M25 42L36 53L56 33"
                  stroke="#fff"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </motion.svg>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="payment-success-title"
              >
                Payment Successful!
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className={success ? "payment-form hidden" : "payment-form"}>
          <h2 className="payment-title">Stripe Payment</h2>
          <div className="payment-amount">
            Total Amount: <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="payment-card-element">
            <CardElement options={{ style: { base: { fontSize: '16px', color: '#222' } } }} />
          </div>
          <motion.button
            type="submit"
            disabled={!stripe || loading || totalAmount === 0}
            whileHover={{ scale: !loading ? 1.04 : 1 }}
            whileTap={{ scale: !loading ? 0.98 : 1 }}
            className={loading ? "payment-btn loading" : "payment-btn"}
          >
            {loading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="payment-btn-loading"
              >
                <motion.div
                  className="payment-btn-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                />
                Processing...
              </motion.span>
            ) : (
              `Pay $${totalAmount.toFixed(2)}`
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
