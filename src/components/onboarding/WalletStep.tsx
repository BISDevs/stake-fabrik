import React, { useState } from 'react'
import { Wallet, CheckCircle2, AlertTriangle, Copy, ExternalLink, Shield } from 'lucide-react'
import { Button } from '../ui/button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { bsc } from 'wagmi/chains'

interface WalletStepProps {
  walletConnected: boolean
  walletAddress?: string
  errors: Record<string, string>
  onUpdate: (connected: boolean, address?: string) => void
}

const WalletStep: React.FC<WalletStepProps> = ({ walletConnected, walletAddress, errors, onUpdate }) => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isConnecting, setIsConnecting] = useState(false)

  // Update parent component when wallet connection changes
  React.useEffect(() => {
    if (isConnected && address) {
      onUpdate(true, address)
    } else {
      onUpdate(false)
    }
  }, [isConnected, address, onUpdate])

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const isCorrectNetwork = chain?.id === bsc.id

  const walletOptions = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect using MetaMask browser extension',
      popular: true
    },
    {
      name: 'WalletConnect',
      icon: '📱',
      description: 'Scan with WalletConnect to connect',
      popular: true
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect using Coinbase Wallet',
      popular: false
    },
    {
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Connect using Trust Wallet mobile app',
      popular: false
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Wallet Verbindung</h3>
        <p className="text-gray-400">
          Verbinden Sie Ihr Wallet mit der BNB Smart Chain, um mit dem Staking zu beginnen.
        </p>
      </div>

      {/* Network Info */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xl">⚡</span>
          <h4 className="font-semibold text-yellow-400">BNB Smart Chain erforderlich</h4>
        </div>
        <p className="text-yellow-300 text-sm">
          Alle Staking-Operationen finden auf der BNB Smart Chain statt.
          Stellen Sie sicher, dass Ihr Wallet auf das richtige Netzwerk eingestellt ist.
        </p>
      </div>

      {/* Connection Status */}
      {isConnected ? (
        <div className="space-y-4">
          {/* Wallet Connected */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-semibold">Wallet verbunden ✓</span>
              </div>
              <span className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">
                Aktiv
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Adresse:</span>
                <div className="flex items-center space-x-2">
                  <code className="text-sm text-white bg-gray-800 px-2 py-1 rounded">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Adresse kopieren"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Netzwerk:</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    isCorrectNetwork ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {chain?.name || 'Unbekannt'}
                  </span>
                  {isCorrectNetwork ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Network Switch */}
            {!isCorrectNetwork && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="text-red-400 text-sm mb-3">
                  Falsches Netzwerk! Bitte wechseln Sie zur BNB Smart Chain.
                </p>
                <Button
                  onClick={() => switchNetwork?.(bsc.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-sm"
                  size="sm"
                >
                  Zu BNB Smart Chain wechseln
                </Button>
              </div>
            )}
          </div>

          {/* Wallet Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-2">Wallet-Explorer</h5>
              <p className="text-gray-400 text-sm mb-3">
                Überprüfen Sie Ihre Transaktionen auf BSCScan
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:text-white"
                asChild
              >
                <a
                  href={`https://bscscan.com/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  BSCScan öffnen
                </a>
              </Button>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-2">Netzwerk hinzufügen</h5>
              <p className="text-gray-400 text-sm mb-3">
                BNB Smart Chain zu Ihrem Wallet hinzufügen
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:text-white"
                onClick={() => {
                  // Add BSC network
                  if (window.ethereum) {
                    window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [{
                        chainId: '0x38',
                        chainName: 'BNB Smart Chain',
                        nativeCurrency: {
                          name: 'BNB',
                          symbol: 'BNB',
                          decimals: 18
                        },
                        rpcUrls: ['https://bsc-dataseed.binance.org/'],
                        blockExplorerUrls: ['https://bscscan.com/']
                      }]
                    })
                  }
                }}
              >
                <Shield className="w-3 h-3 mr-2" />
                BSC hinzufügen
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Connection Options */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">Wallet auswählen</h4>

            {/* RainbowKit Connect Button */}
            <div className="mb-6">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading'
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated')

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {!connected && (
                        <Button
                          onClick={openConnectModal}
                          className="bg-orange-600 hover:bg-orange-700 factory-glow text-lg px-8 py-4 h-auto"
                        >
                          <Wallet className="w-5 h-5 mr-3" />
                          Wallet Verbinden
                        </Button>
                      )}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>

            {/* Popular Wallets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {walletOptions.map((wallet) => (
                <div
                  key={wallet.name}
                  className="relative p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-orange-500/50 transition-all cursor-pointer group"
                >
                  {wallet.popular && (
                    <span className="absolute top-2 right-2 text-xs bg-orange-500 text-white px-2 py-1 rounded">
                      Beliebt
                    </span>
                  )}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <h5 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {wallet.name}
                      </h5>
                      <p className="text-sm text-gray-400">
                        {wallet.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <h5 className="font-semibold text-blue-400">Sicherheitshinweise</h5>
            </div>
            <ul className="text-sm text-blue-300 space-y-1">
              <li>• Verwenden Sie nur offizielle Wallet-Apps</li>
              <li>• Überprüfen Sie immer die URL dieser Website</li>
              <li>• Teilen Sie niemals Ihre Private Keys</li>
              <li>• Verwenden Sie Hardware-Wallets für große Beträge</li>
            </ul>
          </div>
        </div>
      )}

      {/* Error Display */}
      {errors.wallet && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{errors.wallet}</p>
          </div>
        </div>
      )}

      {/* Next Steps Preview */}
      {isConnected && isCorrectNetwork && (
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
          <h5 className="font-semibold text-green-400 mb-2">Nächste Schritte</h5>
          <p className="text-green-300 text-sm">
            Wallet erfolgreich verbunden! Sie können nun mit der Einzahlung und dem Staking fortfahren.
          </p>
        </div>
      )}
    </div>
  )
}

export default WalletStep
