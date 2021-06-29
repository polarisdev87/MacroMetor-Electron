const Scraper = require('youtube-caption-scraper');
const scraper = new Scraper();
const x = scraper.scrap('https://youtu.be/KVb9nVpptuI', 'en', 'ttml');
x.then(stuff => {
  console.log(stuff)
})