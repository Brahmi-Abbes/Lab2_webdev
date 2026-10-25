// src/components/Cart.jsx
// Compact shopping bag panel on the right. When empty, displays "Your bag is empty."

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice,
  clearCart
} from '../features/cart/cartSlice';
import CartItem from './CartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <aside className="cart-panel" aria-label="Shopping Cart">
      <div className="cart-panel-header">
        <h3 className="cart-title">Cart ({totalQuantity})</h3>
        {cartItems.length > 0 && (
          <button
            type="button"
            className="btn-clear-cart"
            onClick={() => dispatch(clearCart())}
            title="Clear all books from cart"
          >
            Clear
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your bag is empty.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
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
