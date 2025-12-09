import readline from 'readline';
import {testConnection, pool} from './config/database.js';
import Product from './models/product.js';
import dotenv from 'dotenv';

dotenv.config();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

function question (query) {
    return new Promise (resolve => rl.question (query, resolve));
}   

async function showMenu() {
    console.log('\n=== Product Management CLI ===');
    console.log('1. Create Product');
    console.log('2. List All Products');
    console.log('3. Get Product by ID');
    console.log('4. Get Product supplier');
    console.log('5. Get Product inventory');
    console.log('6. Exit');
    console.log('==============================');
}

async function createProduct() {
    console.log('\n--- Create New Product ---');
    const Product_name = await question('Product Name: ');
    const description = await question('Description: ');
    const price = await question('Price: ');
    const supplier_id = await question('Supplier ID (optional): ');
    const quantity = await question('Quantity (optional): ');

    try {
        const productId = await Product.create({
            Product_name,
            description,
            price: parseFloat(price),
            supplier_id: supplier_id ? parseInt(supplier_id) : null,
            quantity: quantity ? parseInt(quantity) : 0
        });
        console.log(`Product created with ID: ${productId}`);
    } catch (error) {
        console.error('Error creating product:', error.message);
    }
}

async function listAllProducts() {
    try {
        const products = await Product.getAll();
        console.log('\n--- All Products ---');
        if (products.length === 0) {
            console.log('No products found.');
        } else {
            products.forEach(prod => {
                console.log(`ID: ${prod.product_id}, Name: ${prod.Product_name}, Price: ${prod.price}`);
                console.log('---------------------');
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}