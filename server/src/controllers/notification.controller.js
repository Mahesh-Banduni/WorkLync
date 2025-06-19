const { savePushSubscription } = require('../services/notfication.service.js');

const handleSaveNotification = async (req, res, next) =>  {
  try {
    const { userId, endpoint, keys } = req.body;

    const result = await savePushSubscription({ userId, endpoint, keys });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleSaveNotification,
};
