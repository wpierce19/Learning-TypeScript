const pool = require("./pool");

// Get all categories
const getCategories = async () => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
};

// Get a single category by ID
const getCategoryById = async (categoryId) => {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Get items by category ID
const getItemsByCategory = async (categoryId) => {
    const result = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
    return result.rows;
};

// Add a new category
const addCategory = async (name, description) => {
    const result = await pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
    );
    return result.rows[0];
};

// Delete a category and cascade delete related items
const deleteCategory = async (categoryId) => {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [categoryId]);
    return result.rows[0];
};

// Add a new item
const addItem = async (name, description, quantity, price, categoryId) => {
    const result = await pool.query(
        'INSERT INTO items (name, description, quantity, price, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, quantity, price, categoryId]
    );
    return result.rows[0];
};

// Delete an item by ID
const deleteItem = async (itemId) => {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [itemId]);
    return result.rows[0];
};

module.exports = {
    getCategories,
    getCategoryById,
    getItemsByCategory,
    addCategory,
    deleteCategory,
    addItem,
    deleteItem
};
