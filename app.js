import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './src/config/database.js';
import productRoutes from './src/routes/products.js';
import { version } from 'react';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Product Management API',
    version: '1.0.0' ,
endpints: {
    products: '/api/products',
    product: '/api/products/:id',
    suppliers: '/api/products/:id/suppliers',
    inventory: '/api/products/:id/inventory'   
}
}); 

    });