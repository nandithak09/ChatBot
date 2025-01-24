const axios = require('axios');
const cheerio = require('cheerio');

// Base URLs of documentation
const DOC_URLS = {
  Segment: 'https://segment.com/docs/?ref=nav',
  mParticle: 'https://docs.mparticle.com/',
  Lytics: 'https://docs.lytics.com/',
  Zeotap: 'https://docs.zeotap.com/home/en-us/'
};

// Function to create an index from the documentation content
function createIndex(content) {
  const index = {};
  content.split('\n').forEach((line, lineIndex) => {
    const tokens = line.split(' ').map(word => word.toLowerCase());
    tokens.forEach(token => {
      if (!index[token]) index[token] = [];
      index[token].push({ line, lineIndex });
    });
  });
  return index;
}

async function fetchDocumentation(url) {
    try {
      const { data } = await axios.get(url);
      console.log(`Fetched data from: ${url}`);
  
      if (!data || data.trim().length === 0) {
        console.log(`No content found for: ${url}`);
        return null;
      }
  
      const $ = cheerio.load(data);
      let content = [];
  
      // Modify selectors to target specific parts of the Lytics documentation
      $('h1, h2, h3, p').each((i, el) => {
        // You can refine this further by filtering out irrelevant elements
        content.push($(el).text().trim());
      });
  
      if (content.length === 0) {
        console.log(`No content extracted for: ${url}`);
        return null;
      }
  
      // Join the extracted content into a single string
      return content.join('\n');
    } catch (error) {
      console.error('Error fetching documentation:', error);
      return null;
    }
  }
  

// Function to initialize the index by fetching documentation
async function initializeIndexes() {
    const docIndexes = {};
    
    // Loop through the documentation URLs and fetch & index content
    for (const platform in DOC_URLS) {
      console.log(`Initializing index for ${platform}...`);
      const docContent = await fetchDocumentation(DOC_URLS[platform]);
      
      if (docContent) {
        docIndexes[platform] = createIndex(docContent);
        console.log(`Index created for ${platform}`);
      } else {
        console.log(`Failed to create index for ${platform}`);
      }
    }
  
    return docIndexes;
  }
  

// Export the index initialization function
module.exports = {
  initializeIndexes
};
