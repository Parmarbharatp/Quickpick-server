import React, { useState } from 'react'
import './Newsletter.css'
export const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [showLike, setShowLike] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setShowLike(true);
    setTimeout(() => setShowLike(false), 1200);
  };

  return (
   <div className="Newsletter">
    <h1>Get Exclusive offers on your Email</h1>
    <p>Subscribe to our newsletters and stay  upadated</p>
    <form onSubmit={handleSubscribe} style={{width:'100%'}}>
      <div>
        <input
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={subscribed}
          required
        />
        <button type="submit" disabled={subscribed}>
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
        {showLike && (
          <span className="newsletter-like-effect" role="img" aria-label="like" style={{marginLeft:12, fontSize:32, transition:'all 0.3s'}}>
            ❤️
          </span>
        )}
      </div>
      {subscribed && <div className="newsletter-thankyou">Thank you for subscribing!</div>}
    </form>
   </div>
  )
}
