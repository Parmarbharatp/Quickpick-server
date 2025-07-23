import React from 'react'
import './Popular.css'
import { Item } from '../Items/Item'
import  products from '../Assets/Data'
export const Popular = () => {
  return (
  <div className="popular">
    <h1>POPULAR IN WOMAN</h1>
    <hr/>
    <div className="popular_item">
        {products.map((item,i)=>{
            return <Item key={i} id={item.id}
             name={item.name} 
             image={item.image}
              new_price={item.new_price}
               old_price={item.old_price}  />
        })}
    </div>
  </div>

  )
}
