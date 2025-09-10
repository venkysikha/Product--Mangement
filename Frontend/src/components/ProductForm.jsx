import React, { useState, useEffect } from 'react';

export default function ProductForm({ initialValues, onSubmit, onCancel, isEditing }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function validate(v) {
    const e = {};
    if (!v.name || v.name.trim() === '') e.name = 'Name is required';
    const priceNum = Number(v.price);
    if (Number.isNaN(priceNum) || priceNum < 0) e.price = 'Price must be a non-negative number';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: name === 'price' ? value : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eobj = validate(values);
    setErrors(eobj);
    if (Object.keys(eobj).length) return;
    onSubmit({
      name: values.name.trim(),
      price: Number(values.price),
      description: values.description || '',
      category: values.category || ''
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={values.name} onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}
      </label>
      <label>
        Price
        <input name="price" type="number" min="0" step="0.01" value={values.price} onChange={handleChange} />
        {errors.price && <div className="error">{errors.price}</div>}
      </label>
      <label>
        Category
        <input name="category" value={values.category} onChange={handleChange} />
      </label>
      <label>
        Description
        <textarea name="description" value={values.description} onChange={handleChange} />
      </label>
      <div className="actions">
        <button className="btn primary" type="submit">{isEditing ? 'Update' : 'Add'}</button>
        {isEditing && (
          <button className="btn" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}


