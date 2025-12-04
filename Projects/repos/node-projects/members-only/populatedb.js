require('dotenv').config();
const pool = require('./db/pool');

console.log("Using database URL:", process.env.DATABASE_URL);

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                membership_status VARCHAR(20) CHECK (membership_status IN ('active', 'inactive', 'banned')) NOT NULL DEFAULT 'active',
                is_admin BOOLEAN NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                body TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        console.log('Tables created successfully.');

        await pool.query(`
            INSERT INTO users (first_name, last_name, email, password_hash, membership_status, is_admin) VALUES 
            ('John', 'Doe', 'john.doe@example.com', 'hashed_password_123', 'active', TRUE),
            ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_456', 'active', FALSE)
            ON CONFLICT (email) DO NOTHING;
        `);

        await pool.query(`
            INSERT INTO messages (user_id, title, body) VALUES 
            (1, 'Welcome Message', 'Hello, this is a welcome message!'),
            (2, 'Reminder', 'Don’t forget about our meeting tomorrow!')
            ON CONFLICT (title) DO NOTHING;
        `);
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

createTables();

