const express = require('express');
const router = express.Router();
const podController = require('../../controllers/pod.controller');

router
    .route('/')
    .get(podController.pod)

module.exports = router;