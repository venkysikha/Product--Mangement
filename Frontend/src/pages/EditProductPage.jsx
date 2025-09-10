import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/api';
import ProductForm from '../components/ProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const p = await fetchProductById(id);
      setProduct({
        name: p.name,
        price: p.price,
        description: p.description,
        category: p.category
      });
    })();
  }, [id]);

  async function handleUpdate(values) {
    await updateProduct(id, values);
    navigate('/');
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="right">
      <h2>Edit Product</h2>
      <ProductForm
        initialValues={product}
        onSubmit={handleUpdate}
        onCancel={() => navigate('/')}
        isEditing={true}
      />
    </div>
  );
}


