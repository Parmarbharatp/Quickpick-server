import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'
export const Item = (props) => {
  return (
   <div className="item">
    <div className="image-wrapper">
      <Link to={`/product/${props.id}`}><img src={props.image} alt="" className="item-image"/></Link>
    
    </div>
   
    <p>{props.name}</p>
    <div className="item_price">
      <div className="new_price">
        ${props.new_price}
      </div>
      <div className="old_price">
        ${props.old_price}
      </div>
    </div>
   </div>
   
  )
}
