const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

function ensureAuthenticated(req,res,next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

router.get('/:id', ensureAuthenticated, fileController.getFileDetails);
router.get('/:id/download', ensureAuthenticated, fileController.downloadFile);

module.exports = router;