const multer = require('multer');

// In-memory storage — files won't be saved on disk
const storage = multer.memoryStorage();

const uploadDocument = multer({ storage });

module.exports = { uploadDocument };
