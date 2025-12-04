require('dotenv').config();
const pool = require('./db/pool');

console.log("Using database URL:", process.env.DATABASE_URL);

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT
            );

            CREATE TABLE IF NOT EXISTS items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                quantity INT NOT NULL DEFAULT 0,
                price DECIMAL(10,2) NOT NULL,
                category_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
            );
        `);

        console.log('Tables created successfully.');

        await pool.query(`
            INSERT INTO categories (name, description) VALUES 
            ('Electronics', 'Devices and gadgets'),
            ('Clothing', 'Wearable items'),
            ('Furniture', 'Household furniture') 
            ON CONFLICT (name) DO NOTHING;
        `);

        await pool.query(`
            INSERT INTO items (name, description, quantity, price, category_id) VALUES 
            ('Laptop', 'Dell XPS 13', 10, 999.99, 1),
            ('T-Shirt', 'Cotton blue t-shirt', 50, 19.99, 2),
            ('Sofa', 'Leather sofa', 5, 499.99, 3) 
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('Sample data inserted successfully.');
    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        pool.end();
    }
};

createTables();
