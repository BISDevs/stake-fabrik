import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'

import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import App from './App.tsx'
import { config } from './config/web3.ts'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <LanguageProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider appInfo={{
            appName: 'Stake Fabrik',
            disclaimer: undefined,
            learnMoreUrl: undefined,
          }}>
            <BrowserRouter>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1f2937',
                    color: '#fff',
                    border: '1px solid #374151'
                  },
                  success: {
                    style: {
                      background: '#065f46',
                      border: '1px solid #10b981'
                    }
                  },
                  error: {
                    style: {
                      background: '#7f1d1d',
                      border: '1px solid #ef4444'
                    }
                  }
                }}
              />
            </BrowserRouter>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </LanguageProvider>
  </StrictMode>,
)
