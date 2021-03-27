const express = require('express');
const router = express.Router();
const hubblesiteController = require('../../controllers/hubblesite.controller')

router
    .route('/')
    .get(hubblesiteController.hubblenews)

router
    .route('/latest')
    .get(hubblesiteController.hubblenewsLatest)

module.exports = router;