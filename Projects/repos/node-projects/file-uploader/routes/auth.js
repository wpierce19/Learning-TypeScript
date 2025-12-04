const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//multer config for default uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) => {
            const uploadDir = path.join(__dirname, '..','uploads');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));
router.get('/dashboard', authController.getDashboard);
router.get('/logout', authController.logout);
router.get('/upload', authController.getUploadForm);
router.post('/upload', upload.single('file'), authController.postUpload);

module.exports = router;