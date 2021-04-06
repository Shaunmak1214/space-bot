const app = require('./app');
/* const config = require('./config/config'); */
let mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./config/logger');
const Discord = require('discord.js');
const axios = require('axios');
let express = require('express');
const cron = require('node-cron');
const { wakeDyno } = require('heroku-keep-awake');
const tempPORT = process.env.PORT || 5000;
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const DYNO_URL = 'http://space-bot-2021.herokuapp.com/v1/upcomingLaunches';
const opts = {
  interval: 15,
  logging: false,
  stopTimes: { start: '00:00', end: '01:00' }
}
const quotesAPI = 'https://quotescrapper.herokuapp.com/random'

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log("Connected to the Database. Yay!");
})
.catch(err => {
  console.log(err);
});

server = app.listen(tempPORT, () => {
  wakeDyno(DYNO_URL, opts);
  logger.info(`Listening to port ${tempPORT}`);
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

let newsIdNow;
// Schedule tasks to be run on the server.
// cron.schedule('*/5 * * * *', () => {
//   console.log('running a task every 5 minutes');
//   axios
//   .get('http://space-bot-2021.herokuapp.com/v1/snanews')
//   .then((res) => {
//     if(res.data[0].id != newsIdNow){
//       console.log('latest news detected')
//       newsIdNow = res.data[0].id
//       const latestNews = new Discord.MessageEmbed()
//       .setColor('#7f32a8')
//       .setTitle('Latest News :newspaper:')
//       .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
//       .setDescription(`Gravitational Lensing is super COOL [check it out](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiE7pWvsrzvAhVQzjgGHd9xDoMQFjAHegQIDxAD&url=https%3A%2F%2Fwww.science.org.au%2Fcurious%2Fspace-time%2Fgravitational-lensing%23%3A~%3Atext%3DAs%2520the%2520light%2520emitted%2520by%2CThis%2520is%2520called%2520gravitational%2520lensing.&usg=AOvVaw1PD03ubrVhO27377ESR6Bq)`)
//       .setTimestamp()
//       .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');

//       if(res.data[0].summary.length > 1024){

//         var truncatedAbstract = `${res.data[0].summary.substring(0, 900)} ... [read more](${res.data[0].url})`

//       }else{

//         var truncatedAbstract = res.data[0].summary

//       }

//       latestNews.addFields( 
//         { name: '\u200B', value: '\u200B' },
//         { name: 'Name', value: `${res.data[0].title}` },
//         { name: 'url', value: `${res.data[0].url}` },
//         { name: 'Publication', value: `${res.data[0].publication}` },
//         { name: 'Abstract', value: `${truncatedAbstract}` },
//       )
      
//       .setImage(`${res.data[0].imageUrl}`)

//       /* message.channel.send(latestNews); */
//       client.channels.cache.forEach(channel => {
//         console.log(channel)
//         if(channel.name === 'general') channel.send(latestNews).catch(console.error)
//       })
//     }
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// });

const getQuote = () => {
  return new Promise(quote => {
    axios
    .get(quotesAPI)
    .then((res) => {
      quote(res.data.quote)
    })
    .catch((err) =>{
      console.log(err)
      quote('Do not go gentle into that goodnight')
    })
  });
}

client.once('ready', () => {

  console.log(`Ready!`);

});

client.on("ready", () =>{

  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({

      status: "idle",  // You can show online, idle... Do not disturb is dnd
      game: {
          name: "!help",  // The message shown
          type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING,
      }

  });

  client.user.setActivity("HUMANS ARE CRIMES"); 

});

client.on('messageReactionAdd', async (reaction, user) => {

  console.log(reaction.message.content)

})

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
      .then(async (res) => {

        const quote = await getQuote();
        res.status == 200 ? message.channel.send("Positive Data, Restructuring ... ") : message.channel.send("Data NEGATIVE")
        const upcomingLaunch = new Discord.MessageEmbed()
        .setColor('#7f32a8')
        .setTitle('Upcoming Launches :rocket:')
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
        .setFooter(`Sent from space-bot ~ "${quote}"`, 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');
  
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

        if(res.data.explanation.length > 1024){

          var truncatedExplanation = `${res.data.explanation.substring(0, 900)} ... [read more](${res.data.url})`

        }else{

          var truncatedExplanation = res.data.explanation

        }

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
            { name: 'Explanation: ', value: `${truncatedExplanation}` },
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

  }else if(message.content.startsWith(`${prefix}latestnews`)){

    const apiEndPoint = `http://space-bot-2021.herokuapp.com/v1/news/latest`

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

  }else if(message.content.startsWith(`${prefix}allnews`)){

    const apiEndPoint = `http://space-bot-2021.herokuapp.com/v1/news/`

    axios
      .get(apiEndPoint)
      .then((res) => {

        /* console.log(res.data) */

        res.status == 200 ? message.channel.send("Positive Data, Give me a min ~.~ ") : message.channel.send("Data NEGATIVE")
        const news = new Discord.MessageEmbed()
        .setColor('#7f32a8')
        .setTitle('All News of The Day :newspaper:')
        .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
        .setDescription(`Gravitational Lensing is super COOL [check it out](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiE7pWvsrzvAhVQzjgGHd9xDoMQFjAHegQIDxAD&url=https%3A%2F%2Fwww.science.org.au%2Fcurious%2Fspace-time%2Fgravitational-lensing%23%3A~%3Atext%3DAs%2520the%2520light%2520emitted%2520by%2CThis%2520is%2520called%2520gravitational%2520lensing.&usg=AOvVaw1PD03ubrVhO27377ESR6Bq)`)
        .setTimestamp()
        .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');
  
        for(var i=0; i<5; i++){

          if(res.data[i].abstract.length > 1024){

            var truncatedAbstract = `${res.data[i].abstract.substring(0, 900)} ... [read more](${res.data[i].url})`
  
          }else{
  
            var truncatedAbstract = res.data[i].abstract
  
          }

          news.addFields( 
            { name: '\u200B', value: '\u200B' },
            { name: 'Name', value: `${res.data[i].name}` },
            { name: 'url', value: `${res.data[i].url}` },
            { name: 'Publication', value: `${res.data[i].publication}` },
            { name: 'Abstract', value: `${truncatedAbstract}` },
            { name: '\u200B', value: '-------------------------------------------------------------------------------------' },
          )
        }
        
        message.channel.send(news);
        /* message.react('◀️');
        message.react('◀️');  */

      }) 
      .catch(err => {

        message.channel.send(`Error getting datas from shit servers ... servers error: ${err}`)

      })

  }else if(message.content.startsWith(`${prefix}subscribe`)){

    const apiEndPoint = `http://space-bot-2021.herokuapp.com/v1/subscribe/`
    let discord_user_id = message.author.id;
    let name = message.author.username;

    let newSubscribe = {
      discord_user_id: discord_user_id
    }

    axios
      .post(apiEndPoint, newSubscribe)
      .then((res) =>{

        let subscribed = new Discord.MessageEmbed()

        if(res.status == 200)

          if(res.data == "1"){
            message.channel.send(`${name} is already a subscribed user`)
            return
          }

          subscribed
            .setColor('#7f32a8')
            .setTitle('New Subscriber !!!')
            .setAuthor('Shaun Mak', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
            .setDescription(`Gravitational Lensing is super COOL [check it out](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiE7pWvsrzvAhVQzjgGHd9xDoMQFjAHegQIDxAD&url=https%3A%2F%2Fwww.science.org.au%2Fcurious%2Fspace-time%2Fgravitational-lensing%23%3A~%3Atext%3DAs%2520the%2520light%2520emitted%2520by%2CThis%2520is%2520called%2520gravitational%2520lensing.&usg=AOvVaw1PD03ubrVhO27377ESR6Bq)`)
            .setTimestamp()
            .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4')
            .addFields(
    
              { name: '\u200B', value: '\u200B' },
              { name: `${name}  (${discord_user_id}) has subscribed!`, value: `\u200B`},
    
            )
            .setImage(message.author.avatarURL())
            /* console.log(`http:${res.data.thumbnail}`) */
            .setTimestamp()
            .setFooter('Sent from space-bot ~ "Do not go gentle into that goodnight"', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4', 'https://avatars.githubusercontent.com/u/60981304?s=400&u=c6a2076fe4ad7ef03a71b1538cc4a8c0aa865376&v=4');
      
            message.channel.send(subscribed)

      })
      .catch(err => {

        message.channel.send(`Error getting datas from shit servers ... servers error: ${err}`)

      })

  }
  
});

client.login(process.env.BOTTOKEN);