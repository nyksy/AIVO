const config = require('./utils/config')
const express = require('express')
const Discord = require('discord.js')
const scraper = require('./utils/scraper')
const cron = require('node-cron')

const app = express()

//Discord client
const client = new Discord.Client()


//creates embedded message for bot to send
//returns MessageEmbed-object
function createMessage() {

	const articles = scraper.articles
	const stonks = scraper.stonks
	const corona = scraper.vaccinePercentage

	//embed-object
	const timedMessage = new Discord.MessageEmbed()
	//highlight-color
		.setColor('#f78c00')
		.setTitle('Aamujysäys v2.0')
		.attachFiles(['./imurisaatana.png'])
		.setURL('https://hs.mediadelivery.fi/img/1920/efd25ff2005748b29a1fbb1cdbfc7a13.jpg')
		.setAuthor('ae vot', 'attachment://imurisaatana.png', 'https://hs.mediadelivery.fi/img/1920/efd25ff2005748b29a1fbb1cdbfc7a13.jpg')
		.setDescription('your daily morning spam')
		.setThumbnail('attachment://imurisaatana.png')
		.setTimestamp()
		.setFooter('> uutista 8D')
	//whitespace before articles
		.addField('\u200B', 'Uutista')


	//adding 5 articles
	for (var i = 0; i < 5; i++) {
		timedMessage
			.addField(articles[i].title, articles[i].link)
	}

	//adding stock-ticker
	//whitespace
	timedMessage
		.addField('\u200B', 'Stonks')
	
	stonks.forEach((stonk) => {
		timedMessage.addField(stonk.title, stonk.data, true)
	})
  

	//covid-specs
	timedMessage
		.addField('\u200B', 'Corona 0,33l')
		.addField('Aikuisista rokotettu', corona[0])

	return timedMessage
}

//Login & timed message
cron.schedule('0 9 * * *', () => {
	client.login(config.TOKEN).then(() => {
		//logging
		console.log(`Logged in as ${client.user.tag}`)

		//fetching a channel and sending embedded message
		client.channels.fetch(config.CH, true, true)
			.then(ch => ch.send(createMessage())
			).catch((error) => {
				console.log(error)
			})
	})
}, {
	scheduled: true,
	timezone: 'Europe/Helsinki'
})


client.on('message', msg => {
	if (msg.content === 'pepsi') {
		msg.channel.send(createMessage())
	}
})
client.login(config.TOKEN)


module.exports = app