const { regexString } = require('../../config/index');
const path = require('path');
const uniqueString = require('unique-string')

module.exports = (multerFile) => {
    let reqFile = {};
    reqFile.name = multerFile.originalname;

    if (regexString.audiosType.test(multerFile.originalname))
        reqFile.type = 'audio'
    else if (regexString.imageType.test(multerFile.originalname))
        reqFile.type = 'image'

    reqFile.extname = path.extname(multerFile.originalname);
    reqFile.storagedName = uniqueString() + reqFile.extname;

    return { reqFile };
}