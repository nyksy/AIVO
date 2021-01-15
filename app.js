const config = require('./utils/config')
const express = require('express')
const Discord = require('discord.js')
const scraper = require('./utils/scraper')
const cron = require('node-cron')

const app = express()

//Discord client
const client = new Discord.Client()

//Login & timed message
cron.schedule('0 15 * * *', () => {
  client.login(config.TOKEN).then(() => {
    console.log(`Logged in as ${client.user.tag}`)

    //Sending the msg to a certain channel based on id
    const channel = client.channels.cache.find(ch => ch.id === config.CH)

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = day + "/" + month + "/"  + year;
    //If found
    if (channel) {
      const articles = scraper.articles //get articles from scraper.js
      channel.send(
        `**Aamujysäys ${newdate} by aivo**

1. ${articles[0].title} <${articles[0].link}>

2. ${articles[1].title} <${articles[1].link}>

3. ${articles[2].title} <${articles[2].link}>

4. ${articles[3].title} <${articles[3].link}>

5. ${articles[4].title} <${articles[4].link}>

>uutista :D

*Kiitos näkemiin*`
      )
      console.log(`MSG: sent at ${Date()}`)
    } else {
      console.log('CH: not found')
    }
  })
}, {
  scheduled: true,
  timezone: 'Europe/Helsinki'
})

/*
client.on('message', msg => {
  if (msg.content === 'ping') {

    //get articles from scraper.js
    var articles = scraper.articles
    var date = new Date()
    console.log(articles[0].title)
    msg.channel.send(
      `**Aamujysäys ${Date()} by aivo**

1. ${articles[0].title} <${articles[0].link}>

2. ${articles[1].title} <${articles[1].link}>

3. ${articles[2].title} <${articles[2].link}>

4. ${articles[3].title} <${articles[3].link}>

5. ${articles[4].title} <${articles[4].link}>

>uutista :D

*Kiitos näkemiin*`
    )
  }
})
*/
module.exports = app