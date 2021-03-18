const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const Discord = require('discord.js');
const axios = require('axios');
let express = require('express');

server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const client = new Discord.Client();
const prefix = process.env.PREFIX;

client.once('ready', () => {

  console.log(`Ready!`);

});

client.on("ready", () =>{

  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({

      status: "idle",  // You can show online, idle... Do not disturb is dnd
      game: {
          name: "!help",  // The message shown
          type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
      }

  });

  client.user.setActivity("HUMANS ARE CRIMES"); 

});

client.on('message', async message => {

  var now = new Date();

  console.log(message.content);

  if(message.content.startsWith(`${prefix}help`)){

      message.channel.send(`Time now is ${now}`);

      const helpEmbed = new Discord.MessageEmbed()
      .setColor('#ff008b')
      .setTitle('Help Window')
      .setURL('https://discord.js.org/')
      .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
      .setDescription('cal-bot is the bot to schedule your futures')
      .setThumbnail('https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
      .addFields(

          { name: '\u200B', value: '\u200B' },
          { name: 'Basic Schedule', value: '~schedule [meeting-name] [start-date] [start-time] [end-date] [end-time]' },
          { name: 'Scheduling Example: ', value: '~schedule trymeet ~ 2021-01-30 20:00:00 ~ 2021-01-31 23:00:00' },
          { name: '\u200B', value: '\u200B' },

      )
      .setImage('https://d35fo82fjcw0y8.cloudfront.net/2020/02/05081844/technical-documentation-post-header1.jpg')
      .setTimestamp()
      .setFooter('Sent from cal-bot', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');

      message.channel.send(helpEmbed);

  }else if(message.content.startsWith(`${prefix}upcoming`)){

    const apiEndPoint = `http://localhost:3000/v1/upcomingLaunches`

    axios
      .get(apiEndPoint)
      .then((res) => {

        res.status == 200 ? message.channel.send("Positive Data, Restructuring ... ") : message.channel.send("Data NEGATIVE")
/*         console.log(res.data.mission_name)
        message.channel.send(res.data.mission_name) */
        const upcomingLaunch = new Discord.MessageEmbed()
        .setColor('#7f32a8')
        .setTitle('Upcoming Launches')
        /* .setURL('https://discord.js.org/') */
        .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
        .setDescription(`Don't you think blackholes sucking each other is hella interesting?`)
        /* .setThumbnail('https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4') */
        .addFields(
  
            { name: '\u200B', value: '\u200B' },
            { name: 'Flight Number:', value: `${res.data.flight_number}` },
            { name: 'Mission Name: ', value: `${res.data.mission_name}` },
            { name: 'Rocket Name: ', value: `${res.data.rocket.rocket_name}` },
            { name: 'Launch Site: ', value: `${res.data.launch_site.site_name_long}` },
            { name: 'Details: ', value: `${res.data.details}` },
            { name: 'Video Link', value: `${res.data.links.video_link}` },
            { name: '\u200B', value: '\u200B' },
  
        )
        .setImage('https://cdn.mos.cms.futurecdn.net/4Vv43ekp8QVwL95So7Z8sb-1024-80.jpg.webp')
        .setTimestamp()
        .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');
  
        message.channel.send(upcomingLaunch);

      }) 
      .catch(err => {

        message.channel.send(`Error getting datas from shit servers ... servers error: ${err}`)

      })

  }
  
});

client.login(process.env.BOTTOKEN);