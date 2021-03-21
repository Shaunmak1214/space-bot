const express = require('express');
const router = express.Router();
const snaController = require('../../controllers/sna.controller');

router
    .route('/')
    .get(snaController.snanews)

module.exports = router;