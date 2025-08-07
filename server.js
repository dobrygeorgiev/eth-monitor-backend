require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

BigInt.prototype.toJSON = function() { return this.toString(); };


const safeStringify = (obj) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
};

app.use(cors());
app.use(express.json());

const ONE_INCH_API_KEY = process.env.API_1INCH_KEY;

// Swap Endpoint
app.post('/swap', async (req, res) => {
  try {
    const { chainId, src, dst, amount, fromAddress } = req.body;

    // Validate input
    if (!chainId || !src || !dst || !amount || !fromAddress) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // Request swap data from 1inch API
    const response = await axios.get(
      `https://api.1inch.dev/swap/v5.2/${chainId}/swap`,
      {
        params: { 
          src, 
          dst, 
          amount, 
          from: fromAddress, 
          slippage: 5,
          disableEstimate: true
        },
        headers: { 
          'Authorization': `Bearer ${ONE_INCH_API_KEY}`,
          'Accept': 'application/json',
        }
      }
    );

    // Return simplified transaction data
    res.json({
      to: response.data.tx.to,
      data: response.data.tx.data,
      value: response.data.tx.value ? response.data.tx.value.toString() : '0',
    });

  } catch (error) {
    console.error('1inch API Error:', {
      message: error.message,
      response: error.response?.data,
    });
    res.status(500).json({ 
      error: 'Swap failed (check server logs)',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => console.log(`1inch Proxy running on http://localhost:${PORT}`));