import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import { Shopcategory } from './pages/Shopcategory';
import { Cart } from './pages/Cart';
import {LoginSignup} from './pages/LoginSignup'
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Footer } from './components/Footer/Footer';
import banner_women from './components/Assets/banner_women.png'
import banner_mens from './components/Assets/banner_mens.png'
import banner_kids from './components/Assets/banner_kids.png'
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Profile from './pages/Profile';
import { NewCollection } from './components/NewCollection/NewCollection';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './pages/Payment';

const stripePromise = loadStripe("pk_test_51Rl4q1PfGjPQ2IkJmRCxePXcRocPmvPKzDTleEmALK6wsVplWWmCK6FhpgzLwQWulcLXwu2ZdybydCawK2wW6ikB004eNIJ4f9");

function App() {
  return (
    <div >
     < BrowserRouter>
      <Navbar/>
      <ScrollToTop />
      <Routes>
        <Route  path='/' element={<Shop/>}/>
        <Route  path='/mens' element={<Shopcategory banner = {banner_mens} category="men"/>}/>
        <Route  path='/womens' element={<Shopcategory banner = {banner_women} category="women"/>}/>
        <Route  path='/kid' element={<Shopcategory banner = {banner_kids} category="kid"/>}/>
        <Route path="product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
     
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/new-collection' element={<NewCollection/>}/>
      <Route path='/payment' element={
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
