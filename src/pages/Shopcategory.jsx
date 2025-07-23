import React, { useContext, useState } from 'react'
import './CSS/Shopcategory.css'
import { ShopContext } from '../context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import{Item} from '../components/Items/Item'

export const Shopcategory = (props) => {
  const {All_products}= useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('default');

  // Filter by category
  let filteredProducts = All_products.filter(item => props.category === item.category);

  // Sort by price
  if (sortOrder === 'lowToHigh') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.new_price - b.new_price);
  } else if (sortOrder === 'highToLow') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.new_price - a.new_price);
  }

  return (
  <div className='shop-category'>
    <img src={props.banner} alt=""  className='shopcategory-banner'/>
    <div className="shopcategory-indexsort">
      
      <div className='shopcategory-sort'>
        <label htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="shopcategory-sort-select"
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <img src={dropdown_icon} alt="" />
      </div>
    </div>
    <div className="shopcategory-products">
      {
        filteredProducts.length > 0 ? (
          filteredProducts.map((item,i)=>(
            <Item key = {i} id = {item.id}  name={item.name} image={item.image} new_price = {item.new_price} old_price={item.old_price}/>
          ))
        ) : (
          <div style={{gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.2rem', marginTop: '2rem'}}>No products found.</div>
        )
      }
    </div>
   <div className="shopcategory-loadmore">
    Explore More
   </div>
  </div>

  )
}
