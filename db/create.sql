CREATE TABLE supplier (
    supplier_id INT AUTO_INCREMENT PRIMARy KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    supplier_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE CASCADE
);

INSERT INTO supplier (supplier_name, contact_info) VALUES
('Samsung Electronics', 'contact@samsung.com'),
('Apple Inc.', 'supplier@apple.com');

INSERT INTO product (product_name, description, price) VALUES
('Samsung Galaxy S24', 'Latest flagship smartphone from Samsung', 999.99),
('iPhone 15 Pro', 'Apple premium smartphone with A17 chip', 1199.99),
('Samsung Galaxy Watch 6', 'Advanced smartwatch with health tracking', 349.99),
('Apple MacBook Air M3', 'Thin and light laptop with M3 chip', 1299.99),
('Samsung Galaxy Buds Pro', 'Premium wireless earbuds', 199.99);

INSERT INTO inventory (product_id, supplier_id, quantity) VALUES
(1, 1, 50),  
(2, 2, 30),  
(3, 1, 75),  
(4, 2, 20),  
(5, 1, 100); 