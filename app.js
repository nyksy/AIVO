const config = require('./utils/config')
const express = require('express')
const Discord = require('discord')
const app = express()

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(config.TOKEN);


module.exports = app