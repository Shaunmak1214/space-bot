const express = require('express');
const router = express.Router();
const { subscriptionController } = require('../../controllers')

router
    .route('/')
    .post(subscriptionController.subscribe)

router
    .route('/all')
    .get(subscriptionController.findallSubscribers)

module.exports = router;