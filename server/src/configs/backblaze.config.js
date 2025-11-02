const B2 = require('backblaze-b2');
require('dotenv').config();

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const authorizeB2 = async () => {
  try {
    await b2.authorize();
    //console.log('Backblaze B2 authorized successfully.');
  } catch (err) {
    console.error('Backblaze B2 authorization failed:', err.message);
  }
};

module.exports = { b2, authorizeB2 };
