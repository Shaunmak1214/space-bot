const express = require('express');
const router = express.Router();
const snaController = require('../../controllers/sna.controller');

router
    .route('/:start/:limit')
    .get(snaController.snanewsStartAndLimit)

router
    .route('/')
    .get(snaController.snanews)

module.exports = router;