const cheerio = require('cheerio')
const request = require('request')

//Site to be scraped
const url = 'https://www.ampparit.com/uusimmat'

//Get title and header from the element 'news-item-headline'
request(url, (error, res, html) => {
    if (!error && res.statusCode == 200) {
        const $ = cheerio.load(html)
        
        //Array for the items
        const articles = []
        $('.news-item-headline').each((i, el) => {
            const title = $(el).text().trim()
            const link = $(el).attr('href')
            
            //Model
            const item = {
                title: title,
                link: link,
            }
            
            articles.push(item)
        })
    }
})