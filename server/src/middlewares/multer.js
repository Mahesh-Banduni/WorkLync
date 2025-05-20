const multer = require('multer');
const path = require('path');

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

const uploadDocument = multer({
  limits: { fileSize: FILE_SIZE_LIMIT },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.pdf', '.doc', '.docx', '.txt'].includes(ext)) {
      return cb(new Error('Only document files (.pdf, .doc, .docx, .txt) are allowed!'));
    }
    cb(null, true);
  },
}).single('document');

module.exports = {
  uploadDocument,
};
