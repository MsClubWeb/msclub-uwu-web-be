const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');


const createUploadMiddleware = (folderName) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folderName,
            allowed_formats: ['jpg', 'png', 'jpeg'],
        },
    });
    return multer({storage});
};

module.exports = createUploadMiddleware;