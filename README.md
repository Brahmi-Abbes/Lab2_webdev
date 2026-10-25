# PageTurner — Independent Online Bookstore

> **Course:** Web Application Mobile Development (WAMD) — TD-TP 2  
> **Institution:** ENSTA (First Semester 2026)  
> **Topic:** React Application with Redux for State Management  
> **Student:** [Your Name / Student ID Placeholder]  

---

## 1. Project Overview

**PageTurner** is a clean, student-crafted online bookstore built as a complete submission for the WAMD TD-TP 2 assignment. It demonstrates key React principles (components, JSX, props, local state, and event handling) combined with centralized, predictable state management using **Redux Toolkit** and **React-Redux**.

The application features:
- A catalog of 9 carefully curated books across classic literature, technology, self-improvement, and philosophy.
- Live search filtering by title or author using React local state (`useState`).
- Category filtering and sorting by price or title.
- A compact, proportionate shopping bag aligned directly with the catalog.
- Complete Redux shopping-cart operations: Add, Remove, Increase quantity, and Decrease quantity (guarded against falling below 1).
- Automatic derivation of total items and cart subtotal.
- Safe browser `localStorage` persistence.
- Visual feedback on button interactions without distracting animations.

---

## 2. Technologies Used

- **React 19 & JSX:** Component-based UI and declarative markup.
- **Redux Toolkit (`@reduxjs/toolkit`):** Efficient Redux store configuration, slice management, and immutable state updates with Immer.
- **React-Redux (`react-redux`):** Official bindings providing `<Provider>`, `useSelector`, and `useDispatch`.
- **Vite:** High-performance local development server and build tool.
- **Vanilla CSS:** Natural, content-focused styling without third-party CSS frameworks.

---

## 3. Project Architecture

```
Lab2_webdev/
├── package.json
├── index.html
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                  # Mounts the React application and provides the Redux Store
    ├── App.jsx                   # Primary layout container (Header, BookList, Cart)
    ├── index.css                 # Clean stylesheet (terracotta, off-white, serif typography)
    ├── app/
    │   └── store.js              # Central Redux store configuration
    ├── features/
    │   └── cart/
    │       └── cartSlice.js      # Cart slice, reducers, persistence, and derived selectors
    ├── components/
    │   ├── Header.jsx            # Store title and live cart count
    │   ├── BookList.jsx          # Catalog section with search, category filter, and sorting
    │   ├── BookCard.jsx          # Reusable book card receiving props & dispatching addToCart
    │   ├── Cart.jsx              # Compact shopping bag panel
    │   └── CartItem.jsx          # Individual cart item with quantity stepper (+ / -) & remove
    └── data/
        └── books.js              # Catalog data (9 books with titles, authors, prices, covers)
```

---

## 4. Main React Components & Responsibilities

| Component | Responsibility | Props Received | State / Redux Used |
| :--- | :--- | :--- | :--- |
| **`Header`** | Displays the store name and cart item counter. | None | Reads total count via `useSelector(selectTotalQuantity)` |
| **`BookList`** | Controls catalog filtering, sorting, and renders the 3-column book grid. | `books` (array) | Local `useState` (`searchTerm`, `selectedCategory`, `sortBy`) |
| **`BookCard`** | Displays individual book details and handles the "Add to Cart" interaction. | `book` (object) | Local feedback state (`useState`), dispatches `addToCart` via `useDispatch` |
| **`Cart`** | Renders the compact shopping bag panel, empty state, and overall subtotal. | None | Reads `useSelector(selectCartItems)` and `useSelector(selectTotalPrice)` |
| **`CartItem`** | Renders individual cart lines, quantity stepper controls, and removal action. | `item` (object) | Dispatches `increaseQuantity`, `decreaseQuantity`, and `removeFromCart` |

---

## 5. Redux Store & State Structure

### Global State (`state.cart`)
```javascript
{
  cart: {
    items: [
      {
        id: 1,
        title: "The Stranger",
        author: "Albert Camus",
        category: "Classic",
        price: 1200,
        cover: "https://...",
        quantity: 2
      }
    ]
  }
}
```

### Actions & Reducers (`src/features/cart/cartSlice.js`)

1. **`addToCart(book)`**:
   - Checks if the item already exists in `state.items`.
   - If present, increments its `quantity += 1`.
   - If new, appends `{ ...book, quantity: 1 }`.
   - Persists state to `localStorage`.
2. **`removeFromCart(bookId)`**:
   - Filters out the item matching `item.id !== bookId`.
   - Persists state to `localStorage`.
3. **`increaseQuantity(bookId)`**:
   - Finds the item by ID and increments `item.quantity += 1`.
   - Persists state to `localStorage`.
4. **`decreaseQuantity(bookId)`**:
   - Finds the item and decrements quantity **only if `quantity > 1`** (guard ensures quantity never falls below 1).
   - Persists state to `localStorage`.
5. **`clearCart()`**:
   - Empties the cart (`state.items = []`).
   - Persists state to `localStorage`.

### Derived Selectors
- **`selectCartItems`**: Extracts `state.cart.items`.
- **`selectTotalQuantity`**: Derived via `.reduce((sum, item) => sum + item.quantity, 0)`.
- **`selectTotalPrice`**: Derived via `.reduce((sum, item) => sum + item.price * item.quantity, 0)`.

---

## 6. Prerequisites & Installation

### Prerequisites
- Node.js (version 18 or newer)
- npm (version 9 or newer)

### Installation
```bash
# Navigate to the project root:
cd D:\Projects\Lab2_webdev

# Install dependencies:
npm install
```

### Local Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:5173/`**.

### Production Build
```bash
npm run build
```
Builds optimized production assets into the `dist/` directory.

### Running Verification Tests
```bash
# Execute the automated Node verification script:
node test_verification.mjs
```

---

## 7. Submission Checklist

- [x] Complete project source code committed and pushed to private GitHub repository.
- [x] Verified production build (`npm run build`).
- [x] Tested in browser with zero console errors.
- [x] Documentation complete (`README.md`).
