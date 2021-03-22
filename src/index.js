const app = require('./app');
/* const config = require('./config/config'); */
const logger = require('./config/logger');
const Discord = require('discord.js');
const axios = require('axios');
let express = require('express');
const { wakeDyno } = require('heroku-keep-awake');

const tempPORT = process.env.PORT || 5000;
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const DYNO_URL = 'http://space-bot-2021.herokuapp.com/';
const opts = {
  interval: 15,
  logging: false,
  stopTimes: { start: '00:00', end: '06:00' }
}

server = app.listen(tempPORT, () => {
  wakeDyno(DYNO_URL, opts);
  logger.info(`Listening to port ${tempPORT}`);
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

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

    const apiEndPoint = `http://space-bot-2021.herokuapp.com/v1/upcomingLaunches`

    axios
      .get(apiEndPoint)
      .then((res) => {

        res.status == 200 ? message.channel.send("Positive Data, Restructuring ... ") : message.channel.send("Data NEGATIVE")
/*         console.log(res.data.mission_name)
        message.channel.send(res.data.mission_name) */
        const upcomingLaunch = new Discord.MessageEmbed()
        .setColor('#7f32a8')
        .setTitle('Upcoming Launches :rocket:')
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

  }else if(message.content.startsWith(`${prefix}pod`)){

    const apiEndPoint = `http://space-bot-2021.herokuapp.com/v1/pod`

    axios
      .get(apiEndPoint)
      .then((res) => {

        console.log()

        res.status == 200 ? message.channel.send("Positive Data, Restructuring ... ") : message.channel.send("Data NEGATIVE")
        const pod = new Discord.MessageEmbed()
        .setColor('#7f32a8')
        .setTitle('Picture of The Day by NASA :pager:')
        .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
        .setDescription(`Gravitational Lensing is super COOL [check it out](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiE7pWvsrzvAhVQzjgGHd9xDoMQFjAHegQIDxAD&url=https%3A%2F%2Fwww.science.org.au%2Fcurious%2Fspace-time%2Fgravitational-lensing%23%3A~%3Atext%3DAs%2520the%2520light%2520emitted%2520by%2CThis%2520is%2520called%2520gravitational%2520lensing.&usg=AOvVaw1PD03ubrVhO27377ESR6Bq)`)
        .addFields(
  
            { name: '\u200B', value: '\u200B' },
            { name: 'Image Title:', value: `${res.data.title}` },
            { name: 'Captured date: ', value: `${res.data.date}` },
            /* { name: 'Explanation: ', value: `${res.data.explanation}` }, */
            { name: '\u200B', value: '\u200B' },
  
        )
        .setImage(`${res.data.url}`)
        .setTimestamp()
        .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');
  
        message.channel.send(pod);

      }) 
      .catch(err => {

        message.channel.send(`Error getting datas from shit servers ... servers error: ${err}`)

      })

  }else if(message.content.startsWith(`${prefix}news`)){

    const apiEndPoint = `http://space-bot-2021.herokuapp.com/v1/news`

    axios
      .get(apiEndPoint)
      .then((res) => {

        console.log(res.data)

        if(res.data.abstract.length > 1024){

          var truncatedAbstract = `${res.data.abstract.substring(0, 900)} ... [read more](${res.data.url})`

        }else{

          var truncatedAbstract = res.data.abstract

        }

        var imgUrl = `https:${res.data.thumbnail_retina}`

         res.status == 200 ? message.channel.send("Positive Data, Restructuring ... ") : message.channel.send("Data NEGATIVE")
        const news = new Discord.MessageEmbed()
        .setColor('#7f32a8')
        .setTitle('News of The Day :newspaper:')
        .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
        .setDescription(`Gravitational Lensing is super COOL [check it out](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiE7pWvsrzvAhVQzjgGHd9xDoMQFjAHegQIDxAD&url=https%3A%2F%2Fwww.science.org.au%2Fcurious%2Fspace-time%2Fgravitational-lensing%23%3A~%3Atext%3DAs%2520the%2520light%2520emitted%2520by%2CThis%2520is%2520called%2520gravitational%2520lensing.&usg=AOvVaw1PD03ubrVhO27377ESR6Bq)`)
        .addFields(
  
            { name: '\u200B', value: '\u200B' },
            { name: 'News:', value: `${res.data.name} : ${res.data.news_id}` },
            { name: 'Publication Date: ', value: `${res.data.publication}` },
            { name: 'Details:', value: `${truncatedAbstract}` },
            { name: 'Mission', value: `${res.data.mission}` },
            { name: '\u200B', value: '\u200B' },
            { name: 'Full Content at: ', value: `${res.data.url}` },
            { name: '\u200B', value: '\u200B' },
  
        )
        .setImage(`${imgUrl}`)
        /* console.log(`http:${res.data.thumbnail}`) */
        .setTimestamp()
        .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');
  
        console.log(`${res.data.thumbnail_retina}`)

        message.channel.send(news);

      }) 
      .catch(err => {

        message.channel.send(`Error getting datas from shit servers ... servers error: ${err}`)

      })

  }
  
});

client.login(process.env.BOTTOKEN);