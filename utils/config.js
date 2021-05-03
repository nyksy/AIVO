require('dotenv').config()

let PORT = process.env.PORT
let TOKEN = process.env.TOKEN
let GUILD = process.env.GUILD
let CH = process.env.CH

module.exports = {
	PORT,
	TOKEN,
	GUILD,
	CH,
}