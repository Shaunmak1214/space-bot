const express = require('express');
const router = express.Router();
const Discord = require('discord.js');
const launchController = require('../../controllers/launch.controller');

router
    .route('/')
    .get(launchController.upcomingLaunches)

module.exports = router;