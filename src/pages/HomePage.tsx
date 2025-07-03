import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Lock, Coins, Users, BarChart4, Target, Shield, Zap, TrendingUp, Clock, Award, X, Cog, Factory, Loader2, Play, ArrowDown, ChevronRight, Sparkles, Rocket, Star, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Modal } from '../components/ui/modal'
import { useStaking, POOL_CONFIGS } from '../hooks/useStaking'
import { useLanguage } from '../contexts/LanguageContext'
import { toast } from 'react-hot-toast'

const HomePage = () => {
  const [activeStakingModal, setActiveStakingModal] = useState<string | null>(null)
  const [stakeAmount, setStakeAmount] = useState('')
  const { t } = useLanguage()

  const {
    stake,
    unstake,
    claimRewards,
    stakingPositions,
    isLoading,
    error,
    stats,
    tokenBalances,
    vistaBalance,
    mirrorMoneyBalance,
    geuroBalance,
    isConnected,
    canWithdraw,
    getTimeUntilUnlock
  } = useStaking()

  const openStakingModal = (poolName: string) => setActiveStakingModal(poolName)
  const closeStakingModal = () => {
    setActiveStakingModal(null)
    setStakeAmount('')
  }

  // Handle staking transaction - Updated for Euro amounts
  const handleStake = async (poolId: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid Euro amount')
      return
    }

    const poolConfig = POOL_CONFIGS[poolId as keyof typeof POOL_CONFIGS]
    if (poolConfig && Number.parseFloat(stakeAmount) < poolConfig.minStakeEuro) {
      toast.error(`Minimum stake is ${poolConfig.minStakeEuro} EUR for ${poolConfig.name}`)
      return
    }

    try {
      const result = await stake(poolId, stakeAmount)
      if (result.success) {
        toast.success(`${result.message}${result.weeklyReturn ? ` - Weekly return: ${result.weeklyReturn} EUR` : ''}`)
        closeStakingModal()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Staking failed')
    }
  }

  // Handle unstaking
  const handleUnstake = async (positionIndex: number) => {
    try {
      const result = await unstake(positionIndex)
      if (result.success) {
        toast.success(result.message)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unstaking failed')
    }
  }

  // Handle claiming rewards
  const handleClaimRewards = async (positionIndex: number) => {
    try {
      const result = await claimRewards(positionIndex)
      if (result.success) {
        toast.success(result.message)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Claiming rewards failed')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Completely Redesigned */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 industrial-grid opacity-30" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-32 right-20 w-6 h-6 bg-orange-500 rounded-full animate-pulse opacity-40 delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-50 delay-500" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium">Next Generation Staking</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="fabrik-brand block">STAKE</span>
                  <span className="text-white block" style={{fontFamily: "'Orbitron', 'Inter', sans-serif", letterSpacing: "0.05em"}}>FABRIK</span>
                </h1>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
                  <span className="text-orange-400 font-medium tracking-wider">INDUSTRIAL STAKING</span>
                </div>
              </div>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
  {t('hero.description')}
                <span className="text-orange-400 font-semibold"> Factory-Level</span> Infrastruktur.
              </p>

              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 production-counter">2.0%</div>
                  <div className="text-sm text-gray-400">{t('hero.weekly')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 production-counter">€{isConnected ? stats.totalStakedEuro.toLocaleString() : '0'}</div>
                  <div className="text-sm text-gray-400">{t('hero.your_tvl')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 production-counter">BNB</div>
                  <div className="text-sm text-gray-400">{t('hero.smart_chain')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 h-auto text-lg font-semibold factory-glow group" asChild>
                  <a href="#production-lines">
                    <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    {t('hero.cta_stake')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 px-8 py-4 h-auto text-lg font-semibold group" asChild>
                  <a href="/analytics">
                    <BarChart4 className="w-5 h-5 mr-2" />
                    Analytics
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 factory-glow">
                {/* Live Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{t('hero.live_dashboard')}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-xl p-4 border border-gray-700/50">
                      <div className="text-orange-400 text-sm font-medium">{t('hero.total_staked')}</div>
                      <div className="text-2xl font-bold text-white production-counter">{isConnected ? `€${stats.totalStakedEuro.toFixed(2)}` : '€0.00'}</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 border border-gray-700/50">
                      <div className="text-green-400 text-sm font-medium">{t('hero.rewards')}</div>
                      <div className="text-2xl font-bold text-white production-counter">{isConnected ? `€${stats.totalRewardsEuro.toFixed(2)}` : '€0.00'}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-300">{t('hero.bnb_chain_token')}</div>
                    {['VISTA', '4WMM', 'GEURO'].map((token, index) => (
                      <div key={token} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gray-700/30 hover:bg-orange-500/5 transition-all duration-300 group sparks-effect">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 bg-orange-400 rounded-full ${
                            index === 0 ? 'gear-rotate' :
                            index === 1 ? 'gear-rotate-reverse' : 'gear-rotate-slow'
                          }`}>⚡</div>
                          <span className="text-white font-medium group-hover:text-orange-400 transition-colors">{
                            token === 'VISTA' ? 'Vista Finance' :
                            token === '4WMM' ? '4-Way Mirror Money' : 'GEURO'
                          }</span>
                        </div>
                        <div className="text-orange-400 font-bold production-counter">{token}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-orange-500 p-4 rounded-2xl shadow-xl animate-float">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-400 to-orange-600 p-4 rounded-2xl shadow-xl animate-float delay-1000">
                <Factory className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </section>

      {/* Features Section - Improved */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
{t('features.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group glass-card p-8 text-center hover-glow metallic-shine particles relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white factory-steam" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('features.security.title')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('features.security.description')}
                </p>
              </div>
            </div>

            <div className="group glass-card p-8 text-center hover-glow metallic-shine relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Cog className="w-8 h-8 text-white gear-rotate" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('features.automation.title')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('features.automation.description')}
                </p>
              </div>
            </div>

            <div className="group glass-card p-8 text-center hover-glow metallic-shine particles relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Factory className="w-8 h-8 text-white industrial-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('features.scalable.title')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('features.scalable.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Lines Section - Organized by Token Categories */}
      <section id="production-lines" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('staking.plans_title')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('staking.choose_description')}
            </p>
          </div>

          {/* Token Categories */}
          {['vista', 'mirror', 'geuro'].map((category) => {
            const categoryPools = Object.entries(POOL_CONFIGS).filter(([_, pool]) => pool.category === category)
            const tokenName = category === 'vista' ? 'Vista Finance' :
                            category === 'mirror' ? '4-Way Mirror Money' : 'GEURO'
            const tokenSymbol = category === 'vista' ? 'VISTA' :
                              category === 'mirror' ? '4WMM' : 'GEURO'

            return (
              <div key={category} className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-orange-400">
                    {tokenName} ({tokenSymbol})
                  </h3>
                  <p className="text-gray-400">
                    {t('staking.choose_tiers')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryPools.map(([key, pool]) => (
                    <div key={key} className="group glass-card p-6 hover-glow metallic-shine particles sparks-effect relative transition-all duration-300 hover:scale-105">
                      <div className="absolute top-4 right-4 w-6 h-6 text-orange-400">⚡</div>

                      {/* Pool Badge */}
                      <div className="absolute top-6 left-6">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          pool.weeklyRate >= 2 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          pool.weeklyRate >= 1 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                          {pool.weeklyRate >= 2 ? 'PREMIUM' :
                           pool.weeklyRate >= 1 ? 'STANDARD' : 'STARTER'}
                        </div>
                      </div>

                      <div className="pt-12 space-y-6">
                        <div className="text-center">
                          <h4 className={`text-2xl font-bold mb-2 ${
                            pool.weeklyRate >= 2 ? 'text-emerald-400' :
                            pool.weeklyRate >= 1 ? 'text-purple-400' : 'text-orange-400'
                          }`}>
                            {pool.name.split(' - ')[1]} {/* Nur "Starter", "Standard", "Premium" */}
                          </h4>
                          <p className="text-gray-400 text-sm">{pool.token} Token</p>
                          <div className="text-4xl font-bold mt-4 production-counter">
                            <span className={
                              pool.weeklyRate >= 2 ? 'text-emerald-400' :
                              pool.weeklyRate >= 1 ? 'text-purple-400' : 'text-orange-400'
                            }>
                              {pool.weeklyRate}%
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">{t('staking.weekly')}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">{t('staking.minimum')}</span>
                            <span className="font-semibold text-orange-400">€{pool.minStakeEuro}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">{t('staking.lock_time')}</span>
                            <span className="font-semibold text-green-400">1 Woche</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">{t('staking.yearly')}</span>
                            <span className="font-semibold text-purple-400">{pool.apr}% APR</span>
                          </div>

                          {/* TVL Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">{t('staking.pool_capacity')}</span>
                              <span className="text-orange-400">{Math.round((Number.parseInt(pool.currentTvl) / Number.parseInt(pool.maxCapacity)) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className={`bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000 ${
                                  Math.round((Number.parseInt(pool.currentTvl) / Number.parseInt(pool.maxCapacity)) * 100) > 70 ? 'conveyor-belt-fast' :
                                  Math.round((Number.parseInt(pool.currentTvl) / Number.parseInt(pool.maxCapacity)) * 100) > 40 ? 'conveyor-belt' :
                                  'assembly-line-moving'
                                }`}
                                style={{ width: `${Math.round((Number.parseInt(pool.currentTvl) / Number.parseInt(pool.maxCapacity)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                          <p className="text-xs text-orange-400 text-center">
                            {pool.description}
                          </p>
                        </div>

                        <Button
                          className={`w-full h-12 font-semibold transition-all duration-300 ${
                            pool.weeklyRate >= 2 ? 'bg-emerald-600 hover:bg-emerald-700' :
                            pool.weeklyRate >= 1 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-orange-600 hover:bg-orange-700'
                          } factory-glow assembly-line group`}
                          onClick={() => openStakingModal(key)}
                        >
                          <Factory className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
{t('staking.start_now')}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Active Positions Section - Updated for Euro-based plans */}
      {isConnected && stakingPositions.length > 0 && (
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Deine Aktiven Positionen</h2>
              <p className="text-xl text-gray-400">{t('positions.monitor')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stakingPositions.map((position, index) => {
                const timeUntilUnlock = getTimeUntilUnlock(position)
                const canWithdrawPosition = canWithdraw(position)
                const weeksStaked = (Date.now() - position.stakeTime) / (7 * 24 * 60 * 60 * 1000)
                const currentRewards = (position.amountEuro * position.weeklyRate / 100) * weeksStaked

                return (
                  <div key={`${position.poolId}-${position.stakeTime}-${index}`} className="glass-card p-6 hover-glow metallic-shine sparks-effect relative machinery-vibration">
                    <div className="absolute top-4 right-4 w-6 h-6 text-orange-400">⚡</div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-orange-400">{position.poolName}</h3>
                        <p className="text-sm text-gray-400">{position.token} Token</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-orange-400">{position.weeklyRate}%</span>
                        <p className="text-xs text-gray-400">{t('staking.weekly')}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('positions.staked_amount')}</span>
                        <span className="font-semibold text-orange-400">€{position.amountEuro}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('positions.current_rewards')}</span>
                        <span className="text-green-400">€{currentRewards.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('positions.weeks_active')}</span>
                        <span className="text-blue-400">{weeksStaked.toFixed(1)} Wochen</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className={canWithdrawPosition ? 'text-green-400' : 'text-yellow-400'}>
                          {canWithdrawPosition ? t('positions.unlocked') : `${t('positions.locked')} ${timeUntilUnlock || ''}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('positions.network')}</span>
                        <span className="text-yellow-400">BNB Chain ⚡</span>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                        <div className={`h-2 rounded-full ${canWithdrawPosition ? 'conveyor-belt-fast' : 'assembly-line-moving'} transition-all duration-1000`} style={{ width: '100%' }} />
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          className={`flex-1 bg-green-600 hover:bg-green-700 ${isLoading ? 'industrial-loading' : ''}`}
                          onClick={() => handleClaimRewards(index)}
                          disabled={isLoading || currentRewards < 0.01}
                          size="sm"
                        >
                          {isLoading ? <Loader2 className="w-3 h-3 animate-spin gear-rotate" /> : 'Rewards'}
                        </Button>
                        <Button
                          className={`flex-1 bg-red-600 hover:bg-red-700 ${isLoading ? 'industrial-loading' : ''}`}
                          onClick={() => handleUnstake(index)}
                          disabled={isLoading || !canWithdrawPosition}
                          size="sm"
                        >
                          {isLoading ? <Loader2 className="w-3 h-3 animate-spin gear-rotate-reverse" /> : 'Unstake'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Euro-based Staking Modals - All 9 combinations */}
      {Object.keys(POOL_CONFIGS).map((poolType) => {
        const poolConfig = POOL_CONFIGS[poolType as keyof typeof POOL_CONFIGS]
        return (
        <Modal
          key={poolType}
          isOpen={activeStakingModal === poolType}
          onClose={closeStakingModal}
          title={`${poolConfig.name} - BNB Chain Staking`}
        >
          <div className="space-y-6">
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 metallic-shine">
              <div className="flex justify-between items-center mb-3">
                <span className="text-orange-400 font-medium">{t('modal.weekly_return')}</span>
                <span className="text-2xl font-bold text-orange-400 production-counter">
                  {poolConfig.weeklyRate}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">{t('modal.lock_time')}:</span>
                  <span className="ml-2 text-green-400">{t('modal.one_week')}</span>
                </div>
                <div>
                  <span className="text-gray-400">{t('modal.token')}:</span>
                  <span className="ml-2 text-white">{poolConfig.token}</span>
                </div>
                <div>
                  <span className="text-gray-400">{t('modal.network')}:</span>
                  <span className="ml-2 text-yellow-400">{t('common.bnb_chain')} ⚡</span>
                </div>
                <div>
                  <span className="text-gray-400">{t('modal.yearly_approx')}:</span>
                  <span className="ml-2 text-purple-400">{poolConfig.apr}% APR</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-orange-500/5 rounded border border-orange-500/10">
                <p className="text-xs text-orange-400">{poolConfig.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
{t('modal.amount_label')}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder={t('modal.amount_placeholder').replace('{amount}', poolConfig.minStakeEuro.toString())}
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    min={poolConfig.minStakeEuro}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  />
                  <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-orange-400 font-semibold">
{t('common.eur')}
                  </div>
                </div>
                {isConnected && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">
                      {poolConfig.token} {t('modal.balance')}: {
                        poolConfig.token === 'VISTA' ? vistaBalance :
                        poolConfig.token === '4WMM' ? mirrorMoneyBalance : geuroBalance
                      } {poolConfig.token}
                    </div>
                    <div className="text-xs text-orange-400">
{t('modal.minimum_note').replace('{amount}', poolConfig.minStakeEuro.toString()).replace('{rate}', poolConfig.weeklyRate.toString())}
                    </div>
                  </div>
                )}
                {!isConnected && (
                  <div className="text-sm text-orange-400">
{t('modal.connect_wallet')}
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium mb-2">{t('modal.estimated_returns')}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('modal.weekly')}:</span>
                    <span className="text-orange-400">
                      {stakeAmount ? `€${((Number.parseFloat(stakeAmount) * poolConfig.weeklyRate) / 100).toFixed(2)}` : '€0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('modal.monthly')}:</span>
                    <span className="text-orange-400">
                      {stakeAmount ? `€${((Number.parseFloat(stakeAmount) * poolConfig.weeklyRate * 4.33) / 100).toFixed(2)}` : '€0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('modal.yearly')}:</span>
                    <span className="text-orange-400">
                      {stakeAmount ? `€${((Number.parseFloat(stakeAmount) * poolConfig.apr) / 100).toFixed(2)}` : '€0.00'}
                    </span>
                  </div>
                </div>
                {stakeAmount && Number.parseFloat(stakeAmount) >= poolConfig.minStakeEuro && (
                  <div className="mt-3 p-2 bg-green-500/10 rounded border border-green-500/20">
                    <p className="text-xs text-green-400 text-center">
{t('modal.meets_requirements')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={closeStakingModal} className="flex-1">
{t('modal.btn_cancel')}
              </Button>
              <Button
                className={`flex-1 bg-orange-600 hover:bg-orange-700 factory-glow ${isLoading ? 'industrial-loading production-line-active' : ''}`}
                onClick={() => handleStake(poolType)}
                disabled={isLoading || !isConnected || !stakeAmount || Number.parseFloat(stakeAmount) < poolConfig.minStakeEuro}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin gear-rotate" />
                ) : (
                  <Factory className="w-4 h-4 mr-2 gear-rotate-slow" />
                )}
{isLoading ? 'Verarbeitung...' : `€${stakeAmount || '0'} Staken`}
              </Button>
            </div>
          </div>
        </Modal>
        )
      })}
    </div>
  )
}

export default HomePage
