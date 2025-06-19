const webpush =require('web-push');
const dotenv = require('dotenv');
dotenv.config();

const keys = webpush.generateVAPIDKeys();

console.log('VAPID Public Key:', keys.publicKey);
console.log('VAPID Private Key:', keys.privateKey);

process.env.VAPID_PUBLIC_KEY = keys.publicKey;
process.env.VAPID_PRIVATE_KEY = keys.privateKey;