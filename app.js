const config = require('./utils/config')
const express = require('express')
const Discord = require('discord.js')
const scraper = require('./utils/scraper')

const app = express()

//Discord client
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    var articles = scraper.articles
    console.log(articles[0].title)
    msg.reply(articles[0].title);
  }
});

client.login(config.TOKEN);

module.exports = app