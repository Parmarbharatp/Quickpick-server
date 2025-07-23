import React, { useState, useRef, useEffect, useContext } from 'react'
import './CSS/Loginsignup.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const { login: authLogin } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) {
      if (emailInputRef.current) emailInputRef.current.focus();
    } else {
      if (nameInputRef.current) nameInputRef.current.focus();
    }
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const url = isLogin
        ? 'https://quickpick-backend-6hkt.onrender.com/api/auth/login'
        : 'https://quickpick-backend-6hkt.onrender.com/api/auth/signup';
      const body = isLogin
        ? { email, password }
        : { name, email, password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Something went wrong.');
      } else {
        setMessage(data.message || (isLogin ? 'Login successful!' : 'Signup successful!'));
        if (isLogin && data.user) {
          authLogin(data.user);
          if (data.token) localStorage.setItem('token', data.token);
          navigate('/');
        } else if (!isLogin && data.user) {
          authLogin(data.user);
          if (data.token) localStorage.setItem('token', data.token);
          navigate('/');
        }
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="centerLogin">
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form className="loginsignup-fields" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder='Enter Your Name '
                value={name}
                onChange={e => setName(e.target.value)}
                required
                ref={nameInputRef}
                autoComplete="name"
              />
            )}
            <input
              type="email"
              className="email"
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              ref={emailInputRef}
              autoComplete="email"
            />
            <input
              type="password"
              className="password"
              placeholder='Your Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button type="submit" disabled={loading}>
              {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Continue')}
            </button>
          </form>
          {message && <div className="loginsignup-message">{message}</div>}
          {isLogin ? (
            <p className="loginsignup-login">Don't have an account? <span style={{color:'#3498db', fontWeight:600, cursor:'pointer'}} onClick={()=>{setIsLogin(false); setMessage('')}}>Sign up here</span></p>
          ) : (
            <p className="loginsignup-login">Already have an account? <span style={{color:'#3498db', fontWeight:600, cursor:'pointer'}} onClick={()=>{setIsLogin(true); setMessage('')}}>login here</span></p>
          )}
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, i agree to the term of use & privacy policy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
