import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Vote,
  Trophy,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Calendar,
  User,
  BarChart3,
  Target,
  FileText,
  ExternalLink,
  Coins,
  Factory,
  Cog,
  Sparkles,
  ArrowDown,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react'

function GovernancePage() {
  const [selectedVote, setSelectedVote] = useState<string>('')

  const activeProposals = [
    {
      id: "SF-001",
      title: "Erweitere VISTA Finance Staking-Kapazität",
      description: "Erhöhung der maximalen Kapazität für VISTA Finance Pools um 50% aufgrund hoher Nachfrage",
      status: "active",
      timeLeft: "5 days 12 hours",
      votesFor: 125000,
      votesAgainst: 45000,
      totalVotes: 170000,
      quorum: 200000,
      proposer: "0x742d...35Ac",
      category: "Economic",
      created: "2024-01-15"
    },
    {
      id: "SF-002",
      title: "4-Way Mirror Money Integration",
      description: "Neue Premium-Stufe für 4WMM Token mit 2.5% wöchentlicher Rendite für VIP-Investoren",
      status: "active",
      timeLeft: "12 days 3 hours",
      votesFor: 89000,
      votesAgainst: 23000,
      totalVotes: 112000,
      quorum: 200000,
      proposer: "0x892f...12Bd",
      category: "Technical",
      created: "2024-01-10"
    },
    {
      id: "SF-003",
      title: "GEURO Treasury Expansion",
      description: "Aufbau einer GEURO-Reserve für erhöhte Liquidität und Stabilität der wöchentlichen Auszahlungen",
      status: "active",
      timeLeft: "8 days 15 hours",
      votesFor: 67000,
      votesAgainst: 89000,
      totalVotes: 156000,
      quorum: 200000,
      proposer: "0x445e...98Cf",
      category: "Treasury",
      created: "2024-01-12"
    }
  ]

  const pastProposals = [
    {
      id: "SF-000",
      title: "BNB Chain Migration",
      description: "Erfolgreiche Migration aller Staking-Operationen zur BNB Smart Chain",
      status: "passed",
      result: "Passed with 87% approval",
      votesFor: 234000,
      votesAgainst: 66000,
      totalVotes: 300000,
      executed: true,
      executedDate: "2024-01-05"
    },
    {
      id: "SF-004",
      title: "Multi-Token Staking Launch",
      description: "Einführung von VISTA, 4WMM und GEURO Token für diversifizierte Staking-Optionen",
      status: "passed",
      result: "Passed with 92% approval",
      votesFor: 196000,
      votesAgainst: 17000,
      totalVotes: 213000,
      executed: true,
      executedDate: "2024-01-08"
    }
  ]

  const governanceStats = [
    {
      title: "Total Voting Power",
      value: "2.4M",
      icon: <Vote className="w-6 h-6" />,
      color: "text-orange-400",
      description: "BNB Chain Token für Voting berechtigt"
    },
    {
      title: "Active Proposals",
      value: "3",
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-400",
      description: "Aktuell offen für Abstimmung"
    },
    {
      title: "Participation Rate",
      value: "78%",
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-400",
      description: "Durchschnittliche Wahlbeteiligung"
    },
    {
      title: "Treasury Size",
      value: "€8.4M",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-yellow-400",
      description: "Verfügbar für Proposals"
    }
  ]

  const delegateLeaderboard = [
    {
      address: "0x742d...35Ac",
      name: "DeFi Dave",
      votingPower: 156000,
      delegators: 234,
      participationRate: 95,
      proposals: 12
    },
    {
      address: "0x892f...12Bd",
      name: "Yield Farmer",
      votingPower: 134000,
      delegators: 189,
      participationRate: 87,
      proposals: 8
    },
    {
      address: "0x445e...98Cf",
      name: "Protocol Builder",
      votingPower: 98000,
      delegators: 156,
      participationRate: 92,
      proposals: 15
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30 border-green-600'
      case 'passed': return 'text-emerald-400 bg-emerald-900/30 border-emerald-600'
      case 'failed': return 'text-red-400 bg-red-900/30 border-red-600'
      default: return 'text-gray-400 bg-gray-900/30 border-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Economic': return 'text-emerald-400 bg-emerald-900/30'
      case 'Technical': return 'text-blue-400 bg-blue-900/30'
      case 'Treasury': return 'text-yellow-400 bg-yellow-900/30'
      default: return 'text-purple-400 bg-purple-900/30'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Same style as HomePage */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 industrial-grid opacity-30" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-32 right-20 w-6 h-6 bg-orange-500 rounded-full animate-pulse opacity-40 delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-50 delay-500" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium">Decentralized Governance</span>
            </div>

            <div className="space-y-4 mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="fabrik-brand block">STAKE</span>
                <span className="text-white block" style={{fontFamily: "'Orbitron', 'Inter', sans-serif", letterSpacing: "0.05em"}}>GOVERNANCE</span>
              </h1>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
                <span className="text-orange-400 font-medium tracking-wider">INDUSTRIAL DEMOCRACY</span>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Shape the future of Stake Fabrik through decentralized governance.
              Vote on proposals, delegate your tokens, and participate in
              <span className="text-orange-400 font-semibold"> Factory-Level</span> protocol decisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 production-counter">2.4M</div>
                <div className="text-sm text-gray-400">Voting Power</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 production-counter">64%</div>
                <div className="text-sm text-gray-400">Participation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 production-counter">$12.8M</div>
                <div className="text-sm text-gray-400">Treasury</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 h-auto text-lg font-semibold factory-glow group">
                <Vote className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Create Proposal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 px-8 py-4 h-auto text-lg font-semibold group">
                <Users className="w-5 h-5 mr-2" />
                View Delegates
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </section>

      {/* Governance Stats - Industrial Theme */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {governanceStats.map((stat, index) => (
              <div key={stat.title} className="group glass-card p-6 text-center hover-glow metallic-shine particles relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white production-counter mb-2">{stat.value}</div>
                  <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Proposals - Enhanced Industrial Design */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Active <span className="fabrik-brand">Production</span> Proposals
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Vote on current proposals to shape the protocol's industrial evolution
            </p>
          </div>

          <div className="space-y-6">
            {activeProposals.map((proposal) => (
              <div key={proposal.id} className="group glass-card hover-glow metallic-shine particles relative transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge className={getCategoryColor(proposal.category)}>
                          {proposal.category}
                        </Badge>
                        <Badge variant="outline" className="bg-white/5">
                          {proposal.id}
                        </Badge>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold mb-3">{proposal.title}</h3>
                      <p className="text-gray-400 leading-relaxed">
                        {proposal.description}
                      </p>
                    </div>
                    <div className="text-left lg:text-right lg:ml-6">
                      <div className="flex items-center text-sm text-orange-400 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {proposal.timeLeft}
                      </div>
                      <div className="text-xs text-gray-500">
                        by {proposal.proposer}
                      </div>
                    </div>
                  </div>

                  {/* Voting Progress - Industrial Style */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Production Consensus</span>
                      <span className="text-sm text-gray-400">
                        {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} votes
                      </span>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded-full conveyor-belt transition-all duration-1000"
                        style={{ width: `${(proposal.totalVotes / proposal.quorum) * 100}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-sm font-medium">Support</span>
                        </div>
                        <span className="text-lg font-bold text-green-400">{proposal.votesFor.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center">
                          <XCircle className="w-4 h-4 text-red-400 mr-2" />
                          <span className="text-sm font-medium">Against</span>
                        </div>
                        <span className="text-lg font-bold text-red-400">{proposal.votesAgainst.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Voting Actions - Industrial Style */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 factory-glow group"
                      onClick={() => setSelectedVote(`${proposal.id}-for`)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Vote For
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-600/50 text-red-400 hover:bg-red-600/10 group"
                      onClick={() => setSelectedVote(`${proposal.id}-against`)}
                    >
                      <XCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Vote Against
                    </Button>
                    <Button variant="outline" className="border-orange-600/50 text-orange-400 hover:bg-orange-600/10 group">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discuss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delegate Leaderboard - Industrial Theme */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Factory <span className="fabrik-brand">Operators</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trusted community operators managing industrial-scale governance decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {delegateLeaderboard.map((delegate, index) => (
              <div key={delegate.address} className="group glass-card hover-glow metallic-shine particles relative overflow-hidden">
                <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{delegate.name}</h3>
                        <p className="text-xs text-gray-400 font-mono">{delegate.address}</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-900/30 text-orange-400 border border-orange-500/30">
                      #{index + 1}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="text-xl font-bold text-orange-400 production-counter">
                        {(delegate.votingPower / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-400">Voting Power</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-xl font-bold text-blue-400 production-counter">
                        {delegate.delegators}
                      </div>
                      <div className="text-xs text-gray-400">Delegators</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Participation Rate:</span>
                      <span className="text-green-400 font-semibold">{delegate.participationRate}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full conveyor-belt"
                        style={{ width: `${delegate.participationRate}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proposals Created:</span>
                      <span className="text-purple-400 font-semibold">{delegate.proposals}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 factory-glow group">
                    <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Delegate to {delegate.name}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Proposals - Industrial Design */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Production <span className="fabrik-brand">History</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Historical records of factory governance decisions and their outcomes
            </p>
          </div>

          <div className="space-y-6">
            {pastProposals.map((proposal) => (
              <div key={proposal.id} className="glass-card hover-glow metallic-shine relative p-6 lg:p-8">
                <div className="absolute top-4 right-4 w-6 h-6 text-gray-400 opacity-50">📋</div>

                <div className="flex flex-col lg:flex-row items-start justify-between">
                  <div className="flex-1 mb-4 lg:mb-0 lg:pr-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <Badge variant="outline" className="bg-white/5 border-white/20">
                        {proposal.id}
                      </Badge>
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status}
                      </Badge>
                      {proposal.executed && (
                        <Badge className="bg-green-900/30 text-green-400 border border-green-500/30">
                          ✓ Executed
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">{proposal.title}</h3>
                    <p className="text-gray-400 text-sm lg:text-base mb-3 leading-relaxed">{proposal.description}</p>
                    <p className="text-orange-400 font-medium">{proposal.result}</p>
                  </div>

                  <div className="text-left lg:text-right space-y-2 lg:min-w-[200px]">
                    <div className="text-sm text-gray-400">
                      <span className="text-green-400 font-medium">{proposal.votesFor.toLocaleString()}</span> for,
                      <span className="text-red-400 font-medium ml-1">{proposal.votesAgainst.toLocaleString()}</span> against
                    </div>
                    {proposal.executedDate && (
                      <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                        Executed: {proposal.executedDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Guide - Enhanced Industrial Design */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-sm mb-6">
              <Cog className="w-4 h-4 text-orange-400 gear-rotate" />
              <span className="text-orange-400 font-medium">Industrial Democracy</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              How <span className="fabrik-brand">Factory</span> Governance Works
            </h2>
            <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
              Our industrial governance system empowers every operator to shape the protocol's future through democratic consensus.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="group glass-card p-8 text-center hover-glow metallic-shine particles relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">Stake & Earn Power</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Stake VISTA, 4WMM oder GEURO Token um industrielle Voting-Power zu erhalten.
                    Jeder gestakte Token wird zu einer Stimme in Factory-Operationen und Protokoll-Entscheidungen.
                  </p>
                </div>
              </div>

              <div className="group glass-card p-8 text-center hover-glow metallic-shine particles relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Vote className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">Vote on Production</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Cast your vote on active proposals or delegate to trusted factory operators.
                    Shape protocol upgrades, fee structures, and treasury allocations.
                  </p>
                </div>
              </div>

              <div className="group glass-card p-8 text-center hover-glow metallic-shine particles relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Factory className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">Execute Changes</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Successful proposals are automatically executed through smart contracts,
                    directly implementing changes to the industrial protocol infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 h-auto text-lg font-semibold factory-glow group">
                <Vote className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Start Governing
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GovernancePage
