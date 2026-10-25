// src/components/BookList.jsx
// Book catalog component with search, category filtering, sorting, and a 3-column grid.

import React, { useState } from 'react';
import BookCard from './BookCard';
import { CATEGORIES } from '../data/books';

const BookList = ({ books }) => {
  // Local React state (useState) for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Filter books by search term and selected category
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;

    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      term === '' ||
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  // Sort filtered books based on user selection
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return a.id - b.id; // Default / Featured
  });

  return (
    <section className="catalog-section">
      <div className="catalog-top-bar">
        <h2 className="catalog-heading">Find your next read.</h2>

        {/* Filter and search controls */}
        <div className="catalog-controls">
          <input
            type="text"
            placeholder="Search title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search books"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            aria-label="Sort books"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title">Title: A–Z</option>
          </select>
        </div>
      </div>

      {sortedBooks.length === 0 ? (
        <div className="empty-catalog">
          <p className="no-books">No books match your selection.</p>
          <button
            type="button"
            className="btn-reset-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSortBy('featured');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="books-grid">
          {sortedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookList;
