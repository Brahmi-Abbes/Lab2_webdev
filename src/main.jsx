// src/main.jsx
// Entry point: mounts the React application to the DOM and wraps it with Redux Provider.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* The Redux Provider makes the store available to any nested components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
