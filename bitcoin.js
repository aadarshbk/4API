const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/bitcoin-price', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const bitcoinPrice = response.data.bitcoin.usd;
    res.json({ price: bitcoinPrice });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    res.status(500).json({ error: 'Failed to fetch Bitcoin price' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
