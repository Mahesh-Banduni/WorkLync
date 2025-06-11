const fs = require('fs');
const path = require('path');
const { b2, authorizeB2 } = require('../configs/backblaze.config.js');

const uploadFileToB2 = async (file) => {
  await authorizeB2();

  const uniqueFileName = `${Date.now()}-${file.originalname}`;
  const mimeType = file.mimetype;

  const uploadUrlResponse = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID,
  });

  const uploadResponse = await b2.uploadFile({
    uploadUrl: uploadUrlResponse.data.uploadUrl,
    uploadAuthToken: uploadUrlResponse.data.authorizationToken,
    fileName: `documents/${uniqueFileName}`,
    data: file.buffer, // Comes from memoryStorage
    contentType: mimeType,
  });

  return {
    fileUrl: `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/documents/${uniqueFileName}`,
  };
};

const getPrivateDownloadUrl = async (fileName, validDurationInSeconds = 604800) => {
  console.log(fileName)
  await authorizeB2();

  const { data: { authorizationToken } } = await b2.getDownloadAuthorization({
    bucketId: process.env.B2_BUCKET_ID,
    fileNamePrefix: fileName,
    validDurationInSeconds,
  });

  // Construct the signed URL
  const downloadUrl = `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}?Authorization=${authorizationToken}`;

  return downloadUrl;
};

module.exports = { uploadFileToB2, getPrivateDownloadUrl };
