import readline from 'readline';
import {testConnection, pool} from './src/config/database.js';
import Product from './src/models/product.js';
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
    const product_name = await question('Product Name: ');
    const description = await question('Description: ');
    const price = await question('Price: ');
    const supplier_id = await question('Supplier ID (optional): ');
    const quantity = await question('Quantity (optional): ');

    try {
        const productId = await Product.create({
            product_name,
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
                console.log(`ID: ${prod.product_id}, Name: ${prod.product_name}, Price: ${prod.price}`);
                console.log('---------------------');
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}

async function getProductById() {
    const id = await question('Enter Product ID: ');
    try {
        const product = await Product.getById(parseInt(id));
        if (!product) {
            console.log('Product not found.');
        } else {
            console.log(`\n--- Product Details (ID: ${product.product_id}) ---`);
            console.log(`Name: ${product.product_name}`);
            console.log(`Description: ${product.description}`);
            console.log(`Price: ${product.price}`);
        }
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
}

async function getProductSuppliers() {
    const id = await question('Enter Product ID: ');
    try {
        const supplier = await Product.getSuppliers(parseInt(id));

        if(!supplier){
            console.log('No supplier found for this product.');
        }  else {
            console.log(`\n--- Supplier Details for Product ID: ${id} ---`);
            console.log(`Supplier ID: ${supplier.supplier_id}`);
            console.log(`Supplier Name: ${supplier.supplier_name}`);
            console.log(`Contact Info: ${supplier.contact_info}`);
        }
    } catch (error) {
        console.error('Error fetching supplier details:', error.message);
    }
}

async function getProductInventory() {
    const id = await question('Enter Product ID: ');
    try {
        const inventory = await Product.getInventory(parseInt(id));
        if (!inventory) {
            console.log('No inventory found for this product.');
        } else {
            console.log(`\n--- Inventory Details for Product ID: ${id} ---`);
            console.log(`Supplier ID: ${inventory.supplier_id}`);
            console.log(`Quantity: ${inventory.quantity}`);
            console.log(`Last Restock Date: ${inventory.last_restock_date}`);
        }
    } catch (error) {
        console.error('Error fetching inventory details:', error.message);
    }
}

async function main() {
    await testConnection();
    let running = true;

    while (running) {
        await showMenu();
        const choice = await question('Select an option (1-6): ');
        switch (choice) {
            case '1':
                await createProduct();
                break;
            case '2':
                await listAllProducts();
                break;
            case '3':
                await getProductById();
                break;
            case '4':
                await getProductSuppliers();    
                break;
            case '5':
                await getProductInventory();    
                break;
            case '6':
                running = false;
                break;
            default:
                console.log('Invalid option. Please try again.');
        }
    }

    rl.close();
    await pool.end();
    console.log('Exiting Product Management CLI. Goodbye!');
    process.exit(0);
}
main();