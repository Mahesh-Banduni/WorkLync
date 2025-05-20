const cloudinary = require('../configs/cloudinary.config.js');

// Upload a single non-image file (like PDF) to Cloudinary
const uploadFile = async (file) => {
  if (!file || !file.buffer) {
    console.error('File is empty or missing buffer:', file);
    return null;
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // This allows uploading PDFs, docs, etc.
          upload_preset: process.env.CLOUDINARY_FOLDER_NAME,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(file.buffer);
    });

    return result;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};

exports.uploadFile = {uploadFile};