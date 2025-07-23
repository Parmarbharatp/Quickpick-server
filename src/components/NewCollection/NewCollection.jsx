import React from 'react'
import  './NewCollection.css'
import products from '../Assets/Collection'
import {Item} from '../Items/Item'
export const NewCollection = () => {
  return (
    <div className="New-Collection">
     <h1>New Collection</h1>
     <hr/>
     <div className="Collection">
        {products.map((item,i)=>{
            return <Item key = {i} id = {item.id}  name={item.name} image={item.image} new_price = {item.new_price} old_price={item.old_price}/>
        })}
     </div>

    </div>
  )
}
