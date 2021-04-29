const cheerio = require('cheerio')
const request = require('request')

//Sites to be scraped
const newsUrl = 'https://www.ampparit.com/uusimmat'
const stockUrl = 'https://www.kauppalehti.fi/'
const keslaUrl = 'https://www.nordnet.fi/markkinakatsaus/osakekurssit/16100812-kesla-a'
const coronaUrl = 'https://www.thl.fi/episeuranta/rokotukset/koronarokotusten_edistyminen.html'


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

    //Kesla stonk
    request(keslaUrl, (error, res, html) => {
        if (!error && res.statusCode == 200) {
            const $ = cheerio.load(html)

            //getting stock-ticker based on className
            const stonk = $('.OjNHA').first()
            stonks.push(stonk.text().trim())
        }
    })
    return stonks
}


function getCorona() {

    
    const vaccinePercentage = [];

    //Get title and header from the element
    request(coronaUrl, (error, res, html) => {
        if (!error && res.statusCode == 200) {
            const $ = cheerio.load(html)

            //getting the headlines based on the className
            var percentage = $('div.container > ul > li:contains(Ajantasainen rokotuskattavuus)').first()

            //parsing the string, removing whitespace
            var edit = percentage.text().replace(/ /g, '')

            //extracting the percentage with regex
            const regex = "\\d+(?:,\\d+)?%"
            var matches = edit.match(regex);

            vaccinePercentage.push(matches[0])
        }
    })
    return vaccinePercentage
}

//Exports
module.exports = { articles: getArticles(), stonks: getStonks(), vaccinePercentage: getCorona() }