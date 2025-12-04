const queries = require('../db/queries');

const getItems = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await queries.getCategoryById(categoryId);
        if (!category) return res.status(404).send('Category not found');

        const items = await queries.getItemsByCategory(categoryId);
        res.render('items', { categoryId, categoryName: category.name, items });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send('Server error');
    }
};


const addItem = async (req, res) => {
    try {
        const { name, description, quantity, price, category_id } = req.body;
        
        if (!name || !description || !quantity || !price || !category_id) {
            return res.redirect(`/category/${category_id}?message=Please fill in all fields&error=true`);
        }

        await queries.addItem(name, description, quantity, price, category_id);
        res.redirect(`/category/${category_id}?message=Item added successfully`);
    } catch (err) {
        console.error("Error adding item:", err);
        res.redirect(`/category/${category_id}?message=Server error while adding item&error=true`);
    }
};

const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        
        // Fetch the category ID before deleting, to redirect back to the same category page
        const item = await queries.getItemById(itemId);
        if (!item) {
            return res.redirect(`/?message=Item not found&error=true`);
        }

        await queries.deleteItem(itemId);
        res.redirect(`/category/${item.category_id}?message=Item deleted successfully`);
    } catch (err) {
        console.error("Error deleting item:", err);
        res.redirect(`/?message=Server error while deleting item&error=true`);
    }
};

module.exports = { getItems, addItem, deleteItem };
