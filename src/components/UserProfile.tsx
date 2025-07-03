import type React from 'react'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { X, User, Wallet, TrendingUp, Clock, Copy, ExternalLink, Coins, BarChart3, Award, Settings, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { formatCurrency, truncateAddress } from '../lib/utils'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { address, isConnected } = useAccount()
  const [depositBalance, setDepositBalance] = useState(1250.75) // Mock balance

  // Mock user stats
  const userStats = {
    totalStaked: 875.50,
    totalRewards: 45.25,
    activePositions: 3,
    totalValue: 920.75,
    joinDate: '2024-01-15',
    stakingDays: 47,
    avgWeeklyReturn: 1.2
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl border border-orange-500/20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 industrial-grid opacity-20" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-orange-500/20 bg-orange-500/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white fabrik-brand">USER PROFILE</h2>
              <p className="text-orange-400 text-sm">Factory Operator Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-orange-500/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Wallet Info */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-orange-400" />
              Wallet Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Address:</span>
                <div className="flex items-center space-x-2">
                  <code className="text-sm text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                    {address ? truncateAddress(address, 8, 6) : 'Not connected'}
                  </code>
                  {address && (
                    <button
                      onClick={copyAddress}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Network:</span>
                <span className="text-yellow-400 font-semibold">BNB Smart Chain</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-semibold flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  Connected
                </span>
              </div>
            </div>
          </div>

          {/* Deposit Balance */}
          <div className="glass-card p-4 border border-green-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-green-400" />
              Available Balance
            </h3>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {formatCurrency(depositBalance)}
              </div>
              <p className="text-gray-400 text-sm">Ready for staking</p>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Deposit More
              </Button>
              <Button variant="outline" className="border-green-600/50 text-green-400" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Transactions
              </Button>
            </div>
          </div>

          {/* Staking Stats */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-orange-400" />
              Staking Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="text-xl font-bold text-orange-400">{formatCurrency(userStats.totalStaked)}</div>
                <div className="text-xs text-gray-400">Total Staked</div>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-xl font-bold text-green-400">{formatCurrency(userStats.totalRewards)}</div>
                <div className="text-xs text-gray-400">Total Rewards</div>
              </div>
              <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-xl font-bold text-blue-400">{userStats.activePositions}</div>
                <div className="text-xs text-gray-400">Active Positions</div>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-xl font-bold text-purple-400">{userStats.avgWeeklyReturn}%</div>
                <div className="text-xs text-gray-400">Avg Weekly Return</div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-orange-400" />
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Member Since:</span>
                <span className="text-white">{new Date(userStats.joinDate).toLocaleDateString('de-DE')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Staking Days:</span>
                <span className="text-orange-400 font-semibold">{userStats.stakingDays} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Portfolio Value:</span>
                <span className="text-green-400 font-bold">{formatCurrency(userStats.totalValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Operator Level:</span>
                <span className="text-purple-400 font-semibold">Advanced</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-orange-600 hover:bg-orange-700 factory-glow">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" className="border-orange-600/50 text-orange-400 hover:bg-orange-500/10">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on BSCScan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
