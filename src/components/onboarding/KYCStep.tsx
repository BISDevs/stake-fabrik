import type React from 'react'
import { useState, useRef } from 'react'
import { FileText, Upload, Camera, CheckCircle2, AlertCircle, X, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import type { KYCData, KYCDocument } from '../../types/onboarding'

interface KYCStepProps {
  data: Partial<KYCData>
  errors: Record<string, string>
  onUpdate: (data: Partial<KYCData>) => void
}

const KYCStep: React.FC<KYCStepProps> = ({ data, errors, onUpdate }) => {
  const [selectedDocType, setSelectedDocType] = useState<'passport' | 'id_card' | 'drivers_license'>('id_card')
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const frontFileRef = useRef<HTMLInputElement>(null)
  const backFileRef = useRef<HTMLInputElement>(null)
  const selfieFileRef = useRef<HTMLInputElement>(null)

  const documentTypes = [
    {
      type: 'id_card' as const,
      title: 'Personalausweis',
      description: 'Vorder- und Rückseite erforderlich',
      icon: '🆔',
      requiresBack: true
    },
    {
      type: 'passport' as const,
      title: 'Reisepass',
      description: 'Nur Vorderseite erforderlich',
      icon: '📘',
      requiresBack: false
    },
    {
      type: 'drivers_license' as const,
      title: 'Führerschein',
      description: 'Vorder- und Rückseite erforderlich',
      icon: '🪪',
      requiresBack: true
    }
  ]

  const currentDocument = data.documents?.find(doc => doc.type === selectedDocType) || {
    type: selectedDocType,
    frontImage: null,
    backImage: null,
    selfieImage: null
  }

  const handleFileUpload = (type: 'front' | 'back' | 'selfie', file: File) => {
    // Simulate upload progress
    const uploadId = `${selectedDocType}-${type}`
    setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }))

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[uploadId] || 0
        if (current >= 100) {
          clearInterval(interval)
          return prev
        }
        return { ...prev, [uploadId]: current + 10 }
      })
    }, 100)

    // Update document data
    const updatedDocuments = data.documents?.filter(doc => doc.type !== selectedDocType) || []
    const updatedDocument: KYCDocument = {
      ...currentDocument,
      [type === 'front' ? 'frontImage' : type === 'back' ? 'backImage' : 'selfieImage']: file
    }

    onUpdate({
      ...data,
      documents: [...updatedDocuments, updatedDocument]
    })
  }

  const handleFileSelect = (type: 'front' | 'back' | 'selfie') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert('Datei zu groß. Maximale Größe: 5MB')
          return
        }
        handleFileUpload(type, file)
      }
    }
    input.click()
  }

  const selectedDocTypeInfo = documentTypes.find(doc => doc.type === selectedDocType)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">KYC Verifizierung</h3>
        <p className="text-gray-400">
          Für die Nutzung unserer Plattform benötigen wir eine Identitätsverifizierung gemäß den regulatorischen Anforderungen.
        </p>
      </div>

      {/* Document Type Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Dokument-Typ auswählen</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documentTypes.map((docType) => (
            <button
              key={docType.type}
              onClick={() => setSelectedDocType(docType.type)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedDocType === docType.type
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{docType.icon}</span>
                <div>
                  <h5 className="font-semibold text-white">{docType.title}</h5>
                  <p className="text-sm text-gray-400">{docType.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Document Upload */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-white">Dokumente hochladen</h4>

        {/* Front Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              {selectedDocTypeInfo?.type === 'passport' ? 'Reisepass' : 'Vorderseite'} *
            </label>
            <DocumentUploadBox
              file={currentDocument.frontImage}
              onUpload={() => handleFileSelect('front')}
              progress={uploadProgress[`${selectedDocType}-front`]}
              type="front"
            />
          </div>

          {/* Back Image (if required) */}
          {selectedDocTypeInfo?.requiresBack && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Rückseite *
              </label>
              <DocumentUploadBox
                file={currentDocument.backImage}
                onUpload={() => handleFileSelect('back')}
                progress={uploadProgress[`${selectedDocType}-back`]}
                type="back"
              />
            </div>
          )}
        </div>

        {/* Selfie */}
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Selfie mit Dokument *
          </label>
          <DocumentUploadBox
            file={currentDocument.selfieImage}
            onUpload={() => handleFileSelect('selfie')}
            progress={uploadProgress[`${selectedDocType}-selfie`]}
            type="selfie"
          />
          <p className="text-xs text-gray-400 mt-2">
            Halten Sie das Dokument neben Ihr Gesicht, sodass beide klar erkennbar sind.
          </p>
        </div>
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h5 className="font-semibold text-blue-400 mb-2">Upload-Richtlinien</h5>
        <ul className="text-sm text-blue-300 space-y-1">
          <li>• Dateiformate: JPG, PNG, PDF (max. 5MB)</li>
          <li>• Hohe Auflösung und gute Beleuchtung</li>
          <li>• Alle Texte und Details müssen lesbar sein</li>
          <li>• Keine Reflexionen oder Schatten</li>
          <li>• Dokument vollständig im Bild</li>
        </ul>
      </div>

      {/* Verification Status */}
      {data.status && (
        <div className={`p-4 rounded-lg border ${
          data.status === 'verified' ? 'bg-green-500/10 border-green-500/20' :
          data.status === 'pending' ? 'bg-yellow-500/10 border-yellow-500/20' :
          data.status === 'rejected' ? 'bg-red-500/10 border-red-500/20' :
          'bg-blue-500/10 border-blue-500/20'
        }`}>
          <div className="flex items-center space-x-2">
            {data.status === 'verified' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
            {data.status === 'pending' && <Upload className="w-5 h-5 text-yellow-400" />}
            {data.status === 'rejected' && <AlertCircle className="w-5 h-5 text-red-400" />}
            <span className={`font-semibold ${
              data.status === 'verified' ? 'text-green-400' :
              data.status === 'pending' ? 'text-yellow-400' :
              data.status === 'rejected' ? 'text-red-400' :
              'text-blue-400'
            }`}>
              {data.status === 'verified' && 'Verifiziert ✓'}
              {data.status === 'pending' && 'Wird überprüft...'}
              {data.status === 'rejected' && 'Abgelehnt - Bitte neu hochladen'}
              {data.status === 'review' && 'In manueller Prüfung'}
            </span>
          </div>
        </div>
      )}

      {errors.documents && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">{errors.documents}</p>
        </div>
      )}
    </div>
  )
}

