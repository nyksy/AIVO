const config = require('./utils/config')
const express = require('express')
const app = express()
const Telegraf = require('telegraf')
const bot = new Telegraf(config.TOKEN)

bot.start((ctx) => ctx.reply('Kvaak.'))
bot.help((ctx) => ctx.reply('Explain the problem, please. Remember, that I am just a duck.'))
bot.on('sticker', (ctx) => ctx.reply('👌👌'))
bot.hears('hello there', (ctx) => ctx.reply('General Kenobi'))
bot.on('message', (ctx) => ctx.reply('kvaak.'))
bot.on('audio', (ctx) => ctx.reply('kvaak.'))
bot.launch()

module.exports = app