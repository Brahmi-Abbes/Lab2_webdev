// src/components/Header.jsx
// Simple header with store name on the left and small cart count on the right.

import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../features/cart/cartSlice';

const Header = () => {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="header">
      <div className="container header-container">
        <h1 className="logo">PageTurner</h1>
        <div className="cart-count-header">
          Cart ({totalQuantity})
        </div>
      </div>
    </header>
  );
};

export default Header;
