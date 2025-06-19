const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function savePushSubscription({ userId, endpoint, keys }) {
  if (!userId || !endpoint || !keys?.auth || !keys?.p256dh) {
    throw new Error('Missing subscription fields');
  }

  const subscription = await prisma.webPushSubscription.upsert({
    where: { endpoint },
    update: {
      auth: keys.auth,
      p256dh: keys.p256dh,
    },
    create: {
      userId,
      endpoint,
      auth: keys.auth,
      p256dh: keys.p256dh,
    },
  });

  return subscription;
}

module.exports = {
  savePushSubscription,
};
