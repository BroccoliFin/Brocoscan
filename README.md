# Brocoscan: Solana Blockchain Explorer

This repository provides a starter code and guide for building a customizable Solana blockchain explorer using @solana/web3.js and ReactJS. It's designed for developers to experiment with real-time monitoring of blocks, transactions, accounts, and tokens on Solana, simplifying integration via Shyft API.

Built on top of Create React App with custom overrides. Inspired by Solana ecosystem tools and explorers like Solscan.

## Live Demo
(If deployed, add link here, e.g., [https://brocoscan.vercel.app/](https://brocoscan.vercel.app/))

## Features
- Real-time fetching of Solana data (blocks, transactions, tokens).
- Integration with Shyft API for easy RPC access.
- Support for Devnet and Mainnet configurations.
- Basic UI for navigation and data display.
- Educational setup with video guide.

**Note:** Use Devnet for testing to avoid real costs. Secure your API keys — never commit them to Git!

## Prerequisites
- [VS Code Editor](https://code.visualstudio.com/)
- Node.js v18.12.1 or later (download [here](https://nodejs.org/))
- NPM v8.19.2 or later
- Shyft API Key (get one [here](https://shyft.to/))
- Solana Wallet (e.g., Phantom) for optional interactions

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BroccoliFin/Brocoscan.git

2. Navigate to the project directory:
   ```bash
   cd Brocoscan


3. Install dependencies:
   ```bash  
   npm install

## Environment Variables
Copy .env.example to .env and fill in:  
REACT_APP_API_EP=YOUR_RPC_URL  
REACT_APP_API_KEY=YOUR_SHYFT_API_KEY  
REACT_APP_GA_ID=YOUR_GOOGLE_ANALYTICS_ID  
REACT_APP_RPC_MAINNET=MAINNET_RPC_URL

For Shyft docs, visit [Shyft Documentation](https://docs.shyft.to/).

## Running the App
Start the development server:
   ```bash
   npm run dev
```
Open http://localhost:3000 in your browser.

## Setup Video
Watch the setup and demo: [YouTube Video](https://www.youtube.com/watch?v=example) (replace with actual link).

## Usage
1. Configure your .env with Shyft API key and RPC.
2. Run the app with npm run dev.
3. Explore Solana data: Search addresses, view blocks/transactions.
4. Customize: Add features like wallet connection or advanced filters.

**Warning:** This is experimental; audit for production. Review API usage limits.

## Dependencies
Key libraries (from package.json):  
- Blockchain: @solana/web3.js.  
- UI/State: react, react-dom, react-scripts.  
- Others: Shyft API integration, Google Analytics.  
Full list: See package.json.

## Updating Dependencies
Run npm outdated to check. Update cautiously to avoid breaking changes.

## Contributing
1. Fork the repo.  
2. Create a feature branch: git checkout -b feature/new-feature.  
3. Commit changes: git commit -m 'Add new feature'.  
4. Push: git push origin feature/new-feature.  
5. Open a Pull Request.

## License
MIT License - see [LICENSE](./LICENSE) for details.

## Contact
- GitHub: https://github.com/BroccoliFin  
- X (Twitter): https://x.com/broccolifinance  
- Telegram: https://t.me/mike2money








