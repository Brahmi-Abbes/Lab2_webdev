// src/components/BookCard.jsx
// Simple, content-driven book card component receiving book data via props.

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

// Unobtrusive SVG fallback if image fails to load
const FALLBACK_COVER = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="260" viewBox="0 0 200 260"><rect width="200" height="260" fill="%23efebe3"/><text x="100" y="135" fill="%239a9388" font-family="sans-serif" font-size="13" text-anchor="middle">No cover</text></svg>';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img
          src={book.cover}
          alt={book.title}
          className="book-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_COVER;
          }}
        />
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-footer">
          <span className="book-price">{book.price.toLocaleString()} DA</span>
          <button
            type="button"
            className="btn-add"
            onClick={() => dispatch(addToCart(book))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
