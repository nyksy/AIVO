const cheerio = require('cheerio')
const request = require('request')

//Sites to be scraped
const newsUrl = 'https://www.ampparit.com/uusimmat'
const stockUrl = 'https://www.kauppalehti.fi/'

function getArticles() {

    //Array for the items
    const articles = []

    //Get title and header from the element 'news-item-headline'
    request(newsUrl, (error, res, html) => {
        if (!error && res.statusCode == 200) {
            const $ = cheerio.load(html)

            //getting the headlines based on the className
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
    return articles
}

function getStonks() {

    //array for the objects
    const stonks = []

    //Get stonks
    request(stockUrl, (error, res, html) => {
        if (!error && res.statusCode == 200) {
            const $ = cheerio.load(html)
            
            //getting stock-ticker based on classNam
            $('.sumw9r-2').each((i, el) => {

                const stonk = $(el).text().trim()
                
                stonks.push(stonk)
            })
        }
    })
    return stonks
}

//Exports
module.exports = { articles: getArticles(), stonks: getStonks() }