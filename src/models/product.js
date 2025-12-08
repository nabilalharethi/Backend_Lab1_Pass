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
    }
}