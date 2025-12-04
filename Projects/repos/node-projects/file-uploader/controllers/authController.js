//COmpleted

const {PrismaClient} = require("@prisma/client");
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient();

exports.getSignUp = (req,res) => {
    res.render('signup');
};

exports.postSignup = async (req,res,next) => {
    const {username, password} = req.body;
    try {
        const existingUser = await prisma.user.findUnique({where: {username}});
        if (existingUser) {
            return res.render('signup', {error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {username, password: hashedPassword}
        });
        //log-in after successful signup
        req.login(user, (err) => {
            if (err) return next(err);
            return res.redirect('/dashboard');
        });
    } catch (error) {
        console.error(error);
        res.render('signup', {error: 'Error during sign up'});
    }
};

exports.getLogin = (req,res) => {
    res.render('login');
};

exports.getDashboard = (req,res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('dashboard', {user: req.user});
};

exports.logout = (req,res) => {
    req.logout(() => res.redirect('/login'));
};

exports.getUploadForm = (req,res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('upload');
};

exports.postUpload = async (req,res) => {
    //handle file upload for 'Default' folder
    try {
        const {file} = req;
        if (!file) return res.status(400).send('No file uploaded');

        //Find or create the default folder for user
        let folder = await prisma.folder.findFirst({
            where: {userId: req.user.id, name: "Default"}
        });
        if (!folder) {
            folder = await prisma.folder.create({
                data: {name: "Default", userId: req.user.id}
            });
        }
        const localFilePath = file.path;
        const cloudinary = require('cloudinary').v2;
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: `user_${req.user.id}`
        });
        const fileRecord = await prisma.file.create({
            data: {
                name: file.originalname,
                size: file.size,
                filePath: localFilePath,
                fileUrl: result.secure_url,
                folderId: folder.id
            }
        });
        res.redirect(`/files/${fileRecord.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading File');
    }
};