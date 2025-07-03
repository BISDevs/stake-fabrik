import type React from 'react'
import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage, type Language } from '../contexts/LanguageContext'
import { Button } from './ui/button'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: Array<{ code: Language; name: string; flag: string }> = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="border-orange-600/50 text-orange-400 hover:bg-orange-500/10 px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm"
      >
        <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
        <ChevronDown className="w-3 h-3 ml-1 lg:ml-2" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 bg-gray-900 border border-orange-500/20 rounded-lg shadow-xl min-w-[160px] overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center px-4 py-3 text-sm hover:bg-orange-500/10 transition-colors ${
                  language === lang.code ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="text-lg mr-3">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher
