const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//multer config
const upload = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) => {
            const uploadDir = path.join(__dirname,'..','uploads');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

//SImple middleware to ensure authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

router.get('/', ensureAuthenticated, folderController.listFolder);
router.post('/', ensureAuthenticated, folderController.createFolder);
router.get('/:id', ensureAuthenticated, folderController.viewFolder);
router.post('/:id/edit', ensureAuthenticated, folderController.renameFolder);
router.post('/:id/delete', ensureAuthenticated, folderController.deleteFolder);
router.post('/:id/upload', ensureAuthenticated, upload.single('file'), folderController.uploadToFolder);

module.exports = router;