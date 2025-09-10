import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const p = await fetchProductById(id);
        setProduct(p);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <h3>Product Not Found</h3>
          <p>The product you're looking for doesn't exist.</p>
          <Link className="btn primary" to="/">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-header">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">${Number(product.price).toFixed(2)}</div>
        </div>
        
        <div className="product-info">
          <div className="info-section">
            <h3 className="info-label">Category</h3>
            <p className="info-value">{product.category || 'No category specified'}</p>
          </div>
          
          <div className="info-section">
            <h3 className="info-label">Description</h3>
            <p className="info-value">{product.description || 'No description available'}</p>
          </div>
          
          <div className="info-section">
            <h3 className="info-label">Created</h3>
            <p className="info-value">{new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="product-actions">
          <Link className="btn primary" to={`/edit/${product._id}`}>
            ✏️ Edit Product
          </Link>
          <Link className="btn secondary" to="/">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}


