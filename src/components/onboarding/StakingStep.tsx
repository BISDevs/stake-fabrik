import type React from 'react'
import { Zap, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'
import type { StakingSelection } from '../../types/onboarding'
import { POOL_CONFIGS } from '../../hooks/useStaking'
import { formatCurrency } from '../../lib/utils'

interface StakingStepProps {
  data: Partial<StakingSelection>
  errors: Record<string, string>
  paymentAmount: number
  onUpdate: (data: Partial<StakingSelection>) => void
}

const StakingStep: React.FC<StakingStepProps> = ({ data, errors, paymentAmount, onUpdate }) => {
  const tokens = [
    {
      symbol: 'VISTA' as const,
      name: 'Vista Finance',
      description: 'Stabiler Token mit konstanter Performance',
      icon: '📈',
      color: 'blue'
    },
    {
      symbol: '4WMM' as const,
      name: '4-Way Mirror Money',
      description: 'Innovativer Multi-Mirror Mechanismus',
      icon: '🔄',
      color: 'purple'
    },
    {
      symbol: 'GEURO' as const,
      name: 'GEURO',
      description: 'Euro-gekoppelter stabiler Token',
      icon: '💶',
      color: 'green'
    }
  ]

  const plans = [
    {
      id: 'starter' as const,
      name: 'Starter',
      weeklyRate: 0.5,
      minAmount: 250,
      description: 'Perfekt für Einsteiger',
      badge: 'Beginner',
      color: 'orange'
    },
    {
      id: 'standard' as const,
      name: 'Standard',
      weeklyRate: 1.0,
      minAmount: 500,
      description: 'Optimaler Ertrag für die meisten',
      badge: 'Beliebt',
      color: 'purple'
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      weeklyRate: 2.0,
      minAmount: 1000,
      description: 'Maximale Rendite für Profis',
      badge: 'Premium',
      color: 'emerald'
    }
  ]

  const handleTokenChange = (token: 'VISTA' | '4WMM' | 'GEURO') => {
    const newData = { ...data, token }
    calculateReturns(newData)
  }

  const handlePlanChange = (plan: 'starter' | 'standard' | 'premium') => {
    const newData = { ...data, plan, amount: paymentAmount }
    calculateReturns(newData)
  }

  const calculateReturns = (stakingData: Partial<StakingSelection>) => {
    if (!stakingData.plan || !paymentAmount) {
      onUpdate(stakingData)
      return
    }

    const selectedPlan = plans.find(p => p.id === stakingData.plan)
    if (!selectedPlan) {
      onUpdate(stakingData)
      return
    }

    const weeklyReturn = (paymentAmount * selectedPlan.weeklyRate) / 100
    const monthlyReturn = weeklyReturn * 4.33 // Average weeks per month
    const yearlyReturn = weeklyReturn * 52

    onUpdate({
      ...stakingData,
      amount: paymentAmount,
      estimatedReturns: {
        weekly: weeklyReturn,
        monthly: monthlyReturn,
        yearly: yearlyReturn
      }
    })
  }

  const selectedToken = tokens.find(t => t.symbol === data.token)
  const selectedPlan = plans.find(p => p.id === data.plan)
  const canStake = data.token && data.plan && paymentAmount >= (selectedPlan?.minAmount || 250)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Staking Configuration</h3>
        <p className="text-gray-400">
          Wählen Sie Ihren bevorzugten Token und Staking-Plan für optimale Renditen auf der BNB Smart Chain.
        </p>
      </div>

      {/* Available Amount */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-orange-400">Verfügbarer Betrag</h4>
            <p className="text-sm text-orange-300">Aus Ihrer Einzahlung</p>
          </div>
          <div className="text-2xl font-bold text-orange-400">
            {formatCurrency(paymentAmount)}
          </div>
        </div>
      </div>

      {/* Token Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Token auswählen</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => handleTokenChange(token.symbol)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                data.token === token.symbol
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{token.icon}</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-white mb-1">{token.symbol}</h5>
                  <p className="text-sm font-medium text-gray-300 mb-2">{token.name}</p>
                  <p className="text-xs text-gray-400">{token.description}</p>
                </div>
                {data.token === token.symbol && (
                  <CheckCircle2 className="w-5 h-5 text-orange-400" />
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.token && (
          <p className="text-red-400 text-sm">{errors.token}</p>
        )}
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Staking-Plan auswählen</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isAffordable = paymentAmount >= plan.minAmount
            const isSelected = data.plan === plan.id

            return (
              <button
                key={plan.id}
                onClick={() => isAffordable && handlePlanChange(plan.id)}
                disabled={!isAffordable}
                className={`relative p-6 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/10'
                    : isAffordable
                      ? 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                      : 'border-gray-700 bg-gray-800/30 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Plan Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    plan.color === 'orange' ? 'bg-orange-500 text-white' :
                    plan.color === 'purple' ? 'bg-purple-500 text-white' :
                    'bg-emerald-500 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className={`text-xl font-bold mb-2 ${
                      plan.color === 'orange' ? 'text-orange-400' :
                      plan.color === 'purple' ? 'text-purple-400' :
                      'text-emerald-400'
                    }`}>
                      {plan.name}
                    </h5>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center py-4 bg-gray-700/30 rounded-lg">
                      <div className={`text-3xl font-bold ${
                        plan.color === 'orange' ? 'text-orange-400' :
                        plan.color === 'purple' ? 'text-purple-400' :
                        'text-emerald-400'
                      }`}>
                        {plan.weeklyRate}%
                      </div>
                      <div className="text-sm text-gray-400">pro Woche</div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mindestbetrag:</span>
                        <span className={`font-semibold ${isAffordable ? 'text-white' : 'text-red-400'}`}>
                          {formatCurrency(plan.minAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Jährlich (ca.):</span>
                        <span className="text-white font-semibold">
                          {(plan.weeklyRate * 52).toFixed(1)}% APR
                        </span>
                      </div>
                    </div>

                    {!isAffordable && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                        <p className="text-red-400 text-xs text-center">
                          Mindestbetrag nicht erreicht
                        </p>
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <div className="flex items-center justify-center pt-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
        {errors.plan && (
          <p className="text-red-400 text-sm">{errors.plan}</p>
        )}
      </div>

      {/* Estimated Returns */}
      {data.estimatedReturns && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Geschätzte Rendite</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Wöchentlich</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(data.estimatedReturns.weekly)}
              </div>
              <div className="text-sm text-gray-400">
                Jede Woche automatisch
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-medium">Monatlich</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(data.estimatedReturns.monthly)}
              </div>
              <div className="text-sm text-gray-400">
                Durchschnittlich pro Monat
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">Jährlich</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(data.estimatedReturns.yearly)}
              </div>
              <div className="text-sm text-gray-400">
                Bei konstanter Performance
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staking Summary */}
      {canStake && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
          <h5 className="font-semibold text-green-400 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Staking Zusammenfassung
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Token:</span>
                <div className="flex items-center space-x-2">
                  <span>{selectedToken?.icon}</span>
                  <span className="text-white font-semibold">
                    {selectedToken?.symbol} ({selectedToken?.name})
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-white font-semibold">{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Staking-Betrag:</span>
                <span className="text-white font-semibold">{formatCurrency(paymentAmount)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Wöchentliche Rate:</span>
                <span className="text-green-400 font-semibold">{selectedPlan?.weeklyRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nächste Auszahlung:</span>
                <span className="text-white font-semibold">
                  {formatCurrency(data.estimatedReturns?.weekly || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lock-Zeit:</span>
                <span className="text-yellow-400 font-semibold">1 Woche</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          <h5 className="font-semibold text-blue-400">Wichtige Hinweise</h5>
        </div>
        <ul className="text-sm text-blue-300 space-y-1">
          <li>• Alle Auszahlungen erfolgen automatisch wöchentlich</li>
          <li>• Minimum Lock-Zeit beträgt 1 Woche nach dem Staking</li>
          <li>• Renditen basieren auf aktuellen Marktbedingungen</li>
          <li>• Smart Contracts sind auditiert und verifiziert</li>
          <li>• Jederzeit einsehbar auf BSCScan</li>
        </ul>
      </div>

      {/* Error Display */}
      {(errors.token || errors.plan) && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              {errors.token && <p className="text-red-400 text-sm">{errors.token}</p>}
              {errors.plan && <p className="text-red-400 text-sm">{errors.plan}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation */}
      {canStake && (
        <div className="text-center bg-orange-500/5 border border-orange-500/20 rounded-lg p-6">
          <h5 className="text-xl font-bold text-white mb-2">Bereit zum Staken!</h5>
          <p className="text-gray-400 mb-4">
            Ihre Konfiguration ist vollständig. Klicken Sie auf "Registrierung abschließen" um zu starten.
          </p>
          <div className="flex items-center justify-center space-x-2 text-orange-400">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">
              Erste Auszahlung in ca. 7 Tagen: {formatCurrency(data.estimatedReturns?.weekly || 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default StakingStep
