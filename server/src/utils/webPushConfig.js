const webpush = require('web-push');
import dotenv from 'dotenv';

dotenv.config();

webpush.setVapidDetails(
  'mailto:admin@yourdomain.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function sendNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    console.error('Push failed:', error);
  }
}

