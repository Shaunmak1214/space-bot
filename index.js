const app = require('./app');
const Discord = require('discord.js');
let express = require('express');



let server = app.listen(process.env.PORT || 3000, () => {
    logger.info(`Listening to port ${process.env.PORT || 3000}`);
  });