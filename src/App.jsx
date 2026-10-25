// src/App.jsx
// Main application layout for PageTurner Bookstore.

import React from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import Cart from './components/Cart';
import { BOOKS } from './data/books';

function App() {
  return (
    <div className="app">
      <Header />

      <main className="container main-layout">
        <div className="catalog-area">
          <BookList books={BOOKS} />
        </div>

        <div className="cart-area">
          <Cart />
        </div>
      </main>
    </div>
  );
}

export default App;
