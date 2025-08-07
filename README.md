# Ethereum Monitor Backend

This backend service provides an communication between the eth-monitor frontend application and the 1inch aggregation API. It handles secure API key management and simplifies swap transactions on the Ethereum blockchain.


## Features

- Secure proxy for 1inch API requests
- Handles swap transaction construction
- Manages API keys securely via environment variables
- Supports Ethereum mainnet swaps
- Provides error handling and logging


## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- 1inch API key (from portal.1inch.dev)
- MetaMask or other Web3 provider


1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory
4. Add your 1inch API key:
   `API_1INCH_KEY=your_api_key_here`

## Configuration

Environment variables:
- PORT: Server port
- REACT_APP_1INCH_API_KEY: Your 1inch API key

Supported networks:
- Ethereum Mainnet (chainId: 1)

## API Endpoints

POST /swap
Parameters:
- chainId: Network ID (1 for mainnet)
- src: Source token address
- dst: Destination token address
- amount: Amount to swap (in wei)
- fromAddress: User wallet address


## Development

To start the development server:
`node server.js`

The server will run on http://localhost:{port}


## Error Handling

The API returns JSON responses with:
- Success: Transaction data (to, data, value)
- Error: Object with error message and details

Common errors include:
- Invalid API key
- Unsupported network
- Insufficient liquidity