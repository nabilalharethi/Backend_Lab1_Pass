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


app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});


app.use((err, req, res, next) => {
    console.error( err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


async function startServer() {
    await testConnection();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`API  available at http://localhost:${PORT}/api/products`);
    });
    }
startServer();
