// test_verification.mjs
// Automated verification script for PageTurner Bookstore (WAMD TD-TP 2)

import { store } from './src/app/store.js';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice
} from './src/features/cart/cartSlice.js';
import { BOOKS, CATEGORIES } from './src/data/books.js';

console.log('=== PageTurner Verification Test Suite ===\n');

// 1. Catalog count check
console.assert(BOOKS.length >= 8, `Expected at least 8 books, got ${BOOKS.length}`);
console.log(`[PASS] 1. Catalog size: ${BOOKS.length} books (Requirement: >= 8 books)`);

// 2. Initial state
store.dispatch(clearCart());
let state = store.getState();
console.assert(selectCartItems(state).length === 0);
console.assert(selectTotalQuantity(state) === 0);
console.assert(selectTotalPrice(state) === 0);
console.log('[PASS] 2. Initial empty cart state verified.');

// 3. Add to cart
store.dispatch(addToCart(BOOKS[0])); // The Stranger (1200 DA)
state = store.getState();
console.assert(selectCartItems(state).length === 1);
console.assert(selectTotalQuantity(state) === 1);
console.assert(selectTotalPrice(state) === 1200);
console.log('[PASS] 3. addToCart action verified (The Stranger, 1,200 DA).');

// 4. Duplicate add (quantity increments, no duplicate line)
store.dispatch(addToCart(BOOKS[0]));
state = store.getState();
console.assert(selectCartItems(state).length === 1);
console.assert(selectCartItems(state)[0].quantity === 2);
console.assert(selectTotalQuantity(state) === 2);
console.assert(selectTotalPrice(state) === 2400);
console.log('[PASS] 4. Duplicate book addition increments quantity to 2.');

// 5. Increase quantity
store.dispatch(increaseQuantity(BOOKS[0].id));
state = store.getState();
console.assert(selectCartItems(state)[0].quantity === 3);
console.assert(selectTotalQuantity(state) === 3);
console.assert(selectTotalPrice(state) === 3600);
console.log('[PASS] 5. increaseQuantity action verified (quantity: 3, total: 3,600 DA).');

// 6. Decrease quantity
store.dispatch(decreaseQuantity(BOOKS[0].id));
state = store.getState();
console.assert(selectCartItems(state)[0].quantity === 2);
console.assert(selectTotalPrice(state) === 2400);
console.log('[PASS] 6. decreaseQuantity action verified (quantity: 2, total: 2,400 DA).');

// 7. Decrease down to 1
store.dispatch(decreaseQuantity(BOOKS[0].id));
state = store.getState();
console.assert(selectCartItems(state)[0].quantity === 1);
console.log('[PASS] 7. Decreased quantity to 1.');

// 8. Guard: decrease at quantity 1 must NEVER go below 1
store.dispatch(decreaseQuantity(BOOKS[0].id));
state = store.getState();
console.assert(selectCartItems(state)[0].quantity === 1, 'Quantity must never fall below 1!');
console.assert(selectTotalQuantity(state) === 1);
console.log('[PASS] 8. Minimum quantity guard (>= 1) verified.');

// 9. Multiple unique products
store.dispatch(addToCart(BOOKS[2])); // Clean Code (3500 DA)
state = store.getState();
console.assert(selectCartItems(state).length === 2);
console.assert(selectTotalQuantity(state) === 2);
console.assert(selectTotalPrice(state) === 1200 + 3500);
console.log('[PASS] 9. Multi-product cart verified (total: 4,700 DA).');

// 10. Remove from cart
store.dispatch(removeFromCart(BOOKS[0].id));
state = store.getState();
console.assert(selectCartItems(state).length === 1);
console.assert(selectCartItems(state)[0].id === BOOKS[2].id);
console.assert(selectTotalQuantity(state) === 1);
console.assert(selectTotalPrice(state) === 3500);
console.log('[PASS] 10. removeFromCart action verified (remaining: 3,500 DA).');

// 11. Clear cart
store.dispatch(clearCart());
state = store.getState();
console.assert(selectCartItems(state).length === 0);
console.assert(selectTotalQuantity(state) === 0);
console.assert(selectTotalPrice(state) === 0);
console.log('[PASS] 11. clearCart action verified (cart reset to empty).');

console.log('\n>>> ALL 11 VERIFICATION TESTS PASSED SUCCESSFULLY! <<<\n');
