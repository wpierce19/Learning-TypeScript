const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

exports.getFileDetails = async (req, res) => {
    try {
        const fileId = parseInt(req.params.id);
        const file = await prisma.file.findFirst({
            where: {id: fileId},
            include: {folder: true}
        });
        if (!file) return res.status(404).send('File not found');
        res.render('fileDetails', {file});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving file details');
    }
};

exports.downloadFile = async (req,res) => {
    try {
        const fileId = parseInt(req.params.id);
        const file = await prisma.file.findFirst({where: {id: fileId}});
        if (!file) return res.status(404).send('File not found');
        res.download(file.filePath, file.name);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error downloading file');
    }
};