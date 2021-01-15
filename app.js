const config = require('./utils/config')
const express = require('express')
const Discord = require('discord.js')
const scraper = require('./utils/scraper')
const cron = require('node-cron')

const app = express()

//Discord client
const client = new Discord.Client();

//Login & timed message
cron.schedule('* * * * *', () => {
  client.login(config.TOKEN)

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
  })
  var channel = client.channels.cache.find(ch => ch.id === config.CH)
  if (channel) {
    channel.send('morgons')
  }
})


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

module.exports = app