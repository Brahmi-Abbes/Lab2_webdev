// src/components/CartItem.jsx
// Displays an individual cart line with quantity controls (+ / -) and removal.

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from '../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <li className="cart-item">
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <span className="cart-item-author">{item.author}</span>
        <div className="cart-item-controls">
          {/* Quantity stepper */}
          <div className="quantity-controls">
            <button
              type="button"
              className="btn-qty"
              onClick={() => dispatch(decreaseQuantity(item.id))}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.title}`}
              title={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
            >
              −
            </button>
            <span className="cart-item-qty" aria-label={`Quantity: ${item.quantity}`}>
              {item.quantity}
            </span>
            <button
              type="button"
              className="btn-qty"
              onClick={() => dispatch(increaseQuantity(item.id))}
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>

          {/* Line subtotal */}
          <span className="cart-item-subtotal">
            {(item.price * item.quantity).toLocaleString()} DA
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn-remove"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label={`Remove ${item.title} from cart`}
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
