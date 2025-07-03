import type React from 'react'
import { useState } from 'react'
import { CreditCard, DollarSign, Bitcoin, Shield, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import type { PaymentData } from '../../types/onboarding'
import { formatCurrency } from '../../lib/utils'

interface PaymentStepProps {
  data: Partial<PaymentData>
  errors: Record<string, string>
  onUpdate: (data: Partial<PaymentData>) => void
}

const PaymentStep: React.FC<PaymentStepProps> = ({ data, errors, onUpdate }) => {
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleMethodChange = (method: 'sepa' | 'credit_card' | 'crypto') => {
    onUpdate({
      ...data,
      method,
      // Clear method-specific data when switching
      sepaDetails: method === 'sepa' ? data.sepaDetails : undefined,
      cardDetails: method === 'credit_card' ? data.cardDetails : undefined,
      cryptoDetails: method === 'crypto' ? data.cryptoDetails : undefined
    })
  }

  const handleAmountChange = (amount: string) => {
    const numAmount = Number.parseFloat(amount)
    onUpdate({
      ...data,
      amount: numAmount,
      currency: 'EUR'
    })
  }

  const handleSepaChange = (field: keyof NonNullable<PaymentData['sepaDetails']>, value: string) => {
    onUpdate({
      ...data,
      sepaDetails: {
        ...data.sepaDetails,
        [field]: value
      }
    })
  }

  const handleCardChange = (field: keyof NonNullable<PaymentData['cardDetails']>, value: string) => {
    onUpdate({
      ...data,
      cardDetails: {
        ...data.cardDetails,
        [field]: value
      }
    })
  }

  const handleCryptoChange = (field: keyof NonNullable<PaymentData['cryptoDetails']>, value: string) => {
    onUpdate({
      ...data,
      cryptoDetails: {
        ...data.cryptoDetails,
        [field]: value
      }
    })
  }

  const simulatePayment = async () => {
    setProcessingPayment(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setPaymentSuccess(true)
    setProcessingPayment(false)
  }

  const paymentMethods = [
    {
      id: 'sepa' as const,
      title: 'SEPA Überweisung',
      description: 'Kostenfrei, 1-2 Werktage',
      icon: <DollarSign className="w-6 h-6" />,
      popular: true,
      fees: '0%',
      processingTime: '1-2 Werktage'
    },
    {
      id: 'credit_card' as const,
      title: 'Kreditkarte',
      description: 'Sofortige Verarbeitung',
      icon: <CreditCard className="w-6 h-6" />,
      popular: false,
      fees: '2.9%',
      processingTime: 'Sofort'
    },
    {
      id: 'crypto' as const,
      title: 'Kryptowährung',
      description: 'BTC, ETH, USDT, USDC',
      icon: <Bitcoin className="w-6 h-6" />,
      popular: false,
      fees: '1%',
      processingTime: '10-30 Min'
    }
  ]

  const minAmounts = {
    sepa: 250,
    credit_card: 250,
    crypto: 250
  }

  const currentMinAmount = data.method ? minAmounts[data.method] : 250

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Einzahlung</h3>
        <p className="text-gray-400">
          Wählen Sie Ihre bevorzugte Zahlungsmethode und den Betrag für Ihr erstes Investment.
        </p>
      </div>

      {/* Amount Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Investitionsbetrag</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Betrag in Euro *
            </label>
            <div className="relative">
              <Input
                type="number"
                min={currentMinAmount}
                step="50"
                value={data.amount || ''}
                onChange={(e) => handleAmountChange(e.target.value)}
                className={`text-lg font-semibold ${
                  errors.amount ? 'border-red-500 focus:border-red-400' : ''
                }`}
                placeholder={`Mindestens ${formatCurrency(currentMinAmount)}`}
              />
              <span className="absolute right-3 top-3 text-gray-400 font-medium">EUR</span>
            </div>
            {errors.amount && (
              <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[250, 500, 1000, 2500].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => handleAmountChange(amount.toString())}
                className={`border-gray-600 hover:border-orange-500 ${
                  data.amount === amount ? 'border-orange-500 bg-orange-500/10' : ''
                }`}
              >
                {formatCurrency(amount)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Zahlungsmethode</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodChange(method.id)}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                data.method === method.id
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              {method.popular && (
                <span className="absolute top-2 right-2 text-xs bg-orange-500 text-white px-2 py-1 rounded">
                  Empfohlen
                </span>
              )}
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  data.method === method.id ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-white mb-1">{method.title}</h5>
                  <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Gebühren: {method.fees}</span>
                    <span className="text-gray-500">{method.processingTime}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-red-400 text-sm">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Payment Details Forms */}
      {data.method === 'sepa' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">SEPA Bankverbindung</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kontoinhaber *
              </label>
              <Input
                value={data.sepaDetails?.accountHolder || ''}
                onChange={(e) => handleSepaChange('accountHolder', e.target.value)}
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                IBAN *
              </label>
              <Input
                value={data.sepaDetails?.iban || ''}
                onChange={(e) => handleSepaChange('iban', e.target.value)}
                placeholder="DE89 3704 0044 0532 0130 00"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                BIC (optional)
              </label>
              <Input
                value={data.sepaDetails?.bic || ''}
                onChange={(e) => handleSepaChange('bic', e.target.value)}
                placeholder="COBADEFFXXX"
              />
            </div>
          </div>
        </div>
      )}

      {data.method === 'credit_card' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Kreditkarten-Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Karteninhaber *
              </label>
              <Input
                value={data.cardDetails?.cardHolder || ''}
                onChange={(e) => handleCardChange('cardHolder', e.target.value)}
                placeholder="Max Mustermann"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kartennummer *
              </label>
              <Input
                value={data.cardDetails?.cardNumber || ''}
                onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ablaufmonat *
              </label>
              <Input
                value={data.cardDetails?.expiryMonth || ''}
                onChange={(e) => handleCardChange('expiryMonth', e.target.value)}
                placeholder="MM"
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ablaufjahr *
              </label>
              <Input
                value={data.cardDetails?.expiryYear || ''}
                onChange={(e) => handleCardChange('expiryYear', e.target.value)}
                placeholder="JJJJ"
                maxLength={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CVV *
              </label>
              <Input
                value={data.cardDetails?.cvv || ''}
                onChange={(e) => handleCardChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                type="password"
              />
            </div>
          </div>
        </div>
      )}

      {data.method === 'crypto' && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Kryptowährungs-Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Von Währung *
              </label>
              <select
                value={data.cryptoDetails?.fromCurrency || ''}
                onChange={(e) => handleCryptoChange('fromCurrency', e.target.value)}
                className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="">Wählen Sie eine Währung</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="USDC">USD Coin (USDC)</option>
                <option value="BNB">BNB (BNB)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Netzwerk *
              </label>
              <select
                value={data.cryptoDetails?.network || ''}
                onChange={(e) => handleCryptoChange('network', e.target.value)}
                className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="">Wählen Sie ein Netzwerk</option>
                <option value="BTC">Bitcoin Network</option>
                <option value="ETH">Ethereum (ERC-20)</option>
                <option value="BSC">BNB Smart Chain (BEP-20)</option>
                <option value="TRX">Tron (TRC-20)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Security Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <h5 className="font-semibold text-blue-400">Sicherheit & Datenschutz</h5>
        </div>
        <ul className="text-sm text-blue-300 space-y-1">
          <li>• Alle Zahlungsdaten werden SSL-verschlüsselt übertragen</li>
          <li>• PCI DSS Level 1 zertifizierte Zahlungsabwicklung</li>
          <li>• Ihre Bankdaten werden nicht auf unseren Servern gespeichert</li>
          <li>• 3D Secure für zusätzliche Kreditkarten-Sicherheit</li>
        </ul>
      </div>

      {/* Payment Summary */}
      {data.method && data.amount && data.amount >= currentMinAmount && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h5 className="font-semibold text-white mb-4">Zahlungszusammenfassung</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Investitionsbetrag:</span>
              <span className="text-white font-semibold">{formatCurrency(data.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Zahlungsmethode:</span>
              <span className="text-white">
                {paymentMethods.find(m => m.id === data.method)?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gebühren:</span>
              <span className="text-white">
                {paymentMethods.find(m => m.id === data.method)?.fees}
              </span>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between text-lg">
              <span className="text-white font-semibold">Gesamt:</span>
              <span className="text-orange-400 font-bold">
                {formatCurrency(data.amount)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success */}
      {paymentSuccess && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-green-400 mb-2">Zahlung erfolgreich!</h4>
          <p className="text-green-300">
            Ihre Einzahlung wird verarbeitet. Sie können nun mit dem Staking fortfahren.
          </p>
        </div>
      )}
    </div>
  )
}

export default PaymentStep
