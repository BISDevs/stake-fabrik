import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Lock, Coins, Users, BarChart4, Wallet, Target, Shield, Zap, TrendingUp, Clock, Award, Globe, Calendar, Mail, Twitter, Github, Menu, X, User, Plus } from 'lucide-react'
import { Button } from './components/ui/button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useLanguage } from './contexts/LanguageContext'
import { Modal } from './components/ui/modal'
import HomePage from './pages/HomePage'
import GovernancePage from './pages/GovernancePage'
import AnalyticsPage from './pages/AnalyticsPage'
import UserProfile from './components/UserProfile'
import DepositModal from './components/DepositModal'
import LanguageSwitcher from './components/LanguageSwitcher'

// Main App Component
function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  const { isConnected } = useAccount()
  const { t } = useLanguage()

  const openModal = (modalName: string) => setActiveModal(modalName)
  const closeModal = () => setActiveModal(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white industrial-grid">
      <Header
        openModal={openModal}
        isUserProfileOpen={isUserProfileOpen}
        setIsUserProfileOpen={setIsUserProfileOpen}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>

      <Footer openModal={openModal} />

      {/* Modals */}
      <Modal isOpen={activeModal === 'whitepaper'} onClose={closeModal} title="Stake Fabrik Whitepaper">
        <div className="space-y-4">
          <p>Stake Fabrik represents an industrial approach to decentralized staking, engineered for maximum efficiency and reliability.</p>
          <h3 className="text-lg font-semibold text-orange-400">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Industrial-grade staking infrastructure</li>
            <li>Multi-pool factory system with automated optimization</li>
            <li>Robust governance mechanics</li>
            <li>High-performance yield generation engines</li>
          </ul>
          <p>Our factory-optimized protocol ensures users can stake with industrial-level security and efficiency, backed by battle-tested smart contracts.</p>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Download Full Whitepaper
          </Button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'security'} onClose={closeModal} title="Security & Audits">
        <div className="space-y-4">
          <p>Security is our factory's foundation. Stake Fabrik has undergone comprehensive security audits by leading firms.</p>
          <h3 className="text-lg font-semibold text-orange-400">Security Measures:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Smart contract audits by CertiK and ConsenSys Diligence</li>
            <li>Multi-signature wallet for protocol upgrades</li>
            <li>Time-locked contract deployments</li>
            <li>Bug bounty program with up to $100,000 rewards</li>
            <li>Regular security assessments and penetration testing</li>
          </ul>
          <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-orange-400 font-medium">🔒 All funds are secured by industrial-grade smart contracts</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'bug-bounty'} onClose={closeModal} title="Bug Bounty Program">
        <div className="space-y-4">
          <p>Help us maintain the highest security standards. Our bug bounty program rewards security researchers who responsibly disclose vulnerabilities.</p>
          <h3 className="text-lg font-semibold text-orange-400">Reward Structure:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400">Critical</h4>
              <p className="text-2xl font-bold">$50,000 - $100,000</p>
            </div>
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold text-orange-400">High</h4>
              <p className="text-2xl font-bold">$10,000 - $50,000</p>
            </div>
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <h4 className="font-semibold text-yellow-400">Medium</h4>
              <p className="text-2xl font-bold">$1,000 - $10,000</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400">Low</h4>
              <p className="text-2xl font-bold">$100 - $1,000</p>
            </div>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Submit Vulnerability Report
          </Button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'brand-assets'} onClose={closeModal} title="Brand Assets">
        <div className="space-y-4">
          <p>Download official Stake Fabrik logos, brand guidelines, and marketing materials.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 glass-card">
              <h4 className="font-semibold mb-2">Logo Package</h4>
              <p className="text-sm text-gray-400 mb-3">PNG, SVG, and vector formats</p>
              <Button variant="outline" className="w-full border-orange-600/50 text-orange-400">
                Download Logos
              </Button>
            </div>
            <div className="p-4 glass-card">
              <h4 className="font-semibold mb-2">Brand Guidelines</h4>
              <p className="text-sm text-gray-400 mb-3">Colors, fonts, and usage rules</p>
              <Button variant="outline" className="w-full border-orange-600/50 text-orange-400">
                Download Guidelines
              </Button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-orange-400">Please follow our brand guidelines when using Stake Fabrik assets in your projects.</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'discord'} onClose={closeModal} title="Join Our Discord">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <p>Connect with the Stake Fabrik community on Discord. Get real-time updates, participate in governance discussions, and connect with other stakers.</p>
          <div className="space-y-2">
            <p className="text-orange-400 font-medium">🎮 Active community of 5,000+ members</p>
            <p className="text-orange-400 font-medium">📢 Announcements and updates</p>
            <p className="text-orange-400 font-medium">🗳️ Governance discussions</p>
            <p className="text-orange-400 font-medium">💬 General chat and support</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full">
            Join Discord Server
          </Button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'telegram'} onClose={closeModal} title="Telegram Community">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
          <p>Stay updated with Stake Fabrik news and announcements on our official Telegram channels.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 glass-card">
              <h4 className="font-semibold mb-2">Official Announcements</h4>
              <p className="text-sm text-gray-400 mb-3">Important updates and news</p>
              <Button variant="outline" className="w-full border-blue-600/50 text-blue-400">
                Join Announcements
              </Button>
            </div>
            <div className="p-4 glass-card">
              <h4 className="font-semibold mb-2">Community Chat</h4>
              <p className="text-sm text-gray-400 mb-3">Discussion and support</p>
              <Button variant="outline" className="w-full border-blue-600/50 text-blue-400">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'twitter'} onClose={closeModal} title="Follow on Twitter">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto">
            <Twitter className="w-8 h-8 text-blue-400" />
          </div>
          <p>Follow @StakeFabrik for the latest updates, governance proposals, and ecosystem developments.</p>
          <div className="space-y-2">
            <p className="text-orange-400 font-medium">📊 Real-time protocol metrics</p>
            <p className="text-orange-400 font-medium">🚀 Product announcements</p>
            <p className="text-orange-400 font-medium">🤝 Partnership news</p>
            <p className="text-orange-400 font-medium">💡 Educational content</p>
          </div>
          <Button className="bg-blue-400 hover:bg-blue-500 w-full">
            Follow @StakeFabrik
          </Button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'github'} onClose={closeModal} title="Open Source Code">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto">
            <Github className="w-8 h-8 text-gray-400" />
          </div>
          <p>Stake Fabrik is built with transparency in mind. Explore our open-source codebase, contribute to development, and review our smart contracts.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 glass-card">
              <h4 className="font-semibold mb-2">Smart Contracts</h4>
              <p className="text-sm text-gray-400 mb-3">Audited and verified</p>
              <Button variant="outline" className="w-full border-gray-600/50 text-gray-400">
                View Contracts
              </Button>
            </div>
            <div className="p-4 glass-card">
              <h4 className="font-semibold mb-2">Frontend Code</h4>
              <p className="text-sm text-gray-400 mb-3">React & TypeScript</p>
              <Button variant="outline" className="w-full border-gray-600/50 text-gray-400">
                View Frontend
              </Button>
            </div>
          </div>
          <Button className="bg-gray-600 hover:bg-gray-700 w-full">
            Star on GitHub
          </Button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'deposit'} onClose={closeModal} title="Deposit">
        <DepositModal />
      </Modal>

      {/* User Profile Modal */}
      <UserProfile
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </div>
  )
}

