import type React from 'react'
import { useState } from 'react'
import { User, Wallet, Copy, ExternalLink, Plus, TrendingUp, Clock, CheckCircle2, AlertCircle, QrCode } from 'lucide-react'
import { Button } from './button'
import { Modal } from './modal'
import { useAccount, useBalance } from 'wagmi'
import { formatCurrency, truncateAddress } from '../../lib/utils'
import { toast } from 'react-hot-toast'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

// Vorgegebene Wallet-Adressen für Einzahlungen
const DEPOSIT_ADDRESSES = {
  BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: '0x742d35Cc6634C0532925a3b8D400f3b7FC35Ba2E',
  USDT: '0x892f1234abcd5678efgh9012ijkl3456mnop7890',
  USDC: '0x445e5678cdef9012abcd3456efgh7890ijkl1234',
  BNB: '0x123a4567bcde8901fghi2345jklm6789nopq0123'
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'profile' | 'deposit' | 'history'>('profile')
  const [selectedCrypto, setSelectedCrypto] = useState<keyof typeof DEPOSIT_ADDRESSES>('USDT')
  const [depositAmount, setDepositAmount] = useState('')
  const [showQRCode, setShowQRCode] = useState(false)

  // Mock user data - in real app würde das von einem Backend kommen
  const userStats = {
    totalDeposits: 2750.50,
    totalStaked: 2250.00,
    totalRewards: 156.75,
    activePositions: 3,
    joinDate: '2024-01-15',
    level: 'Gold Staker'
  }

  const depositHistory = [
    { id: 1, amount: 1000, crypto: 'USDT', status: 'completed', date: '2024-01-20', txHash: '0xabc123...' },
    { id: 2, amount: 500, crypto: 'ETH', status: 'completed', date: '2024-01-18', txHash: '0xdef456...' },
    { id: 3, amount: 1250, crypto: 'BNB', status: 'pending', date: '2024-01-22', txHash: '0xghi789...' }
  ]

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const cryptoOptions = [
    { symbol: 'USDT', name: 'Tether USD', icon: '💰', network: 'BEP-20' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', network: 'BEP-20' },
    { symbol: 'BNB', name: 'BNB', icon: '⚡', network: 'BNB Chain' },
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠', network: 'BEP-20' },
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', network: 'Bitcoin' }
  ]

  if (!isConnected) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Benutzer Profil">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profil
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'deposit'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Einzahlen
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Historie
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{userStats.level}</h3>
                  <p className="text-orange-400 font-mono text-sm">{truncateAddress(address || '')}</p>
                  <p className="text-gray-400 text-sm">Mitglied seit {userStats.joinDate}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(address || '', 'Wallet Address')}
                  className="border-orange-500/50 text-orange-400"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="text-lg font-bold text-orange-400">{formatCurrency(userStats.totalDeposits)}</div>
                  <div className="text-xs text-gray-400">Total Deposits</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{formatCurrency(userStats.totalStaked)}</div>
                  <div className="text-xs text-gray-400">Total Staked</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatCurrency(userStats.totalRewards)}</div>
                  <div className="text-xs text-gray-400">Total Rewards</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{userStats.activePositions}</div>
                  <div className="text-xs text-gray-400">Active Positions</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="bg-orange-600 hover:bg-orange-700 factory-glow"
                onClick={() => setActiveTab('deposit')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Jetzt Einzahlen
              </Button>
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-400"
                asChild
              >
                <a href={`https://bscscan.com/address/${address}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  BSCScan öffnen
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Deposit Tab */}
        {activeTab === 'deposit' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Krypto Einzahlung</h3>
              <p className="text-gray-400">Sende Kryptowährungen an die Stake Fabrik Wallet-Adresse</p>
            </div>

            {/* Crypto Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Kryptowährung auswählen</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto.symbol as keyof typeof DEPOSIT_ADDRESSES)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedCrypto === crypto.symbol
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{crypto.icon}</div>
                    <div className="font-semibold text-white text-sm">{crypto.symbol}</div>
                    <div className="text-xs text-gray-400">{crypto.network}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deposit Address */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">Einzahlungsadresse ({selectedCrypto})</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="border-orange-500/50 text-orange-400"
                >
                  <QrCode className="w-3 h-3 mr-1" />
                  QR
                </Button>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-orange-400 text-sm break-all">{DEPOSIT_ADDRESSES[selectedCrypto]}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(DEPOSIT_ADDRESSES[selectedCrypto], `${selectedCrypto} Address`)}
                    className="ml-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {showQRCode && (
                <div className="text-center mb-4">
                  <div className="w-32 h-32 bg-white rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-800" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">QR Code für {selectedCrypto} Adresse</p>
                </div>
              )}

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div className="text-yellow-300 text-sm">
                    <p className="font-semibold mb-1">Wichtige Hinweise:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Sende nur {selectedCrypto} an diese Adresse</li>
                      <li>• Mindesteinzahlung: 10 USD Wert</li>
                      <li>• Transaktionen werden automatisch verbucht</li>
                      <li>• Bestätigung dauert 3-15 Minuten</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Einzahlungshistorie</h3>

            <div className="space-y-3">
              {depositHistory.map((deposit) => (
                <div key={deposit.id} className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        deposit.status === 'completed' ? 'bg-green-500/20 border border-green-500/30' :
                        deposit.status === 'pending' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                        'bg-red-500/20 border border-red-500/30'
                      }`}>
                        {deposit.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                        {deposit.status === 'pending' && <Clock className="w-5 h-5 text-yellow-400" />}
                        {deposit.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-400" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{formatCurrency(deposit.amount)} in {deposit.crypto}</div>
                        <div className="text-sm text-gray-400">{deposit.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        deposit.status === 'completed' ? 'text-green-400' :
                        deposit.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {deposit.status === 'completed' ? 'Abgeschlossen' :
                         deposit.status === 'pending' ? 'Ausstehend' : 'Fehlgeschlagen'}
                      </div>
                      <button
                        onClick={() => copyToClipboard(deposit.txHash, 'Transaction Hash')}
                        className="text-xs text-orange-400 hover:text-orange-300 font-mono"
                      >
                        {deposit.txHash}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
