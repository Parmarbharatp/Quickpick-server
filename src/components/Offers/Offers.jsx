import React, { useState } from 'react'
import './offers.css'
import fashion from '../Assets/fashion.png'
import { useNavigate } from 'react-router-dom';
export const Offers = () => {
  const [checked, setChecked] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const navigate = useNavigate();

  const handleCheck = () => {
    setChecked(true);
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
      setChecked(false);
      navigate('/new-collection');
    }, 1200);
  };

  return (
    <section className='offers'>
      <div className="offers-left">
        <h1 className="offers-title">Exclusive Offers for You</h1>
        <p className="offers-subtitle">Only on Best Sellers Products</p>
        <button className="offers-btn" onClick={handleCheck} disabled={checked}>
          {checked ? 'Checked!' : 'Check Now'}
          {showCheck && (
            <span className="offers-check-effect" role="img" aria-label="check" style={{marginLeft:10, fontSize:24}}>
              ✔️
            </span>
          )}
        </button>
      </div>
    </section>
  )
}

