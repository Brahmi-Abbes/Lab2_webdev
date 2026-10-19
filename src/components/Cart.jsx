// src/components/Cart.jsx
// Compact shopping bag panel on the right. When empty, shows only "Your bag is empty."

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice,
  removeFromCart
} from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <aside className="cart-panel">
      <h3 className="cart-title">Cart ({totalQuantity})</h3>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your bag is empty.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-title">{item.title}</span>
                  <span className="cart-item-price">
                    {item.price.toLocaleString()} DA × {item.quantity}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total-row">
            <span>Total:</span>
            <strong>{totalPrice.toLocaleString()} DA</strong>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Cart;
