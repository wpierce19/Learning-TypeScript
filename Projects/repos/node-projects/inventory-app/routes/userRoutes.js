const express = require('express');
const categoriesController = require('../controllers/categoryController');
const itemsController = require('../controllers/itemController');

const router = express.Router();

// Category Routes
router.get('/', categoriesController.getCategories);
router.post('/categories', categoriesController.addCategory);
router.get('/categories/:id/delete', categoriesController.deleteCategory); // Change DELETE to GET
router.get('/categories/:id', categoriesController.getCategory);

// Item Routes
router.get('/category/:id', itemsController.getItems);
router.post('/items', itemsController.addItem);
router.get('/items/:id/delete', itemsController.deleteItem);

module.exports = router;
