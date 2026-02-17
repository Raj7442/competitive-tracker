const axios = require('axios');
const cheerio = require('cheerio');

const scrapeContent = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    $('script, style, nav, footer, header').remove();
    
    const text = $('body').text()
      .replace(/\s+/g, ' ')
      .trim();
    
    return text.substring(0, 10000);
  } catch (error) {
    throw new Error(`Failed to scrape ${url}: ${error.message}`);
  }
};

module.exports = { scrapeContent };
