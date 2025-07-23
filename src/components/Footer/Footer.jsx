import React from 'react'
import './footer.css'
import instagram from '../Assets/instalogo.webp'
import whatsapp from '../Assets/whatsapp.png'
import Shooperlogo from '../Assets/logo.png'
import pinterest from '../Assets/pinterest.png'
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col brand">
        <div className="footer-brand-row">
          <img src={Shooperlogo} alt="QuickPick Logo" />
          <p className="footer-brand">QuickPick</p>
        </div>
        <p className="footer-tagline">Your one-stop shop for the latest trends.</p>
      </div>
      <div className="footer-col social">
        <h4>Connect</h4>
        <div className="footer-social-icons">
          <a href="#"><img src={instagram} alt="Instagram" /></a>
          <a href="#"><img src={whatsapp} alt="WhatsApp" /></a>
          <a href="#"><img src={pinterest} alt="Pinterest" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <hr />
        <p>© {new Date().getFullYear()} QuickPick • Developed by Bharat Parmar</p>
      </div>
    </footer>
  )
}
