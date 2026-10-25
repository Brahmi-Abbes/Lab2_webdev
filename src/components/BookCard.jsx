// src/components/BookCard.jsx
// Reusable book card component displaying individual book data passed via props.

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

// Unobtrusive SVG fallback if external book cover fails to load
const FALLBACK_COVER = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="260" viewBox="0 0 200 260"><rect width="200" height="260" fill="%23efebe3"/><text x="100" y="135" fill="%239a9388" font-family="sans-serif" font-size="13" text-anchor="middle">No cover</text></svg>';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  // Optional Feature: Temporary visual feedback when a book is added
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 700);
  };

  return (
    <article className="book-card">
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
        <span className="book-category">{book.category}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>

        <div className="book-footer">
          <span className="book-price">{book.price.toLocaleString()} DA</span>
          <button
            type="button"
            className={`btn-add ${justAdded ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
          >
            {justAdded ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
