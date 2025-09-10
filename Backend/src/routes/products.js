const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products?search=foo&priceRange=0-10
router.get('/', async (req, res) => {
  try {
    const { search = '', priceRange = '' } = req.query;
    let query = {};
    
    console.log('Query params:', { search, priceRange });
    
    // Add search filter
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Add price range filter
    if (priceRange && priceRange !== '' && priceRange !== 'all') {
      const priceQuery = {};
      switch (priceRange) {
        case '0-10':
          priceQuery.$gte = 0;
          priceQuery.$lte = 10;
          break;
        case '10-100':
          priceQuery.$gt = 10;
          priceQuery.$lte = 100;
          break;
        case '100-500':
          priceQuery.$gt = 100;
          priceQuery.$lte = 500;
          break;
        case '500-1000':
          priceQuery.$gt = 500;
          priceQuery.$lte = 1000;
          break;
        case '1000-5000':
          priceQuery.$gt = 1000;
          priceQuery.$lte = 5000;
          break;
        case '5000+':
          priceQuery.$gte = 5000;
          break;
        default:
          console.log('Unknown price range:', priceRange);
      }
      if (Object.keys(priceQuery).length > 0) {
        query.price = priceQuery;
        console.log('Price query:', priceQuery);
      }
    }
    
    console.log('Final query:', query);
    const products = await Product.find(query);
    console.log('Found products:', products.length);
    console.log('Product prices:', products.map(p => p.price));
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || name.trim() === '' || price === undefined || price === null || Number(price) < 0) {
      return res.status(400).json({ message: 'Name and non-negative price are required' });
    }
    const product = new Product({ name: name.trim(), price, description, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    if (!name || name.trim() === '' || price === undefined || price === null || Number(price) < 0) {
      return res.status(400).json({ message: 'Name and non-negative price are required' });
    }
    const updated = await Product.findByIdAndUpdate(
      id,
      { name: name.trim(), price, description, category },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;


