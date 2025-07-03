# Stake Fabrik - Industrial Staking Platform

## Overview

Stake Fabrik is a comprehensive industrial-themed cryptocurrency staking platform that provides users with secure, euro-based staking opportunities. The platform features a modern, responsive design with multi-language support and integrates with the BNB Chain for three featured tokens.

## Features

### 🌍 Multi-Language Support
- **Languages Supported**: German (DE), English (EN), Spanish (ES), Italian (IT), French (FR)
- Complete localization system with context-aware translations
- Dynamic language switching without page reload

### 🔗 Blockchain Integration
- **Network**: BNB Chain (BSC)
- **Supported Tokens**:
  - VISTA Token
  - 4WMM Token
  - GEURO Token
- Web3 wallet connectivity and transaction handling

### 💰 Staking Plans
- **Euro-based returns**: All staking plans denominated in EUR
- **Weekly return system**: Consistent weekly profit distribution
- **Flexible plans**: Multiple staking duration and amount options
- **Industrial theme**: Professional, factory-inspired design

### 🎨 Design & UX
- **Color Scheme**: Orange/amber industrial theme
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Optimized Header**: Streamlined navigation for better user experience

### 🔐 User Management
- **Profile System**: Comprehensive user profile management
- **KYC Integration**: Know Your Customer verification process
- **Deposit System**: Secure cryptocurrency deposit functionality
- **Multi-step Onboarding**: Guided user registration process

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Web3**: Custom integration for BNB Chain
- **Package Manager**: Bun
- **Deployment**: Netlify-ready configuration

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── onboarding/      # Multi-step onboarding flow
│   └── *.tsx            # Feature-specific components
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── config/              # Web3 and app configuration
└── lib/                 # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Modern web browser with Web3 support

### Installation

```bash
# Clone the repository
git clone https://github.com/BISDevs/stake-fabrik.git
cd stake-fabrik

# Install dependencies
bun install

# Start development server
bun run dev
```

### Build for Production

```bash
# Create production build
bun run build

# Preview production build
bun run preview
```

## Configuration

### Environment Variables
Create a `.env.local` file with the following variables:

```env
VITE_WEB3_PROJECT_ID=your_walletconnect_project_id
VITE_BNB_CHAIN_RPC=https://bsc-dataseed.binance.org/
VITE_CONTRACT_ADDRESS_VISTA=0x...
VITE_CONTRACT_ADDRESS_4WMM=0x...
VITE_CONTRACT_ADDRESS_GEURO=0x...
```

### Supported Wallets
- MetaMask
- WalletConnect
- Trust Wallet
- Any BNB Chain compatible wallet

## Deployment

The project includes Netlify configuration:

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "bun run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For technical support or business inquiries, please contact the development team.

---

**🤖 Generated with [Same](https://same.new)**
