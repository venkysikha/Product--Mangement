import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onDelete, onEdit }) {
  if (!products.length) {
    return <p className="empty">No products found.</p>;
  }
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} onDelete={() => onDelete(p._id)} onEdit={() => onEdit(p)} />
      ))}
    </div>
  );
}


