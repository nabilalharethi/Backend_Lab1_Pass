import Product from './product.js';
import { testConnection } from '../config/database.js';

async function runTests() {
    await testConnection();

    console.log("Testing CREATE...");

    try {
        const id = await Product.create({
            Product_name: "Test Item",
            description: "Just testing",
            price: 12.5,
            supplier_id: 1,
            quantity: 10
        });

        console.log("Created product with ID:", id);
    } catch (error) {
        console.error("CREATE FAILED:", error.message);
    }

    console.log("Testing getAll...");
    console.log(await Product.getAll());

    console.log("Testing getById(1)...");
    console.log(await Product.getById(1));

    console.log("Testing getInventory(1)...");
    console.log(await Product.getInventory(1));

    console.log("Testing getSuppliers(1)...");
    console.log(await Product.getSuppliers(1));
}

runTests();
