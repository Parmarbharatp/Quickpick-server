import React from 'react'
import './Hero.css'
import hero from '../Assets/virat18.jpg'
import hand_icon from '../Assets/hand_icon.jpg'
import arrow_icon from '../Assets/arrow-icon1.jpg'
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className='hero'>
      <div className="hero-left">
        <h1 className="hero-title">Discover the Latest Trends</h1>
        <h2 className="hero-subtitle">NEW ARRIVALS ONLY</h2>
        <div className="hero-hand-icon">
          <span className="hero-hand-text">New</span>
          <img src={hand_icon} alt="Hand Icon" />
        </div>
        <p className="hero-desc">Collections for everyone</p>
        <button className="hero-latest-btn" onClick={() => navigate('/new-collection')}>
          <span>Shop Latest Collections</span>
          <img src={arrow_icon} alt="Arrow Icon" />
        </button>
      </div>
      <div className="hero-right">
        <img className="hero-image" src={hero} alt="Hero" />
      </div>
    </section>
  )
}
