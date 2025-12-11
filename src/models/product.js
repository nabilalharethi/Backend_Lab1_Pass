import {pool} from '../config/database.js';


class Product {
    static async create(ProductData){
        const { product_name , description, price, supplier_id, quantity} = ProductData;

        if(!product_name || !price) {
            throw new Error('Product name and price are required');
        }

        if (isNaN(price) || price < 0 ) {
            throw new Error ('price must be a valid positive number');
        }

        const connection = await pool.getConnection();
        try {

            await connection.beginTransaction();
            
            const [ProductResult] = await connection.query(
                'INSERT INTO product (product_name, description, price) VALUES (?, ?, ?)',
                [product_name, description || '', price]
            );
            
            const productId = ProductResult.insertId;

            if (supplier_id && quantity !== undefined) {
                if (isNaN(supplier_id) || supplier_id < 0){
                    throw new Error('supplier_id must be a valid positive number');
                }

                await connection.query(
                    'INSERT INTO inventory (product_id, supplier_id, quantity) VALUES (?, ?, ?)',
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

    static async getAll(){
        const [rows] = await pool.query('SELECT * FROM product ORDER BY product_id');
        return rows;
    }

    static async getById(productId){
        if (!productId || isNaN(productId)) {
            throw new Error ('Invalid product ID');
        }   
        const [rows] = await pool.query('SELECT * FROM product WHERE product_id = ?', [productId]);
        return rows[0] || null;
    }

    static async getSuppliers(productId){
        if (!productId || isNaN(productId)) {
            throw new Error ('Invalid product ID');
        }
        const [rows] = await pool.query(
            `SELECT s.supplier_id, s.supplier_name, s.contact_info
             FROM supplier s
             INNER JOIN inventory i ON s.supplier_id = i.supplier_id
             WHERE i.product_id = ?`,
            [productId]
        );
        return rows[0] || null;
    }

    static async getInventory(productId){
        if (!productId || isNaN(productId)) {
            throw new Error ('Invalid product ID');
        }

        const [rows] = await pool.query(
            `SELECT product_id, supplier_id, quantity, last_updated
                FROM inventory
                WHERE product_id = ?`,
            [productId]
        );
        return rows[0] || null;
    }
    }
export default Product;