const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller.js');

router.post('/save-notification', notificationController.handleSaveNotification);

module.exports = router;