// Header Component
interface HeaderProps {
  openModal: (modalName: string) => void
  isUserProfileOpen: boolean
  setIsUserProfileOpen: (open: boolean) => void
}

const Header = ({ openModal, isUserProfileOpen, setIsUserProfileOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()
  const { isConnected } = useAccount()

  return (
    <header className="w-full z-40 bg-black/80 backdrop-blur border-b border-white/10 relative">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="fabrik-logo">
          <span className="fabrik-brand text-xl sm:text-2xl lg:text-3xl font-bold">STAKE</span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white" style={{fontFamily: "'Orbitron', 'Inter', sans-serif", letterSpacing: "0.05em"}}>FABRIK</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-gray-300 hover:text-orange-400 transition-colors font-medium ${location.pathname === '/' ? 'text-orange-400' : ''}`}
          >
            {t('nav.staking')}
          </Link>
          <Link
            to="/governance"
            className={`text-gray-300 hover:text-orange-400 transition-colors font-medium ${location.pathname === '/governance' ? 'text-orange-400' : ''}`}
          >
            {t('nav.governance')}
          </Link>
          <Link
            to="/analytics"
            className={`text-gray-300 hover:text-orange-400 transition-colors font-medium ${location.pathname === '/analytics' ? 'text-orange-400' : ''}`}
          >
            {t('nav.analytics')}
          </Link>
          <button onClick={() => openModal('whitepaper')} className="text-gray-300 hover:text-orange-400 transition-colors font-medium">{t('nav.docs')}</button>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* RainbowKit Connect Button - nur auf Desktop */}
          <div className="hidden lg:block">
            <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading'
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === 'authenticated')

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button
                          onClick={openConnectModal}
                          className="bg-orange-600 hover:bg-orange-700 fabrik-glow text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-2.5"
                          size="sm"
                        >
                          <Wallet className="w-4 h-4 mr-1 lg:mr-2" />
                          <span className="hidden sm:inline">{t('nav.connect')}</span>
                          <span className="sm:hidden">{t('nav.connect').slice(0, 7)}</span>
                        </Button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <Button
                          onClick={openChainModal}
                          className="bg-red-600 hover:bg-red-700 text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-2.5"
                          size="sm"
                        >
                          <span className="hidden sm:inline">Wrong network</span>
                          <span className="sm:hidden">Wrong net</span>
                        </Button>
                      )
                    }

                    return (
                      <div className="flex items-center space-x-1 lg:space-x-2">
                        {/* Deposit Button - nur Desktop */}
                        <Button
                          onClick={() => openModal('deposit')}
                          variant="outline"
                          className="hidden lg:flex border-green-600/50 text-green-400 hover:bg-green-500/10 text-xs lg:text-sm px-2 lg:px-3 py-1.5 lg:py-2"
                          size="sm"
                        >
                          <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                          <span className="hidden sm:inline">{t('nav.deposit')}</span>
                          <span className="sm:hidden">+</span>
                        </Button>

                        {/* User Profile Button - nur Desktop */}
                        <Button
                          onClick={() => setIsUserProfileOpen(true)}
                          variant="outline"
                          className="hidden lg:flex border-orange-600/50 text-orange-400 hover:bg-orange-500/10 text-xs lg:text-sm px-2 lg:px-3 py-1.5 lg:py-2"
                          size="sm"
                        >
                          <User className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                          <span className="hidden sm:inline">{t('nav.profile')}</span>
                          <span className="sm:hidden">👤</span>
                        </Button>

                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          className="border-orange-600/50 text-orange-400 text-xs lg:text-sm px-2 lg:px-3 py-1.5 lg:py-2"
                          size="sm"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 10,
                                height: 10,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 3,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 10, height: 10 }}
                                />
                              )}
                            </div>
                          )}
                          <span className="hidden sm:inline">{chain.name}</span>
                          <span className="sm:hidden">{chain.name?.slice(0, 3)}</span>
                        </Button>

                        <Button
                          onClick={openAccountModal}
                          className="bg-orange-600 hover:bg-orange-700 fabrik-glow text-xs lg:text-sm px-2 lg:px-3 py-1.5 lg:py-2"
                          size="sm"
                        >
                          <span className="hidden sm:inline">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </span>
                          <span className="sm:hidden">
                            {account.displayName?.slice(0, 6)}...
                          </span>
                        </Button>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden p-2 rounded-lg hover:bg-orange-500/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-orange-400" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Solid Background */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          style={{
            backgroundColor: '#000000',
            background: '#000000'
          }}
        >
          {/* Header mit Logo und Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-orange-500/20" style={{backgroundColor: '#000000'}}>
            <div className="fabrik-logo">
              <span className="fabrik-brand text-xl font-bold">STAKE</span>
              <span className="text-xl font-bold text-white" style={{fontFamily: "'Orbitron', 'Inter', sans-serif", letterSpacing: "0.05em"}}>FABRIK</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-orange-400" />
            </Button>
          </div>

          {/* Navigation Content */}
          <div className="flex flex-col items-center justify-center flex-1 px-6" style={{backgroundColor: '#000000'}}>
            <nav className="grid grid-cols-3 gap-4 w-full max-w-md">
              <Link
                to="/"
                className="flex flex-col items-center p-4 rounded-xl border border-orange-500/30 text-white hover:text-orange-400 transition-all hover:scale-105"
                style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #ff9f0a20, #ff9f0a10)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart4 className="w-6 h-6 mb-2 text-orange-400" />
                <div className="font-semibold text-sm">{t('nav.staking')}</div>
              </Link>

              <Link
                to="/governance"
                className="flex flex-col items-center p-4 rounded-xl border border-orange-500/30 text-white hover:text-orange-400 transition-all hover:scale-105"
                style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #ff9f0a20, #ff9f0a10)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-6 h-6 mb-2 text-orange-400" />
                <div className="font-semibold text-sm">{t('nav.governance')}</div>
              </Link>

              <Link
                to="/analytics"
                className="flex flex-col items-center p-4 rounded-xl border border-orange-500/30 text-white hover:text-orange-400 transition-all hover:scale-105"
                style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #ff9f0a20, #ff9f0a10)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="w-6 h-6 mb-2 text-orange-400" />
                <div className="font-semibold text-sm">{t('nav.analytics')}</div>
              </Link>

              <button
                onClick={() => {
                  openModal('whitepaper')
                  setIsMenuOpen(false)
                }}
                className="flex flex-col items-center p-4 rounded-xl border border-orange-500/30 text-white hover:text-orange-400 transition-all hover:scale-105"
                style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #ff9f0a20, #ff9f0a10)'}}
              >
                <Globe className="w-6 h-6 mb-2 text-orange-400" />
                <div className="font-semibold text-sm">{t('nav.docs')}</div>
              </button>

              {/* Deposit Button - nur zeigen wenn verbunden */}
              {isConnected && (
                <button
                  onClick={() => {
                    openModal('deposit')
                    setIsMenuOpen(false)
                  }}
                  className="flex flex-col items-center p-4 rounded-xl border border-green-500/30 text-white hover:text-green-400 transition-all hover:scale-105"
                  style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #10b98120, #10b98110)'}}
                >
                  <Plus className="w-6 h-6 mb-2 text-green-400" />
                  <div className="font-semibold text-sm">{t('nav.deposit')}</div>
                </button>
              )}

              {/* Profile Button - nur zeigen wenn verbunden */}
              {isConnected && (
                <button
                  onClick={() => {
                    setIsUserProfileOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="flex flex-col items-center p-4 rounded-xl border border-purple-500/30 text-white hover:text-purple-400 transition-all hover:scale-105"
                  style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #a855f720, #a855f710)'}}
                >
                  <User className="w-6 h-6 mb-2 text-purple-400" />
                  <div className="font-semibold text-sm">{t('nav.profile')}</div>
                </button>
              )}

              {/* Connect Button - zeigen wenn nicht verbunden */}
              {!isConnected && (
                <div className="col-span-3 mt-4">
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      const ready = mounted && authenticationStatus !== 'loading'
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus || authenticationStatus === 'authenticated')

                      return (
                        <div
                          {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          {!connected && (
                            <button
                              onClick={() => {
                                openConnectModal()
                                setIsMenuOpen(false)
                              }}
                              className="w-full flex flex-col items-center p-6 rounded-xl border border-orange-500/30 text-white hover:text-orange-400 transition-all hover:scale-105"
                              style={{backgroundColor: '#1a1a1a', background: 'linear-gradient(135deg, #ff9f0a20, #ff9f0a10)'}}
                            >
                              <Wallet className="w-8 h-8 mb-3 text-orange-400" />
                              <div className="font-semibold text-lg">{t('nav.connect')}</div>
                            </button>
                          )}
                        </div>
                      )
                    }}
                  </ConnectButton.Custom>
                </div>
              )}
            </nav>


          </div>
        </div>
      )}
    </header>
  )
}

