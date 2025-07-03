import type React from 'react'
import { User, Mail, Phone, Calendar, MapPin, Flag } from 'lucide-react'
import type { PersonalData } from '../../types/onboarding'

interface PersonalDataStepProps {
  data: Partial<PersonalData>
  errors: Record<string, string>
  onUpdate: (data: Partial<PersonalData>) => void
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({ data, errors, onUpdate }) => {
  const handleInputChange = (field: keyof PersonalData, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  const handleAddressChange = (field: keyof PersonalData['address'], value: string) => {
    onUpdate({
      ...data,
      address: {
        ...data.address,
        [field]: value
      }
    })
  }

  const countries = [
    'Deutschland', 'Österreich', 'Schweiz', 'Niederlande', 'Belgien',
    'Frankreich', 'Italien', 'Spanien', 'Portugal', 'Polen', 'Andere'
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Persönliche Informationen</h3>
        <p className="text-gray-400">
          Bitte geben Sie Ihre persönlichen Daten ein. Diese werden für die KYC-Verifizierung benötigt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Vorname *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={data.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.firstName ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-orange-500'
              }`}
              placeholder="Max"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nachname *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={data.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.lastName ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-orange-500'
              }`}
              placeholder="Mustermann"
            />
          </div>
          {errors.lastName && (
            <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            E-Mail Adresse *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.email ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-orange-500'
              }`}
              placeholder="max@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Telefonnummer *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.phone ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-orange-500'
              }`}
              placeholder="+49 123 456789"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Birth & Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Geburtsdatum *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={data.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.dateOfBirth ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-orange-500'
              }`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Staatsangehörigkeit *
          </label>
          <div className="relative">
            <Flag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={data.nationality || ''}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                errors.nationality ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-orange-500'
              }`}
            >
              <option value="">Bitte wählen</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          {errors.nationality && (
            <p className="text-red-400 text-sm mt-1">{errors.nationality}</p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div className="border-t border-gray-700 pt-8">
        <div className="flex items-center mb-6">
          <MapPin className="w-5 h-5 text-orange-400 mr-2" />
          <h4 className="text-xl font-semibold text-white">Adresse</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Straße *
            </label>
            <input
              type="text"
              value={data.address?.street || ''}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              placeholder="Musterstraße"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hausnummer *
            </label>
            <input
              type="text"
              value={data.address?.houseNumber || ''}
              onChange={(e) => handleAddressChange('houseNumber', e.target.value)}
              className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              placeholder="123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PLZ *
            </label>
            <input
              type="text"
              value={data.address?.postalCode || ''}
              onChange={(e) => handleAddressChange('postalCode', e.target.value)}
              className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              placeholder="12345"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stadt *
            </label>
            <input
              type="text"
              value={data.address?.city || ''}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              placeholder="Musterstadt"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Land *
            </label>
            <select
              value={data.address?.country || ''}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="">Bitte wählen</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
        <p className="text-orange-400 text-sm">
          <strong>Datenschutz:</strong> Ihre Daten werden verschlüsselt übertragen und gemäß DSGVO verarbeitet.
          Sie werden ausschließlich für die KYC-Verifizierung und rechtliche Compliance verwendet.
        </p>
      </div>
    </div>
  )
}

export default PersonalDataStep
