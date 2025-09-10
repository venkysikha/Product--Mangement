import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="card">
      <div className="card-title">
        <strong>{product.name}</strong>
        <span>${Number(product.price).toFixed(2)}</span>
      </div>
      <div className="card-body">
        <div className="muted">{product.category}</div>
        <div>{product.description}</div>
      </div>
      <div className="card-actions">
        <Link className="btn btn-info" to={`/product/${product._id}`}>
          <span className="btn-icon">ℹ️</span>
          <span className="btn-label">Info</span>
        </Link>
        <Link className="btn btn-edit" to={`/edit/${product._id}`}>
          <span className="btn-icon">✏️</span>
          <span className="btn-label">Edit</span>
        </Link>
        <button className="btn btn-delete" onClick={onDelete}>
          <span className="btn-icon">🗑️</span>
          <span className="btn-label">Delete</span>
        </button>
      </div>
    </div>
  );
}


