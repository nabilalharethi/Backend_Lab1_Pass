import express from 'express';
import Product from '../models/product.js';

const router = express.Router();



router.get('/', async (req, res) => {
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

router.get('/:id/inventory', async (req, res) => {
    try {
        const inventory = await Product.getInventory(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'No inventory found for this product' });
        } 
        res.json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error.message);
        res.status(400).json({ error: 'Invalid product ID' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { product_name, description, price, supplier_id,quantity } = req.body;
        const ProductId = await Product.create({ product_name, description, price, supplier_id, quantity } );

        res.status(201).json({ message: 'Product created successfully', productId: ProductId });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(400).json({ error: error.message });
    }
});

export default router;
