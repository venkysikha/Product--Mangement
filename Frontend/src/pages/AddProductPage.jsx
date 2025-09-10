import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import ProductForm from '../components/ProductForm';

export default function AddProductPage() {
  const navigate = useNavigate();

  async function handleAdd(values) {
    await createProduct(values);
    navigate('/');
  }

  return (
    <div className="right">
      <h2>Add Product</h2>
      <ProductForm
        initialValues={{ name: '', price: '', description: '', category: '' }}
        onSubmit={handleAdd}
        onCancel={() => navigate('/')}
        isEditing={false}
      />
    </div>
  );
}


