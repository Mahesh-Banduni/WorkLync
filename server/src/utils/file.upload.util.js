const cloudinary = require('../configs/cloudinary.config.js');

const uploadFile = async (file, folder = process.env.CLOUDINARY_FOLDER_NAME || 'hrms') => {
  if (!file || !file.buffer) {
    console.error('File is empty or missing buffer:', file);
    return null;
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder, // Use the folder param for organization
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};

module.exports = { uploadFile };
