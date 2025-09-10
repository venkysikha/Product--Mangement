import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className="app-header">
          <h1 className="brand">Product Management System</h1>
          <nav className="header-actions">
            <Link className="btn" to="/">Products</Link>
            <Link className="btn primary" to="/add" title="Add Product">➕ Add Product</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