// Document Upload Box Component
interface DocumentUploadBoxProps {
  file: File | null
  onUpload: () => void
  progress?: number
  type: 'front' | 'back' | 'selfie'
}

const DocumentUploadBox: React.FC<DocumentUploadBoxProps> = ({ file, onUpload, progress, type }) => {
  const [showPreview, setShowPreview] = useState(false)

  const getPreviewUrl = (file: File): string => {
    return URL.createObjectURL(file)
  }

  return (
    <div className="relative">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          file
            ? 'border-green-500 bg-green-500/10'
            : 'border-gray-600 bg-gray-800/50 hover:border-orange-500 hover:bg-orange-500/5'
        }`}
        onClick={onUpload}
      >
        {file ? (
          <div className="space-y-2">
            <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
            <p className="text-green-400 font-medium">{file.name}</p>
            <p className="text-xs text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <div className="flex justify-center space-x-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowPreview(true)
                }}
                className="border-green-500/50 text-green-400"
              >
                <Eye className="w-3 h-3 mr-1" />
                Vorschau
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onUpload()
                }}
                className="border-orange-500/50 text-orange-400"
              >
                <Upload className="w-3 h-3 mr-1" />
                Ersetzen
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {type === 'selfie' ? (
              <Camera className="w-8 h-8 text-gray-400 mx-auto" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            )}
            <p className="text-gray-400">
              {type === 'selfie' ? 'Selfie aufnehmen' : 'Dokument hochladen'}
            </p>
            <p className="text-xs text-gray-500">
              Klicken oder Datei hier ablegen
            </p>
          </div>
        )}

        {progress !== undefined && progress < 100 && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-700 rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && file && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-2xl max-h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h4 className="text-white font-semibold">Vorschau: {file.name}</h4>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={getPreviewUrl(file)}
                alt="Document preview"
                className="max-w-full max-h-[60vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KYCStep
