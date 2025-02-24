# TruthChain - Hardhat Project

## 📌 Overview
TruthChain is a **decentralized truth verification system** built on Ethereum-compatible blockchains. This project utilizes **Hardhat** for smart contract development, testing, and deployment.

## 🚀 Features
- ✅ Smart contract deployment & testing using Hardhat.
- ✅ Multi-network support (Ethereum, Polygon, Testnets).
- ✅ Etherscan contract verification.
- ✅ Secure environment variables for RPC and private keys.

## ⚙️ Setup & Installation
1️⃣ Clone the repository:
```
git clone https://github.com/Holymir/truthchain.git
cd truthchain
```
2️⃣ Install dependencies:
```
npm install
```
3️⃣ Create a `.env` file:
```
HOLESKY_RPC_URL=https://eth-holesky.alchemyapi.io/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY
POLYGON_AMOY_RPC_URL=https://polygon-amoy.alchemyapi.io/v2/YOUR_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
```

## 🔬 Testing
Run unit tests with Hardhat:
```
npx hardhat test
```
Check coverage:
```
npx hardhat coverage
```

## 🚀 Deployment
To deploy the smart contract:
```
npx hardhat run scripts/deploy.js --network holesky
```

## 🔍 Verify on Etherscan
```
npx hardhat verify --network holesky CONTRACT_ADDRESS
```

## 📜 License
This project is **MIT licensed**.
