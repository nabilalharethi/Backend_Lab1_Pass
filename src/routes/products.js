import express from 'express';
import Product from '../models/product.js';

const router = express.Router();



router.post('/', async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return  res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(400).json({ error: 'Invalid product ID' });
    }
});


router.get('/:id/suppliers', async (req, res) => {
    try {
        const suppliers = await Product.getSuppliers(req.params.id);
        if (!suppliers) {
            return res.status(404).json({ error: 'No suppliers found for this product' });
        }  
        res.json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error.message);
        res.status(400).json({ error: 'Invalid product ID' });
    }
});