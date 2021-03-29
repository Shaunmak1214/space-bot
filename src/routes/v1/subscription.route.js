const express = require('express');
const router = express.Router();
const { subscriptionController } = require('../../controllers')

router
    .route('/')
    .post(subscriptionController.subscribe)

module.exports = router;