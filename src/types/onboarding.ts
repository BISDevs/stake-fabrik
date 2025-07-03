export interface PersonalData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string
  address: {
    street: string
    houseNumber: string
    postalCode: string
    city: string
    country: string
  }
}

export interface KYCDocument {
  type: 'passport' | 'id_card' | 'drivers_license'
  frontImage: File | null
  backImage: File | null
  selfieImage: File | null
}

export interface KYCData {
  documents: KYCDocument[]
  verificationType: 'basic' | 'enhanced'
  status: 'pending' | 'verified' | 'rejected' | 'review'
  submittedAt?: Date
  verifiedAt?: Date
}

export interface PaymentData {
  method: 'sepa' | 'credit_card' | 'crypto'
  amount: number
  currency: 'EUR'
  sepaDetails?: {
    iban: string
    bic: string
    accountHolder: string
  }
  cardDetails?: {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvv: string
    cardHolder: string
  }
  cryptoDetails?: {
    fromCurrency: string
    toAddress: string
    network: string
  }
}

export interface StakingSelection {
  token: 'VISTA' | '4WMM' | 'GEURO'
  plan: 'starter' | 'standard' | 'premium'
  amount: number
  estimatedReturns: {
    weekly: number
    monthly: number
    yearly: number
  }
}

export interface OnboardingState {
  currentStep: number
  personalData: Partial<PersonalData>
  kycData: Partial<KYCData>
  walletConnected: boolean
  walletAddress?: string
  paymentData: Partial<PaymentData>
  stakingSelection: Partial<StakingSelection>
  isCompleted: boolean
  errors: Record<string, string>
}

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Persönliche Daten',
    description: 'Grundlegende Informationen',
    icon: '👤'
  },
  {
    id: 2,
    title: 'KYC Verifizierung',
    description: 'Identitätsnachweis',
    icon: '📋'
  },
  {
    id: 3,
    title: 'Wallet Verbindung',
    description: 'BNB Smart Chain',
    icon: '🔗'
  },
  {
    id: 4,
    title: 'Zahlung',
    description: 'Einzahlung & Payment',
    icon: '💳'
  },
  {
    id: 5,
    title: 'Staking',
    description: 'Plan auswählen',
    icon: '⚡'
  }
] as const

export type OnboardingStep = typeof ONBOARDING_STEPS[number]
