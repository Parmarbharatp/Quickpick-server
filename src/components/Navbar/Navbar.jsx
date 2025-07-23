import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import { AuthContext } from '../../context/AuthContext';
import { FaUserCircle, FaTshirt, FaMale, FaFemale, FaChild, FaStore } from 'react-icons/fa';

const Navbar = () => {
  const[menu,setMenu] = useState("Shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className="nav-mobile-left">
        <div className={`nav-hamburger${mobileMenuOpen ? ' hamburger-active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="nav-logo">
        <img src={logo} alt=""/>
        <p>QuickPick</p>
      </div>
      <div className="nav-login-cart">
        {user ? (
          <div className="nav-user-info" style={{display:'flex', alignItems:'center'}}>
            <Link to="/profile" style={{textDecoration:'none', display:'flex', alignItems:'center', marginRight:'1rem'}}>
              <div className="nav-avatar">
                {user && user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </div>
              {/* Remove user name, only show avatar */}
            </Link>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to='/login' style={{textDecoration:'none'}}><button className="login">Login</button></Link>
        )}
        <Link to='/cart' style={{textDecoration:'none'}}><img src={cart} alt="Cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      {isMobile ? (
        <ul className={`nav-menu nav-menu-mobile-open${mobileMenuOpen ? ' open' : ''}`}>
          <li className="drawer-header-blue">
            <div className="drawer-header-content">
              <FaUserCircle size={32} color="#fff" style={{marginRight: 12}} />
              <span className="drawer-login-text">Login & Signup</span>
              <span className="drawer-header-logo">QuickPick</span>
            </div>
          </li>
          <li className="drawer-divider"></li>
          <li onClick={()=>{setMenu("Shop"); setMobileMenuOpen(false);}} >
            <FaStore style={{marginRight: 14}} />
            <Link to='/' style={{textDecoration:'none'}}>Shop</Link>
          </li>
          <li onClick={()=>{setMenu("mens"); setMobileMenuOpen(false);}}>
            <FaMale style={{marginRight: 14}} />
            <Link to='/mens' style={{textDecoration:'none'}}>Men</Link>
          </li>
          <li onClick={()=>{setMenu("womens"); setMobileMenuOpen(false);}}>
            <FaFemale style={{marginRight: 14}} />
            <Link to='/womens' style={{textDecoration:'none'}}>Womens</Link>
          </li>
          <li onClick={()=>{setMenu("kid"); setMobileMenuOpen(false);}}>
            <FaChild style={{marginRight: 14}} />
            <Link to='/kid' style={{textDecoration:'none'}}>Kid</Link>
          </li>
          <li className="drawer-divider"></li>
          <li className="drawer-header-close" style={{marginTop: 'auto'}}>
            <button className="drawer-close" onClick={() => setMobileMenuOpen(false)}>&times;</button>
          </li>
        </ul>
      ) : (
        <ul className="nav-menu">
          <li>
            <Link to="/" style={{textDecoration:'none', color:'inherit'}} onClick={()=>setMenu("Shop")}>Shop</Link>
          </li>
          <li>
            <Link to="/mens" style={{textDecoration:'none', color:'inherit'}} onClick={()=>setMenu("mens")}>Men</Link>
          </li>
          <li>
            <Link to="/womens" style={{textDecoration:'none', color:'inherit'}} onClick={()=>setMenu("womens")}>Womens</Link>
          </li>
          <li>
            <Link to="/kid" style={{textDecoration:'none', color:'inherit'}} onClick={()=>setMenu("kid")}>Kid</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Navbar