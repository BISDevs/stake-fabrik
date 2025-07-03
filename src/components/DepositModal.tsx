import type React from 'react'
import { useState } from 'react'
import { Copy, QrCode, ExternalLink, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'

const DepositModal: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [isAddressCopied, setIsAddressCopied] = useState(false)

  // Predefined deposit wallet addresses for different networks
  const depositAddresses = {
    USDT: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'BNB Smart Chain (BEP-20)',
      icon: '₮',
      minAmount: 10,
      color: 'green'
    },
    USDC: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'BNB Smart Chain (BEP-20)',
      icon: '💵',
      minAmount: 10,
      color: 'blue'
    },
    BNB: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'BNB Smart Chain',
      icon: '⚡',
      minAmount: 0.01,
      color: 'yellow'
    },
    BUSD: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'BNB Smart Chain (BEP-20)',
      icon: '💰',
      minAmount: 10,
      color: 'orange'
    }
  }

  const copyAddress = () => {
    const address = depositAddresses[selectedCrypto as keyof typeof depositAddresses].address
    navigator.clipboard.writeText(address)
    setIsAddressCopied(true)
    toast.success('Address copied to clipboard!')
    setTimeout(() => setIsAddressCopied(false), 3000)
  }

  const selectedToken = depositAddresses[selectedCrypto as keyof typeof depositAddresses]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💰</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Crypto Deposit</h3>
        <p className="text-gray-400">
          Send crypto to the address below to fund your staking account
        </p>
      </div>

      {/* Token Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Select Cryptocurrency</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(depositAddresses).map(([token, info]) => (
            <button
              key={token}
              onClick={() => setSelectedCrypto(token)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedCrypto === token
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-2">{info.icon}</div>
              <div className="font-semibold text-white">{token}</div>
              <div className="text-xs text-gray-400">Min: {info.minAmount}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Deposit Address */}
      <div className="glass-card p-6 border border-green-500/20">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-2xl mr-2">{selectedToken.icon}</span>
          {selectedCrypto} Deposit Address
        </h4>

        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
            <div className="text-xs text-gray-400 mb-2">Network: {selectedToken.network}</div>
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded border">
              <code className="text-green-400 text-sm break-all flex-1 mr-2">
                {selectedToken.address}
              </code>
              <Button
                size="sm"
                onClick={copyAddress}
                className={`${isAddressCopied ? 'bg-green-600' : 'bg-orange-600 hover:bg-orange-700'} min-w-[80px]`}
              >
                {isAddressCopied ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="text-center">
            <div className="w-48 h-48 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">QR Code</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-green-600/50 text-green-400">
              <QrCode className="w-4 h-4 mr-2" />
              Show QR Code
            </Button>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="space-y-4">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h5 className="font-semibold text-yellow-400">Important Instructions</h5>
          </div>
          <ul className="text-sm text-yellow-300 space-y-1">
            <li>• Only send {selectedCrypto} to this address on {selectedToken.network}</li>
            <li>• Minimum deposit: {selectedToken.minAmount} {selectedCrypto}</li>
            <li>• Funds will be credited after 3-6 network confirmations</li>
            <li>• Do not send from exchange accounts that don't support smart contracts</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <h5 className="font-semibold text-blue-400">Processing Time</h5>
          </div>
          <div className="text-sm text-blue-300 space-y-1">
            <p>• Typical processing time: 5-15 minutes</p>
            <p>• Your balance will be automatically updated</p>
            <p>• You'll receive a notification when funds arrive</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={copyAddress}
          className="bg-green-600 hover:bg-green-700 factory-glow"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </Button>
        <Button
          variant="outline"
          className="border-green-600/50 text-green-400 hover:bg-green-500/10"
          asChild
        >
          <a
            href={`https://bscscan.com/address/${selectedToken.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on BSCScan
          </a>
        </Button>
      </div>

      {/* Recent Deposits */}
      <div className="glass-card p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Deposits</h4>
        <div className="space-y-3">
          {/* Mock recent deposits */}
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <span>₮</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">+500.00 USDT</div>
                <div className="text-xs text-gray-400">2 hours ago</div>
              </div>
            </div>
            <span className="text-green-400 text-sm font-medium">Confirmed</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span>⚡</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">+0.5 BNB</div>
                <div className="text-xs text-gray-400">5 minutes ago</div>
              </div>
            </div>
            <span className="text-yellow-400 text-sm font-medium">Pending</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositModal
