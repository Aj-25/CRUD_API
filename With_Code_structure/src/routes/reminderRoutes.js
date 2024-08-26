const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/remainderController');
const reminderValidator = require('../utils/validator');

router.post('/send', reminderValidator.validateReminder, reminderController.sendReminder);
router.get('/credits/:userId', reminderController.getRemainingCredits);


module.exports = router;
