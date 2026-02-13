const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// TikTok video download endpoint
app.get('/api/download', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const apiUrl = `https://apizell.web.id/download/tiktok?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching TikTok video:', error);
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
