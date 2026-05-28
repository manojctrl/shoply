import React from 'react'
import Button from '@mui/material/Button';
import { MdOutlineShoppingCart } from "react-icons/md";
import {products} from '../../Data/LocalStorage'
import './ProductItemList.css'


const ProductItemList = ({prods}) => {
  const visibleProducts = prods && prods.length > 0 ? prods : products;
  return (
    <div className="product-list-container">
      {visibleProducts.map((p) => (
        <div className="prouct-container" key={p.id}>
          <div className="product-images">
            <img src={p.image} alt={p.name} />
            {p.discountPercentage && (
              <div className="discount-badge">
                {p.discount}% OFF
              </div>
            )}
          </div>
           
          <div className="product-details">
            <p>{p.brand}</p>
            <h3>{p.name}</h3>
            <p className="product-description">{p.description}</p>
            
            <div className="rating">
              <span className="rating-stars">{"★".repeat(p.rating)}</span>
              <span className="rating-text">({p.rating}/5)</span>
            </div>
            
            <div className="price-container">
              <div className="original-prices">Rs {p.originalPrice}</div>
              <div className="discount-prices">Rs {p.price}</div>
              {p.originalPrice > p.price && (
                <span className="savings">
                  Save Rs {p.originalPrice - p.price}
                </span>
              )}
            </div>
            
            <div className="add-tocart">
              <Button variant='outlined' className='add-to-carts'>
                <MdOutlineShoppingCart/> ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductItemList;