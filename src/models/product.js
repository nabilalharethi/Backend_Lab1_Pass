import {pool} from '../config/database.js';


class Product {
    static async create(ProductData){
        const { Product_name , description, price, supplier_id, quantity} = ProductData;

        if(!Product_name || !price) {
            throw new Error('Product name and price are required');
        }

        if (isNaN(price) || price < 0 ) {
            throw new Error ('price must be a valid positive number');
        }

        const connection = await pool.getConnection();
        try {

            await connection.beginTransaction();
            
            const [ProductResult] = await connection.query(
                'INSERT INTO Products (Product_name, description, price) VALUES (?, ?, ?)',
                [Product_name, description || '', price]
            );
            
            const productId = ProductResult.insertId;

            if (supplier_id && quantity !== undefined) {
                if (isNaN(supplier_id) || supplier_id < 0){
                    throw new Error('supplier_id must be a valid positive number');
                }

                await connection.query(
                    'INSERT INTO Product_Suppliers (product_id, supplier_id, quantity) VALUES (?, ?, ?)',
                    [productId, supplier_id, quantity || 0]
                );
            }

            await connection.commit();
            return productId;


        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }


    }
}