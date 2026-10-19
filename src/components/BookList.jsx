// src/components/BookList.jsx
// Book catalog component with a 3-column grid and simple local search filtering.

import React, { useState } from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="catalog-section">
      <div className="catalog-top-bar">
        <h2 className="catalog-heading">Find your next read.</h2>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="no-books">No books match your search.</p>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookList;
