import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import ProductList from '../components/ProductList';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  async function load() {
    const data = await fetchProducts({ search, priceRange });
    setProducts(data);
  }

  useEffect(() => {
    load();
  }, [search, priceRange]);

  async function handleDelete(id) {
    const ok = confirm('Delete this product?');
    if (!ok) return;
    await deleteProduct(id);
    await load();
  }

  return (
    <div className="content">
      <div className="topbar">
        <div className="search-sort spaced">
          <input
            className="input search wide with-icon"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-controls">
            <select className="input" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="0-10">$0 - $10</option>
              <option value="10-100">$10 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000-5000">$1000 - $5000</option>
              <option value="5000+">$5000+</option>
            </select>
          </div>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">🛍️</div>
          <h3>No products</h3>
          <p>Get started by adding your first product.</p>
        </div>
      ) : (
        <ProductList products={products} onDelete={handleDelete} onEdit={() => {}} />
      )}
    </div>
  );
}


