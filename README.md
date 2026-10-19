# PageTurner — Independent Online Bookstore

> **Course:** Web Application Mobile Development (WAMD) — TD-TP 2  
> **Institution:** ENSTA (First Semester 2026)  
> **Topic:** React Application with Redux for State Management  
> **Student:** [Your Name / Student ID]  

---

## 1. Project Description

**PageTurner** is a modest online bookstore built as a university lab assignment. It demonstrates the core concepts of React and global state management using **Redux Toolkit** and **React-Redux**.

The application features:
- A catalog of 6 popular literature, self-development, and computer science books.
- Live search filtering by title, author, or category using React local state (`useState`).
- Reusable components (`Header`, `BookList`, `BookCard`, `Cart`).
- Global shopping cart state managed entirely with Redux Toolkit (`addToCart`, `removeFromCart`).
- Automatic recalculation of total books in bag and total price in Algerian Dinars (DA).
- Sensible empty-bag message.

---

## 2. Redux Implementation

- **`src/app/store.js`**: Central Redux store configured via `configureStore({ reducer: { cart: cartReducer } })`.
- **`src/features/cart/cartSlice.js`**: Contains the cart state (`items: []`), reducers, and selectors:
  - `addToCart(book)`: Increments quantity if already in the bag, or appends a new item.
  - `removeFromCart(bookId)`: Removes the book from the bag.
  - `selectCartItems`: Selects items in the cart.
  - `selectTotalQuantity`: Calculates the sum of all book quantities.
  - `selectTotalPrice`: Calculates `sum(price * quantity)`.
- **`src/main.jsx`**: Wraps the root `<App />` component inside `<Provider store={store}>`.
- **`useSelector`**: Reads state in `Header.jsx` and `Cart.jsx`.
- **`useDispatch`**: Dispatches `addToCart` in `BookCard.jsx` and `removeFromCart` in `Cart.jsx`.

---

## 3. How to Run the Application

```bash
# Start development server:
npm run dev

# Open in browser:
http://localhost:5173/
```
