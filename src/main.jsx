import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { CatalogProvider } from './context/CatalogContext';
import './assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <CatalogProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CatalogProvider>
    </ToastProvider>
  </React.StrictMode>
);
