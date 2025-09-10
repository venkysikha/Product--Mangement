const base = '';

export async function fetchProducts({ search = '', priceRange = 'all' } = {}) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (priceRange && priceRange !== 'all') params.append('priceRange', priceRange);
  
  const res = await fetch(`${base}/api/products?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function createProduct(body) {
  const res = await fetch(`${base}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id, body) {
  const res = await fetch(`${base}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${base}/api/products/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${base}/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to load product');
  return res.json();
}


