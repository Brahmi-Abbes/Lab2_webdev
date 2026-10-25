# PageTurner — Independent Bookstore

PageTurner is a lightweight frontend web application designed as a student project to demonstrate core React principles and centralized state management using Redux Toolkit and React-Redux. The application represents a modest online bookstore where users can explore a curated catalog of books, search and filter titles, and manage an interactive shopping bag with real-time updates.

---

## Project Information

- **Application Name:** PageTurner
- **Module:** Web Application and Mobile Development (WAMD)
- **Assignment:** TD-TP 2 — Create a React Application with Redux for State Management
- **Institution:** Higher National School of Advanced Technologies (ENSTA)
- **Author:** [Student Full Name Placeholder]
- **Repository:** https://github.com/Brahmi-Abbes/Lab2_webdev

---

## Features

### Mandatory Requirements
- **Book Catalog:** Displays 9 realistic books across diverse categories with titles, authors, categories, Algerian dinar prices, and cover images with fallbacks.
- **Component Architecture:** Reusable, single-responsibility components (`Header`, `BookList`, `BookCard`, `Cart`, `CartItem`).
- **Props Passing:** Data passed unidirectionally from parent to child components.
- **Local State (`useState`):** Manages search query, selected category, and sort option locally in the catalog, as well as temporary button feedback in cards.
- **Event Handling:** Handles clicks, input changes, and select actions cleanly.
- **Centralized Redux Store:** Configured with Redux Toolkit to maintain the shared shopping cart.
- **Redux Actions & Reducers:** Supports adding books, incrementing quantities on repeat additions, adjusting item quantities (+ / -), and removing books.
- **Quantity Protection:** Guard logic prevents item quantities from falling below 1.
- **Derived Calculations:** Total book count and subtotal are derived directly from cart state using selectors (`selectTotalQuantity`, `selectTotalPrice`) without storing redundant values.
- **Empty Cart State:** Displays a concise empty-cart message when no books are in the bag.

### Optional Features
- **Search:** Real-time search filtering by book title or author.
- **Category Filter:** Filter catalog by specific genre or view all books.
- **Sorting:** Sort books by Featured (default ID), Price: Low to High, Price: High to Low, or Title: A–Z.
- **LocalStorage Persistence:** Shopping cart items automatically persist across browser refreshes via safe browser storage with non-browser environment guards.
- **Add to Cart Feedback:** Visual confirmation ("Added ✓") displays briefly on the button when an item is added.

---

## Technologies

- **React:** 19.3.1 (Component-based user interface)
- **JavaScript & JSX:** ES6+ modules and declarative markup
- **Redux Toolkit:** 2.13.0 (Store configuration, slice reducers, action creators, and Immer integration)
- **React-Redux:** 9.3.0 (Provider wrapper, useSelector, and useDispatch hooks)
- **Vite:** 8.3.4 (Build tool and development server)
- **CSS:** Plain CSS using responsive design, flexbox, and CSS grid
- **Development Environment:** Node.js (v22.15.0 LTS) and npm (10.9.2)

---

## Project Structure

```
Lab2_webdev/
├── index.html                   # HTML entry shell
├── package.json                 # Project dependencies, metadata, and scripts
├── vite.config.js               # Vite configuration with React plugin
├── test_verification.mjs        # Automated verification test suite
├── .gitignore                   # Ignored files (node_modules, dist, logs)
├── screenshots/                 # Submission screenshots folder
└── src/
    ├── main.jsx                 # Mounts the DOM root and wraps App with Redux <Provider>
    ├── App.jsx                  # Main application layout container
    ├── index.css                # Application styles (color tokens, typography, grid)
    ├── app/
    │   └── store.js             # Central Redux store configuration
    ├── features/
    │   └── cart/
    │       └── cartSlice.js     # Cart state, reducers, persistence, and derived selectors
    ├── components/
    │   ├── Header.jsx           # Store branding and reactive cart count indicator
    │   ├── BookList.jsx         # Catalog section with search, category filtering, and sorting
    │   ├── BookCard.jsx         # Individual book card with cover image and Add to Cart action
    │   ├── Cart.jsx             # Shopping cart panel container and subtotal calculation
    │   └── CartItem.jsx         # Individual cart row with quantity stepper (+ / -) and remove button
    └── data/
        └── books.js             # Catalog data array containing 9 book records and category definitions
```

---

## Redux State Management

### Store Structure
The Redux store manages a single global slice under `state.cart`:

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
        cover: "...",
        quantity: 2
      }
    ]
  }
}
```

### Actions and Reducers (`src/features/cart/cartSlice.js`)
- `addToCart(book)`: Searches the current `items` array. If an item with the same ID exists, it increments its `quantity` by 1. Otherwise, it pushes the book with `quantity = 1`.
- `removeFromCart(bookId)`: Filters out the book matching the given ID.
- `increaseQuantity(bookId)`: Finds the book by ID and increments `quantity` by 1.
- `decreaseQuantity(bookId)`: Finds the book by ID and decrements `quantity` by 1, with a guard preventing quantities below 1 (`quantity > 1`).
- `clearCart()`: Empties the `items` array.

### React-Redux Integration
1. **`<Provider store={store}>`**: Declared in `src/main.jsx`, making the central store accessible to every component in the component tree.
2. **`useDispatch()`**: Used in `BookCard.jsx` to dispatch `addToCart`, and in `CartItem.jsx` to dispatch `increaseQuantity`, `decreaseQuantity`, and `removeFromCart`.
3. **`useSelector()`**: Used in `Header.jsx` to read `selectTotalQuantity`, and in `Cart.jsx` to read `selectCartItems` and `selectTotalPrice`.
4. **Reactive UI Updates**: When an action is dispatched, the reducer creates an updated state in the store. React-Redux detects the reference change in the selected state and triggers an immediate re-render of the subscribed components.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Brahmi-Abbes/Lab2_webdev.git
```

### 2. Navigate to the Directory
```bash
cd Lab2_webdev
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 5. Run Automated Tests
```bash
npm test
```

### 6. Create Production Build
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## Requirements

- **Node.js:** v18.0.0 or higher (tested with Node.js v22.15.0 LTS)
- **npm:** v9.0.0 or higher (tested with npm 10.9.2)
- **Web Browser:** Any modern evergreen browser (Chrome, Firefox, Edge, Safari)

---

## Screenshots

To prepare your submission deliverables, save the following screenshots in the `screenshots/` directory:

1. `screenshots/1-catalog.png` — Default home view displaying the header, catalog grid, and empty cart.
2. `screenshots/2-cart-items.png` — View with multiple books added, demonstrating item quantities, line subtotals, and total price.
3. `screenshots/3-search-filter.png` — Catalog filtered by keyword search or category dropdown.

---

## Assignment Context

This application was developed as a laboratory assignment for the **WAMD** module at the **Higher National School of Advanced Technologies (ENSTA)** during the First Semester of 2026. It serves as an academic demonstration of component-based frontend engineering, state hoisting versus global state, props delegation, and predictable state transitions using Redux.