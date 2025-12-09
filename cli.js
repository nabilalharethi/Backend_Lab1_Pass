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
