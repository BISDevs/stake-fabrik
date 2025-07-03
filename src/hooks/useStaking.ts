import { useState, useEffect, useCallback } from 'react'
import { useAccount, useBalance, useWriteContract, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'

// Real BNB Chain Token Addresses
const VISTA_FINANCE_ADDRESS = '0x493361d6164093936c86dcb35ad03b4c0d032076'
const MIRROR_MONEY_ADDRESS = '0xe0062a28798f85388da4355fe8a1bb4ec921ed3a'
const GEURO_ADDRESS = '0x6f13b1fb6b2897bb40adbc09f7f6cfad181c0904'

// Staking contract address (will be deployed)
const STAKING_CONTRACT_ADDRESS = '0x0987654321098765432109876543210987654321'

// Pool configurations - All 3 plans available for each token (9 total combinations)
export const POOL_CONFIGS = {
  // Vista Finance Plans
  'vista-plan-1': {
    id: 0,
    name: 'Vista Finance - Starter',
    token: 'VISTA',
    contractAddress: VISTA_FINANCE_ADDRESS,
    apr: 26, // 0.5% per week * 52 weeks
    weeklyRate: 0.5,
    lockPeriod: 7, // 1 week minimum
    minStake: '250',
    minStakeEuro: 250,
    maxCapacity: '500000',
    currentTvl: '125000',
    currency: 'EUR',
    description: '250 Euro minimum - 0.5% weekly returns',
    category: 'vista'
  },
  'vista-plan-2': {
    id: 1,
    name: 'Vista Finance - Standard',
    token: 'VISTA',
    contractAddress: VISTA_FINANCE_ADDRESS,
    apr: 52, // 1% per week * 52 weeks
    weeklyRate: 1.0,
    lockPeriod: 7,
    minStake: '500',
    minStakeEuro: 500,
    maxCapacity: '750000',
    currentTvl: '300000',
    currency: 'EUR',
    description: '500 Euro minimum - 1% weekly returns',
    category: 'vista'
  },
  'vista-plan-3': {
    id: 2,
    name: 'Vista Finance - Premium',
    token: 'VISTA',
    contractAddress: VISTA_FINANCE_ADDRESS,
    apr: 104, // 2% per week * 52 weeks
    weeklyRate: 2.0,
    lockPeriod: 7,
    minStake: '1000',
    minStakeEuro: 1000,
    maxCapacity: '1000000',
    currentTvl: '650000',
    currency: 'EUR',
    description: '1000 Euro minimum - 2% weekly returns',
    category: 'vista'
  },

  // 4-Way Mirror Money Plans
  'mirror-plan-1': {
    id: 3,
    name: '4-Way Mirror - Starter',
    token: '4WMM',
    contractAddress: MIRROR_MONEY_ADDRESS,
    apr: 26,
    weeklyRate: 0.5,
    lockPeriod: 7,
    minStake: '250',
    minStakeEuro: 250,
    maxCapacity: '400000',
    currentTvl: '180000',
    currency: 'EUR',
    description: '250 Euro minimum - 0.5% weekly returns',
    category: 'mirror'
  },
  'mirror-plan-2': {
    id: 4,
    name: '4-Way Mirror - Standard',
    token: '4WMM',
    contractAddress: MIRROR_MONEY_ADDRESS,
    apr: 52,
    weeklyRate: 1.0,
    lockPeriod: 7,
    minStake: '500',
    minStakeEuro: 500,
    maxCapacity: '600000',
    currentTvl: '420000',
    currency: 'EUR',
    description: '500 Euro minimum - 1% weekly returns',
    category: 'mirror'
  },
  'mirror-plan-3': {
    id: 5,
    name: '4-Way Mirror - Premium',
    token: '4WMM',
    contractAddress: MIRROR_MONEY_ADDRESS,
    apr: 104,
    weeklyRate: 2.0,
    lockPeriod: 7,
    minStake: '1000',
    minStakeEuro: 1000,
    maxCapacity: '800000',
    currentTvl: '720000',
    currency: 'EUR',
    description: '1000 Euro minimum - 2% weekly returns',
    category: 'mirror'
  },

  // GEURO Plans
  'geuro-plan-1': {
    id: 6,
    name: 'GEURO - Starter',
    token: 'GEURO',
    contractAddress: GEURO_ADDRESS,
    apr: 26,
    weeklyRate: 0.5,
    lockPeriod: 7,
    minStake: '250',
    minStakeEuro: 250,
    maxCapacity: '350000',
    currentTvl: '210000',
    currency: 'EUR',
    description: '250 Euro minimum - 0.5% weekly returns',
    category: 'geuro'
  },
  'geuro-plan-2': {
    id: 7,
    name: 'GEURO - Standard',
    token: 'GEURO',
    contractAddress: GEURO_ADDRESS,
    apr: 52,
    weeklyRate: 1.0,
    lockPeriod: 7,
    minStake: '500',
    minStakeEuro: 500,
    maxCapacity: '550000',
    currentTvl: '380000',
    currency: 'EUR',
    description: '500 Euro minimum - 1% weekly returns',
    category: 'geuro'
  },
  'geuro-plan-3': {
    id: 8,
    name: 'GEURO - Premium',
    token: 'GEURO',
    contractAddress: GEURO_ADDRESS,
    apr: 104,
    weeklyRate: 2.0,
    lockPeriod: 7,
    minStake: '1000',
    minStakeEuro: 1000,
    maxCapacity: '900000',
    currentTvl: '765000',
    currency: 'EUR',
    description: '1000 Euro minimum - 2% weekly returns',
    category: 'geuro'
  }
}

export interface StakingPosition {
  poolId: number
  poolName: string
  token: string
  amount: string
  amountEuro: number
  stakeTime: number
  lockPeriod: number
  apr: number
  weeklyRate: number
  canWithdraw: boolean
  estimatedRewards: string
  estimatedRewardsEuro: number
  contractAddress: string
}

export interface StakingStats {
  totalStaked: string
  totalStakedEuro: number
  totalRewards: string
  totalRewardsEuro: number
  activePositions: number
  totalValue: string
  totalValueEuro: number
}

export interface TokenBalance {
  vista: string
  mirrorMoney: string
  geuro: string
}

export const useStaking = () => {
  const { address, isConnected } = useAccount()
  const [stakingPositions, setStakingPositions] = useState<StakingPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demo purposes
  const [mockPositions, setMockPositions] = useState<StakingPosition[]>([])
  const [mockStats, setMockStats] = useState<StakingStats>({
    totalStaked: '0',
    totalStakedEuro: 0,
    totalRewards: '0',
    totalRewardsEuro: 0,
    activePositions: 0,
    totalValue: '0',
    totalValueEuro: 0
  })

  // Get token balances for all three BNB Chain tokens
  const { data: vistaBalance } = useBalance({
    address,
    token: VISTA_FINANCE_ADDRESS,
  })

  const { data: mirrorMoneyBalance } = useBalance({
    address,
    token: MIRROR_MONEY_ADDRESS,
  })

  const { data: geuroBalance } = useBalance({
    address,
    token: GEURO_ADDRESS,
  })

  // Combined token balances
  const tokenBalances: TokenBalance = {
    vista: vistaBalance?.formatted || '0',
    mirrorMoney: mirrorMoneyBalance?.formatted || '0',
    geuro: geuroBalance?.formatted || '0'
  }

  // Mock contract read functions
  const getUserPositions = useCallback(async () => {
    if (!address) return []

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return mock positions
    return mockPositions
  }, [address, mockPositions])

  const getPoolInfo = useCallback(async (poolId: number) => {
    const poolKey = Object.keys(POOL_CONFIGS).find(key =>
      POOL_CONFIGS[key as keyof typeof POOL_CONFIGS].id === poolId
    ) as keyof typeof POOL_CONFIGS

    return poolKey ? POOL_CONFIGS[poolKey] : null
  }, [])

  // Staking function - Updated for Euro-based plans
  const stake = async (poolId: string, amountEuro: string) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const poolConfig = POOL_CONFIGS[poolId as keyof typeof POOL_CONFIGS]
      if (!poolConfig) {
        throw new Error('Invalid pool')
      }

      // Validate Euro amount
      const stakeAmountEuro = Number.parseFloat(amountEuro)
      const minStakeEuro = poolConfig.minStakeEuro

      if (stakeAmountEuro < minStakeEuro) {
        throw new Error(`Minimum stake is ${minStakeEuro} EUR for ${poolConfig.name}`)
      }

      // Calculate weekly rewards in Euro
      const weeklyRewardsEuro = (stakeAmountEuro * poolConfig.weeklyRate) / 100
      const yearlyRewardsEuro = weeklyRewardsEuro * 52

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create new position
      const newPosition: StakingPosition = {
        poolId: poolConfig.id,
        poolName: poolConfig.name,
        token: poolConfig.token,
        amount: stakeAmountEuro.toString(), // Store as string for consistency
        amountEuro: stakeAmountEuro,
        stakeTime: Date.now(),
        lockPeriod: poolConfig.lockPeriod,
        apr: poolConfig.apr,
        weeklyRate: poolConfig.weeklyRate,
        canWithdraw: false, // All plans have 1 week minimum lock
        estimatedRewards: yearlyRewardsEuro.toFixed(2),
        estimatedRewardsEuro: yearlyRewardsEuro,
        contractAddress: poolConfig.contractAddress
      }

      // Update mock positions
      setMockPositions(prev => [...prev, newPosition])

      // Update stats
      updateMockStats([...mockPositions, newPosition])

      return {
        success: true,
        txHash: `0x${Math.random().toString(16).substring(2)}`,
        message: `Successfully staked ${stakeAmountEuro} EUR in ${poolConfig.name}`,
        weeklyReturn: weeklyRewardsEuro.toFixed(2)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Staking failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Unstaking function - Updated for Euro-based plans
  const unstake = async (positionIndex: number) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const position = mockPositions[positionIndex]
      if (!position) {
        throw new Error('Position not found')
      }

      // Check if can withdraw (1 week minimum for all plans)
      const lockEndTime = position.stakeTime + (7 * 24 * 60 * 60 * 1000)
      const canWithdrawNow = Date.now() >= lockEndTime

      if (!canWithdrawNow) {
        throw new Error('Position is still locked (1 week minimum)')
      }

      // Calculate final rewards
      const weeksStaked = (Date.now() - position.stakeTime) / (7 * 24 * 60 * 60 * 1000)
      const weeklyReward = (position.amountEuro * position.weeklyRate) / 100
      const totalRewards = weeklyReward * weeksStaked

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Remove position
      const updatedPositions = mockPositions.filter((_, index) => index !== positionIndex)
      setMockPositions(updatedPositions)

      // Update stats
      updateMockStats(updatedPositions)

      return {
        success: true,
        txHash: `0x${Math.random().toString(16).substring(2)}`,
        message: `Successfully unstaked ${position.amountEuro} EUR + ${totalRewards.toFixed(2)} EUR rewards`,
        totalAmount: position.amountEuro + totalRewards,
        rewards: totalRewards.toFixed(2)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unstaking failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Claim rewards function - Updated for weekly Euro rewards
  const claimRewards = async (positionIndex: number) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const position = mockPositions[positionIndex]
      if (!position) {
        throw new Error('Position not found')
      }

      // Calculate rewards based on weeks staked
      const weeksStaked = (Date.now() - position.stakeTime) / (7 * 24 * 60 * 60 * 1000)
      const weeklyReward = (position.amountEuro * position.weeklyRate) / 100
      const totalRewards = weeklyReward * weeksStaked

      if (totalRewards < 0.01) {
        throw new Error('No rewards available to claim yet')
      }

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Update position (reset stake time for reward calculation)
      const updatedPositions = [...mockPositions]
      updatedPositions[positionIndex] = {
        ...position,
        stakeTime: Date.now() // Reset stake time for reward calculation
      }
      setMockPositions(updatedPositions)

      return {
        success: true,
        txHash: `0x${Math.random().toString(16).substring(2)}`,
        message: `Successfully claimed ${totalRewards.toFixed(2)} EUR rewards`,
        rewards: totalRewards.toFixed(2),
        weeksStaked: weeksStaked.toFixed(1)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Claiming rewards failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Update mock stats - Updated for Euro calculations
  const updateMockStats = useCallback((positions: StakingPosition[]) => {
    const totalStakedEuro = positions.reduce((sum, pos) => sum + pos.amountEuro, 0)
    const totalRewardsEuro = positions.reduce((sum, pos) => {
      // Calculate rewards based on weekly rate and time staked
      const weeksStaked = (Date.now() - pos.stakeTime) / (7 * 24 * 60 * 60 * 1000)
      const weeklyReward = (pos.amountEuro * pos.weeklyRate) / 100
      return sum + (weeklyReward * weeksStaked)
    }, 0)

    setMockStats({
      totalStaked: totalStakedEuro.toFixed(2),
      totalStakedEuro: totalStakedEuro,
      totalRewards: totalRewardsEuro.toFixed(2),
      totalRewardsEuro: totalRewardsEuro,
      activePositions: positions.length,
      totalValue: (totalStakedEuro + totalRewardsEuro).toFixed(2),
      totalValueEuro: totalStakedEuro + totalRewardsEuro
    })
  }, [])

  // Load positions on mount
  useEffect(() => {
    if (isConnected && address) {
      getUserPositions().then(positions => {
        setStakingPositions(positions)
        updateMockStats(positions)
      })
    }
  }, [isConnected, address, getUserPositions, updateMockStats])

  // Calculate if position can be withdrawn - Updated for 1-week minimum lock
  const canWithdraw = (position: StakingPosition) => {
    const lockEndTime = position.stakeTime + (7 * 24 * 60 * 60 * 1000) // 1 week minimum
    return Date.now() >= lockEndTime
  }

  // Get time until unlock - Updated for weekly cycles
  const getTimeUntilUnlock = (position: StakingPosition) => {
    const lockEndTime = position.stakeTime + (7 * 24 * 60 * 60 * 1000) // 1 week lock
    const timeLeft = lockEndTime - Date.now()

    if (timeLeft <= 0) return null

    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))

    if (days > 0) {
      return `${days}d ${hours}h`
    }
    return `${hours}h`
  }

  return {
    // State
    stakingPositions: mockPositions,
    isLoading,
    error,
    stats: mockStats,

    // Functions
    stake,
    unstake,
    claimRewards,
    canWithdraw,
    getTimeUntilUnlock,
    getPoolInfo,

    // Wallet info - Updated for multiple BNB Chain tokens
    tokenBalances,
    vistaBalance: vistaBalance?.formatted || '0',
    mirrorMoneyBalance: mirrorMoneyBalance?.formatted || '0',
    geuroBalance: geuroBalance?.formatted || '0',
    isConnected,
    address
  }
}
