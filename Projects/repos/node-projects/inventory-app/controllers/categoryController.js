const queries = require('../db/queries');

const getCategories = async (req, res) => {
    try {
        const categories = await queries.getCategories();
        res.render('index', { categories });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await queries.addCategory(name, description);
        res.redirect(`/?message=Category added successfully`);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Ensure category exists before deleting
        const category = await queries.getCategoryById(categoryId);
        if (!category) {
            return res.redirect('/?message=Category not found&error=true');
        }

        // Delete the category
        await queries.deleteCategory(categoryId);

        // Redirect to homepage with success message
        res.redirect('/?message=Category deleted successfully');
    } catch (err) {
        console.error("Error deleting category:", err);
        res.redirect('/?message=Server error while deleting category&error=true');
    }
};

const getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await queries.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = { getCategories, addCategory, deleteCategory, getCategory };
