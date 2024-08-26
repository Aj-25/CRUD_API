const multer = require('multer');
const path = require('path');

const { uploadToLocal } = require('../services/storageServices');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure the file extension is preserved
    }
});

const upload = multer({ storage });

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({message:'No file uploaded.'});
        }

        const file = req.file;

        // Local upload
        await uploadToLocal(file);

        // AWS S3 upload
        // await uploadToS3(file);

        // GCP upload
        // await uploadToGCP(file);

        res.status(200).send({ message: 'File uploaded successfully!'});
    } catch (error) {
        res.status(500).send({ message:'Error uploading file: ' + error.message});
    }
};

module.exports = {
    upload,
    uploadFile
};