// Footer Component
interface FooterProps {
  openModal: (modalName: string) => void
}

const Footer = ({ openModal }: FooterProps) => {
  return (
    <footer className="bg-black/50 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4 fabrik-logo">
              <span className="fabrik-brand text-lg sm:text-xl lg:text-2xl">STAKE</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white" style={{fontFamily: "'Orbitron', 'Inter', sans-serif", letterSpacing: "0.05em"}}>FABRIK</span>
            </div>
            <p className="text-gray-400 text-sm">
              Industrial-grade decentralized staking infrastructure engineered for maximum efficiency.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Protocol</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-orange-400 transition-colors">Staking</a></li>
              <li><a href="/governance" className="hover:text-orange-400 transition-colors">Governance</a></li>
              <li><a href="/analytics" className="hover:text-orange-400 transition-colors">Analytics</a></li>
              <li><button onClick={() => openModal('whitepaper')} className="hover:text-orange-400 transition-colors text-left">Documentation</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => openModal('discord')} className="hover:text-orange-400 transition-colors text-left">Discord</button></li>
              <li><button onClick={() => openModal('telegram')} className="hover:text-orange-400 transition-colors text-left">Telegram</button></li>
              <li><button onClick={() => openModal('twitter')} className="hover:text-orange-400 transition-colors text-left">Twitter</button></li>
              <li><button onClick={() => openModal('github')} className="hover:text-orange-400 transition-colors text-left">GitHub</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => openModal('whitepaper')} className="hover:text-orange-400 transition-colors text-left">Whitepaper</button></li>
              <li><button onClick={() => openModal('security')} className="hover:text-orange-400 transition-colors text-left">Security</button></li>
              <li><button onClick={() => openModal('bug-bounty')} className="hover:text-orange-400 transition-colors text-left">Bug Bounty</button></li>
              <li><button onClick={() => openModal('brand-assets')} className="hover:text-orange-400 transition-colors text-left">Brand Assets</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Stake Fabrik. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button onClick={() => openModal('twitter')} className="text-gray-400 hover:text-orange-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button onClick={() => openModal('github')} className="text-gray-400 hover:text-orange-400 transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button onClick={() => openModal('telegram')} className="text-gray-400 hover:text-orange-400 transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default App
