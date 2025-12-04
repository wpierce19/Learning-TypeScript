const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.listFolder = async (req,res) => {
    try {
        const folders = await prisma.folder.findMany({
            where: {userId: req.user.id},
            include: {files: true}
        });
        res.render('folders', {folders});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving folders');
    }
};

exports.createFolder = async (req,res) => {
    try {
        const {name} = req.body;
        await prisma.folder.create({data: {name, userId: req.user.id}});
        res.redirect('/folders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating folder');
    }
};

exports.viewFolder = async (req,res) => {
    try {
        const folderId = parseInt(req.params.id);
        const folder = await prisma.folder.findFirst({
            where: {id: folderId, userId: req.user.id},
            include: {files: true}
        });
        if (!folder) return res.status(400).send('Folder not found');
        res.render('folder', {folder});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error viewing folder');
    }
};

exports.renameFolder = async (req, res) => {
    try {
        const folderId = parseInt(req.params.id);
        const {name} = req.body;
        await prisma.folder.update({
            where: {id: folderId},
            data: {name}
        });
        res.redirect(`/folders/${folderId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error renaming folder');
    }
};

exports.deleteFolder = async (req, res) => {
    try {
        const folderId = parseInt(req.params.id);
        await prisma.folder.delete({where: {id: folderId}});
        res.redirect('/folders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting folder');
    }
};

exports.uploadToFolder = async (req,res) => {
    try {
        const folderId = parseInt(req.params.id);
        const folder = await prisma.folder.findFirst({
            where: {id: folderId, userId: req.user.id}
        });
        if (!folder) return res.status(404).send('Folder not found');
        const {file} = req;
        if (!file) return res.status(400).send('No file uploaded');
        const localFilePath = file.path;
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: `user_${req.user.id}/folder_${folderId}`
        });
        await prisma.file.create({
            data: {
                name: file.originalname,
                size: file.size,
                filePath: localFilePath,
                fileUrl: result.secure_url,
                folderId: folderId
            }
        });
        res.redirect(`/folders/${folderId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file to folder');
    }
};