import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { ONBOARDING_STEPS, type OnboardingState } from '../types/onboarding'
import PersonalDataStep from '../components/onboarding/PersonalDataStep'
import KYCStep from '../components/onboarding/KYCStep'
import WalletStep from '../components/onboarding/WalletStep'
import PaymentStep from '../components/onboarding/PaymentStep'
import StakingStep from '../components/onboarding/StakingStep'
import { toast } from 'react-hot-toast'

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: 1,
    personalData: {},
    kycData: {},
    walletConnected: false,
    paymentData: {},
    stakingSelection: {},
    isCompleted: false,
    errors: {}
  })

  const [isLoading, setIsLoading] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('stake-fabrik-onboarding')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setOnboardingState(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Error loading onboarding state:', error)
      }
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('stake-fabrik-onboarding', JSON.stringify(onboardingState))
  }, [onboardingState])

  const updateOnboardingState = (updates: Partial<OnboardingState>) => {
    setOnboardingState(prev => ({ ...prev, ...updates }))
  }

  const nextStep = async () => {
    if (await validateCurrentStep()) {
      if (onboardingState.currentStep < ONBOARDING_STEPS.length) {
        updateOnboardingState({ currentStep: onboardingState.currentStep + 1 })
        window.scrollTo(0, 0)
      } else {
        // Complete onboarding
        await completeOnboarding()
      }
    }
  }

  const prevStep = () => {
    if (onboardingState.currentStep > 1) {
      updateOnboardingState({ currentStep: onboardingState.currentStep - 1 })
      window.scrollTo(0, 0)
    }
  }

  const validateCurrentStep = async (): Promise<boolean> => {
    const errors: Record<string, string> = {}

    switch (onboardingState.currentStep) {
      case 1: // Personal Data
        if (!onboardingState.personalData.firstName) errors.firstName = 'Vorname ist erforderlich'
        if (!onboardingState.personalData.lastName) errors.lastName = 'Nachname ist erforderlich'
        if (!onboardingState.personalData.email) errors.email = 'E-Mail ist erforderlich'
        if (!onboardingState.personalData.phone) errors.phone = 'Telefonnummer ist erforderlich'
        if (!onboardingState.personalData.dateOfBirth) errors.dateOfBirth = 'Geburtsdatum ist erforderlich'
        break

      case 2: // KYC
        if (!onboardingState.kycData.documents?.length) {
          errors.documents = 'Mindestens ein Dokument ist erforderlich'
        }
        break

      case 3: // Wallet
        if (!onboardingState.walletConnected) {
          errors.wallet = 'Wallet-Verbindung ist erforderlich'
        }
        break

      case 4: // Payment
        if (!onboardingState.paymentData.method) {
          errors.paymentMethod = 'Zahlungsmethode ist erforderlich'
        }
        if (!onboardingState.paymentData.amount || onboardingState.paymentData.amount < 250) {
          errors.amount = 'Mindestbetrag ist €250'
        }
        break

      case 5: // Staking
        if (!onboardingState.stakingSelection.token) {
          errors.token = 'Token-Auswahl ist erforderlich'
        }
        if (!onboardingState.stakingSelection.plan) {
          errors.plan = 'Plan-Auswahl ist erforderlich'
        }
        break
    }

    updateOnboardingState({ errors })

    if (Object.keys(errors).length > 0) {
      toast.error('Bitte überprüfen Sie Ihre Eingaben')
      return false
    }

    return true
  }

  const completeOnboarding = async () => {
    setIsLoading(true)
    try {
      // Simulate API calls for final processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      updateOnboardingState({ isCompleted: true })
      localStorage.removeItem('stake-fabrik-onboarding')
      toast.success('Registrierung erfolgreich abgeschlossen!')

      // Redirect to dashboard
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      toast.error('Fehler beim Abschließen der Registrierung')
    } finally {
      setIsLoading(false)
    }
  }

  const renderCurrentStep = () => {
    switch (onboardingState.currentStep) {
      case 1:
        return (
          <PersonalDataStep
            data={onboardingState.personalData}
            errors={onboardingState.errors}
            onUpdate={(data) => updateOnboardingState({ personalData: data })}
          />
        )
      case 2:
        return (
          <KYCStep
            data={onboardingState.kycData}
            errors={onboardingState.errors}
            onUpdate={(data) => updateOnboardingState({ kycData: data })}
          />
        )
      case 3:
        return (
          <WalletStep
            walletConnected={onboardingState.walletConnected}
            walletAddress={onboardingState.walletAddress}
            errors={onboardingState.errors}
            onUpdate={(connected, address) => updateOnboardingState({
              walletConnected: connected,
              walletAddress: address
            })}
          />
        )
      case 4:
        return (
          <PaymentStep
            data={onboardingState.paymentData}
            errors={onboardingState.errors}
            onUpdate={(data) => updateOnboardingState({ paymentData: data })}
          />
        )
      case 5:
        return (
          <StakingStep
            data={onboardingState.stakingSelection}
            errors={onboardingState.errors}
            paymentAmount={onboardingState.paymentData.amount || 0}
            onUpdate={(data) => updateOnboardingState({ stakingSelection: data })}
          />
        )
      default:
        return null
    }
  }

  const currentStepInfo = ONBOARDING_STEPS[onboardingState.currentStep - 1]
  const progress = (onboardingState.currentStep / ONBOARDING_STEPS.length) * 100

  if (onboardingState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Willkommen bei Stake Fabrik!</h1>
            <p className="text-gray-400 text-lg">
              Ihre Registrierung wurde erfolgreich abgeschlossen. Sie werden automatisch weitergeleitet...
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
            <span className="text-orange-400">Weiterleitung...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="fabrik-logo">
                <span className="fabrik-brand text-xl font-bold">STAKE</span>
                <span className="text-xl font-bold text-white">FABRIK</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Schritt {onboardingState.currentStep} von {ONBOARDING_STEPS.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 h-2">
        <div
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 transition-all duration-500 conveyor-belt"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {ONBOARDING_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    ${index + 1 === onboardingState.currentStep
                      ? 'bg-orange-500 text-white animate-pulse'
                      : index + 1 < onboardingState.currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }
                  `}>
                    {index + 1 < onboardingState.currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div className={`
                      w-16 h-1 mx-2
                      ${index + 1 < onboardingState.currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-700'
                      }
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentStepInfo?.title}
              </h2>
              <p className="text-gray-400">
                {currentStepInfo?.description}
              </p>
            </div>
          </div>

          {/* Current Step Content */}
          <div className="glass-card p-8 mb-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={onboardingState.currentStep === 1}
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>

            <Button
              onClick={nextStep}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 factory-glow"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : onboardingState.currentStep === ONBOARDING_STEPS.length ? (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              {isLoading
                ? 'Verarbeitung...'
                : onboardingState.currentStep === ONBOARDING_STEPS.length
                  ? 'Registrierung abschließen'
                  : 'Weiter'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
