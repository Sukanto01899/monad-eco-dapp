# 🌍 EcoReward – Earn by Helping the Planet

**EcoReward** is a decentralized platform that rewards users for taking eco-friendly actions — such as recycling, planting trees, and using public transport.  
It combines **blockchain transparency**, **AI verification**, and **smart wallets** to create a sustainable, community-driven reward ecosystem.

---

## 🚀 Key Features

| Category                        | Feature                        | Description                                                                                                                   |
| ------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| ♻️ **Proof Submission**         | Submit proof of eco actions    | Upload image or document proof for recycling, tree planting, or public transport use. AI automatically verifies authenticity. |
| 💰 **Earn ECO Tokens**          | Receive token rewards          | Verified actions are rewarded in **ECO tokens**, directly credited to your smart wallet.                                      |
| 🌱 **Stake & Earn**             | Passive sustainability rewards | Stake ECO tokens to earn more tokens over time and support green initiatives.                                                 |
| 🏆 **Leaderboard**              | Compete for the top spot       | Track your eco impact and climb the leaderboard based on verified activities.                                                 |
| 👛 **Smart Wallet Integration** | Seamless blockchain experience | Each user gets a **MetaMask Delegation Toolkit**-based smart wallet powered by **Privy** for secure, gasless transactions.    |
| 🎯 **Marketplace (Future)**     | Eco-products & carbon offsets  | Buy or trade eco-friendly goods, NFTs, and donation credits using ECO tokens.                                                 |
| 🤝 **Donations**                | Support green causes           | Users can delegate part of their tokens to verified environmental organizations or local recycling programs.                  |

---

## 🧠 How It Works

1. **Sign Up** → User connects wallet (via Privy or MetaMask Delegation Toolkit).
2. **Perform Eco Actions** → Recycle, plant trees, or use public transport.
3. **Submit Proof** → Upload images or receipts as verification proof.
4. **AI Verification** → Gemini-based AI verifies authenticity of submitted proofs.
5. **Earn Rewards** → Verified actions earn ECO tokens, visible on the dashboard.
6. **Stake & Claim** → Stake ECO tokens for additional rewards or claim them anytime.

---

## 🛠 Tech Stack

| Layer               | Technology                                                      |
| ------------------- | --------------------------------------------------------------- |
| **Frontend**        | React 19 / Next.js (App Router), Tailwind CSS                   |
| **Backend**         | Node.js, Express.js                                             |
| **Blockchain**      | Solidity, Remix, Viem, Wagmi                                    |
| **Smart Accounts**  | MetaMask Delegation Toolkit + Privy                             |
| **Database**        | MongoDB (user & proof metadata) / Envio Indexer (on-chain data) |
| **AI Verification** | Gemini API for image & action classification                    |
| **Deployment**      | Vercel / Monad testnet                                          |

---

## 🔒 Smart Contracts

| Contract               | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| **ECO Token**          | ERC20 token used for rewards and staking               |
| **Staking Contract**   | Users can stake ECO to earn more ECO                   |
| **Proof Manager**      | Handles submission and AI-verified reward distribution |
| **Stable-to-ECO Swap** | Buy ECO tokens using USDC/USDT                         |
| **Donation Contract**  | Enables token-based environmental donations            |

---

## ⚡ Example User Flow

1. User joins EcoReward via Privy or Telegram Mini App.
2. Uploads proof of eco action (e.g., recycling photo).
3. Gemini AI checks authenticity.
4. On-chain `ProofSubmitted` event emitted.
5. Backend listens (via Envio Indexer) and triggers reward.
6. User can view all proofs and rewards on their dashboard.

---

## 📊 Reward Calculation (Example)

| Action               | Reward (ECO) |
| -------------------- | ------------ |
| Plastic Recycling    | 100 ECO      |
| Tree Planting        | 100 ECO      |
| Public Transport Use | 100 ECO      |

_(Rewards are adjustable by DAO governance.)_

---

## 💡 Future Features

- ✅ Carbon Credit NFT integration
- ✅ Real-world eco-campaign tracking
- ✅ Cross-chain rewards (ECO ↔ MON)
- ✅ AI-driven impact scoring

---

## ❤️ Donations

All user donations are delegated transparently on-chain using **MetaMask Delegation Toolkit**.  
Funds go directly to verified environmental organizations and local sustainability projects.

---

## 🧩 Project Architecture

Frontend (React/Next.js)
↓
Privy / MetaMask Delegation Toolkit
↓
Smart Wallet (AA)
↓
EcoReward Smart Contracts (Solidity)
↓
Envio Indexer + GraphQL
↓
Backend (Node.js + MongoDB)

---

## 🧠 Contributors

- **Sukanto** — Lead Developer
- Open for collaboration: [https://t.me/Sukanto01874]()

---

## 🪙 License

This project is licensed under the **MIT License** — free to use, modify, and build upon with attribution.
