const multer = require('multer');
const uniqueString = require('unique-string');
const path = require('path');
const fs = require('fs');

const { regexString, staticPath, uploadConfig } = require('../../config/index');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.user.role !== 'guest') {
            let pathResource = "";

            if (regexString.audiosType.test(file.originalname))
                pathResource = pathResource.concat(staticPath.audios);
            else if (regexString.imageType.test(file.originalname))
                pathResource += staticPath.images;

            pathResource = pathResource.concat('/' + req.user.id);
            desPath = path.join(__dirname, '../../', pathResource);
            if (!fs.existsSync(desPath)) fs.mkdirSync(desPath, { recursive: true });
            cb(null, desPath);
        }
        else cb(new Error('You need to log in to upload'), null);
    },
    filename: (req, file, cb) => {
        cb(null, uniqueString() + path.extname(file.originalname));
    }
});

const filter = (req, file, cb) => {
    if (regexString.imageType.test(file.originalname) || regexString.audiosType.test(file.originalname))
        cb(null, true);
    else cb(new Error('File format not accepted'), false);
}
const uploader = multer({
    storage: storage,
    limits: {
        fileSize: uploadConfig.uploadFileSize
    },
    fileFilter: filter
});

module.exports = uploader;