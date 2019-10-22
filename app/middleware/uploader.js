const multer = require('multer');
const uniqueString = require('unique-string');
const path = require('path');
const fs = require('fs');

const { regexString, staticPath, uploadConfig } = require('../../config/index');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let pathResource = "";
        
        if (file.originalname.match(regexString.audios_type))
            pathResource += staticPath.audios;
        else if (file.originalname.match(regexString.image_type))
            pathResource += staticPath.images;

        pathResource += `/${req.user.id}`;
        desPath = path.join(__dirname, '../../', pathResource);
        if(!fs.existsSync(desPath)) fs.mkdirSync(desPath, { recursive: true });
        if(req.user.role !== 'guest') cb(null, desPath);
        else cb(new Error('You must be use to upload'), null);
    },
    filename: (req, file, cb) => {
        cb(null, uniqueString() + path.extname(file.originalname));
    }
});

const filter = (req, file, cb) => {
    let originName = path.extname(file.originalname);
    if (originName.match(regexString.audios_type) || originName.match(regexString.image_type))
        cb(null, true);
    else cb(new Error('File format not accepted'), false);
}
const uploader = multer({
    storage: storage,
    limits: {
        fieldSize: uploadConfig.uploadFileSize
    },
    fileFilter: filter
});

module.exports = uploader;