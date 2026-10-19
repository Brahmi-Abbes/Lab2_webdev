// src/features/cart/cartSlice.js
// Redux Toolkit Slice: defines the cart state and reducer functions for PageTurner Bookstore.

import { createSlice } from '@reduxjs/toolkit';

// Initial global state for the cart
const initialState = {
  items: [] // Array of books in cart: { id, title, author, price, cover, quantity }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Action: addToCart
    // If the book is already in the cart, increase its quantity by 1.
    // If it's a new book, add it with an initial quantity of 1.
    addToCart: (state, action) => {
      const book = action.payload;
      const existingItem = state.items.find((item) => item.id === book.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...book,
          quantity: 1
        });
      }
    },

    // 2. Action: removeFromCart
    // Removes the book completely from the cart by its ID.
    removeFromCart: (state, action) => {
      const bookId = action.payload;
      state.items = state.items.filter((item) => item.id !== bookId);
    }
  }
});

// Export action creators (used in components with useDispatch)
export const { addToCart, removeFromCart } = cartSlice.actions;

// Selectors: Helper functions to read values from Redux state (used with useSelector)
export const selectCartItems = (state) => state.cart.items;

export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

// Export reducer (registered in src/app/store.js)
export default cartSlice.reducer;
