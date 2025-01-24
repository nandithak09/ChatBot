const express = require('express');
const cors = require('cors');
const { initializeIndexes } = require('./indexer');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory index for the documentation (populated by indexer)
let docIndexes = {};

// Function to search the index for a user's query
function searchIndex(platform, query) {
  const queryTokens = query.split(' ').map(token => token.toLowerCase());
  let matches = [];

  queryTokens.forEach(token => {
    const results = docIndexes[platform] && docIndexes[platform][token];
    if (results) {
      matches = [...matches, ...results];
    }
  });

  return matches;
}

// Endpoint to initialize indexes when the server starts
app.listen(3000, async () => {
  console.log('Server running at http://localhost:3000');
  
  // Initialize the documentation indexes on server startup
  docIndexes = await initializeIndexes();
  
  console.log('Indexes initialized.');
});

// Endpoint to handle user queries
app.post('/ask', async (req, res) => {
  const { platform, question } = req.body;

  if (!platform || !question) {
    return res.status(400).json({ message: 'Platform and question are required.' });
  }

  // Validate the platform and check if the index exists
  if (!docIndexes[platform]) {
    return res.status(400).json({ message: 'Invalid platform specified or index not available.' });
  }

  // Search the index for the user's query
  const matches = searchIndex(platform, question);

  if (matches.length === 0) {
    return res.json({ answer: 'Sorry, no relevant information was found.' });
  }

  // Return the relevant information from the documentation
  const answer = matches
    .map(match => `Line ${match.lineIndex + 1}: ${match.line}`)
    .join('\n');

  return res.json({ answer });
});
