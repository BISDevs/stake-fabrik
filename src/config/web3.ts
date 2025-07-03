import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, arbitrum, base, optimism, bsc } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Stake Fabrik',
  appDescription: 'Industrial-grade decentralized staking infrastructure',
  appUrl: 'https://stakefabrik.com',
  appIcon: 'https://stakefabrik.com/logo.png',
  projectId: 'stake-fabrik-protocol', // In production sollte dies eine echte WalletConnect Project ID sein
  chains: [bsc, mainnet, polygon, arbitrum, base, optimism], // BNB Chain as primary
  ssr: false,
})

export const supportedChains = [
  {
    id: 56,
    name: 'BNB Smart Chain',
    icon: '⚡',
    color: '#F3BA2F'
  },
  {
    id: 1,
    name: 'Ethereum',
    icon: '⟠',
    color: '#627EEA'
  },
  {
    id: 137,
    name: 'Polygon',
    icon: '◆',
    color: '#8247E5'
  },
  {
    id: 42161,
    name: 'Arbitrum',
    icon: '▲',
    color: '#28A0F0'
  },
  {
    id: 8453,
    name: 'Base',
    icon: '🔵',
    color: '#0052FF'
  },
  {
    id: 10,
    name: 'Optimism',
    icon: '🔴',
    color: '#FF0420'
  }
]
