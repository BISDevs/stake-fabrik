import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Target,
  Zap,
  Lock,
  Coins,
  Globe,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Shield,
  Layers,
  Factory,
  Cog,
  Sparkles,
  ArrowDown,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('tvl')

  const overviewStats = [
    {
      title: "Total Value Locked",
      value: "€3.2M",
      change: "+18.7%",
      changeType: "positive",
      period: "vs last month",
      icon: <Lock className="w-6 h-6" />,
      color: "text-orange-400"
    },
    {
      title: "24h Trading Volume",
      value: "€580K",
      change: "+7.3%",
      changeType: "positive",
      period: "vs yesterday",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      title: "Active Stakers",
      value: "1,847",
      change: "+23.4%",
      changeType: "positive",
      period: "vs last week",
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Average Weekly Rate",
      value: "1.17%",
      change: "+0.3%",
      changeType: "positive",
      period: "vs last week",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "Protocol Revenue",
      value: "€42K",
      change: "+28.9%",
      changeType: "positive",
      period: "this month",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-yellow-400"
    },
    {
      title: "Avg. Token Price",
      value: "€0.95",
      change: "+2.1%",
      changeType: "positive",
      period: "24h change",
      icon: <Coins className="w-6 h-6" />,
      color: "text-orange-400"
    }
  ]

  const stakingPools = [
    {
      name: "VISTA Starter",
      tvl: "€125K",
      apr: "26%",
      stakers: 486,
      utilization: 25,
      change24h: "+3.2%",
      color: "orange"
    },
    {
      name: "VISTA Premium",
      tvl: "€650K",
      apr: "104%",
      stakers: 234,
      utilization: 65,
      change24h: "+8.7%",
      color: "emerald"
    },
    {
      name: "4WMM Standard",
      tvl: "€420K",
      apr: "52%",
      stakers: 312,
      utilization: 70,
      change24h: "+5.4%",
      color: "purple"
    },
    {
      name: "GEURO Premium",
      tvl: "€765K",
      apr: "104%",
      stakers: 178,
      utilization: 85,
      change24h: "+12.1%",
      color: "emerald"
    }
  ]

  const topHolders = [
    {
      rank: 1,
      address: "0x742d...35Ac",
      balance: "1,245,678 VISTA",
      percentage: "2.49%",
      value: "€1.18M",
      type: "VISTA Whale"
    },
    {
      rank: 2,
      address: "0x892f...12Bd",
      balance: "856,432 4WMM",
      percentage: "3.38%",
      value: "€814K",
      type: "Mirror Institution"
    },
    {
      rank: 3,
      address: "0x445e...98Cf",
      balance: "634,789 GEURO",
      percentage: "3.38%",
      value: "€602K",
      type: "GEURO Whale"
    },
    {
      rank: 4,
      address: "0x123a...67De",
      balance: "789,123 VISTA",
      percentage: "1.58%",
      value: "€750K",
      type: "Vista Protocol"
    },
    {
      rank: 5,
      address: "0x789b...34Ef",
      balance: "567,890 4WMM",
      percentage: "2.24%",
      value: "€539K",
      type: "Mirror Farmer"
    }
  ]

  const protocolMetrics = [
    {
      name: "VISTA Total Supply",
      value: "50,000,000",
      unit: "VISTA",
      description: "Vista Finance max supply"
    },
    {
      name: "4WMM Circulating",
      value: "25,340,120",
      unit: "4WMM",
      description: "4-Way Mirror Money in circulation"
    },
    {
      name: "GEURO Staked",
      value: "18,756,890",
      unit: "GEURO",
      description: "Currently staked GEURO tokens"
    },
    {
      name: "Total Staking Ratio",
      value: "74.3%",
      unit: "",
      description: "Prozentsatz aller gestakten Token"
    }
  ]

  const networkActivity = [
    {
      metric: "Daily Transactions",
      value: "12,456",
      change: "+15.2%",
      icon: <Activity className="w-5 h-5" />
    },
    {
      metric: "Unique Users (24h)",
      value: "3,789",
      change: "+8.7%",
      icon: <Users className="w-5 h-5" />
    },
    {
      metric: "Gas Used",
      value: "2.4M",
      change: "+12.1%",
      icon: <Zap className="w-5 h-5" />
    },
    {
      metric: "Smart Contracts",
      value: "15",
      change: "0%",
      icon: <Shield className="w-5 h-5" />
    }
  ]

  const getChangeIcon = (changeType: string) => {
    return changeType === 'positive' ?
      <ArrowUpRight className="w-4 h-4 text-green-400" /> :
      <ArrowDownRight className="w-4 h-4 text-red-400" />
  }

  const getChangeColor = (changeType: string) => {
    return changeType === 'positive' ? 'text-green-400' : 'text-red-400'
  }

  const timeframes = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
    { value: '1y', label: '1Y' }
  ]

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
              <span className="text-orange-400 font-medium">Real-time Analytics</span>
            </div>

            <div className="space-y-4 mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="fabrik-brand block">STAKE</span>
                <span className="text-white block" style={{fontFamily: "'Orbitron', 'Inter', sans-serif", letterSpacing: "0.05em"}}>ANALYTICS</span>
              </h1>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
                <span className="text-orange-400 font-medium tracking-wider">INDUSTRIAL METRICS</span>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Comprehensive analytics and insights into the Stake Fabrik ecosystem.
              Track performance, user metrics, and protocol health with
              <span className="text-orange-400 font-semibold"> Factory-Level</span> precision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 production-counter">€3.2M</div>
                <div className="text-sm text-gray-400">Total TVL</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 production-counter">1,847</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 production-counter">1.17%</div>
                <div className="text-sm text-gray-400">Avg Weekly</div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex flex-wrap items-center gap-2">
                {timeframes.map((tf) => (
                  <Button
                    key={tf.value}
                    variant={timeframe === tf.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(tf.value)}
                    className={timeframe === tf.value ?
                      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" :
                      "border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                    }
                  >
                    {tf.label}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 group">
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Export
                </Button>
                <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 group">
                  <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </section>

      {/* Overview Stats - Industrial Theme */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Factory <span className="fabrik-brand">Metrics</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real-time performance indicators from our industrial staking infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {overviewStats.map((stat, index) => (
              <div key={stat.title} className="group glass-card p-6 text-center hover-glow metallic-shine particles relative overflow-hidden">
                <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    {getChangeIcon(stat.changeType)}
                    <span className={`text-sm font-medium ml-1 ${getChangeColor(stat.changeType)}`}>
                      {stat.change}
                    </span>
                  </div>

                  <div className="text-3xl font-bold text-white production-counter mb-2">{stat.value}</div>
                  <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Section - Industrial Design */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <div className="glass-card hover-glow metallic-shine relative">
                <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

                <div className="p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center">
                        <LineChart className="w-6 h-6 mr-3 text-orange-400" />
                        Factory Performance
                      </h3>
                      <p className="text-gray-400">TVL and volume trends over industrial cycles</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 group mt-4 sm:mt-0">
                      <Filter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Filter
                    </Button>
                  </div>

                  {/* Enhanced Chart Placeholder */}
                  <div className="h-80 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg flex items-center justify-center border border-orange-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 industrial-grid opacity-20" />
                    <div className="text-center relative z-10">
                      <BarChart3 className="w-20 h-20 text-orange-400 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-orange-400 mb-2">Interactive Analytics</p>
                      <p className="text-sm text-gray-400">Real-time factory metrics visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Metrics */}
            <div className="space-y-6">
              {/* Protocol Metrics */}
              <div className="glass-card hover-glow metallic-shine relative">
                <div className="absolute top-4 right-4 w-5 h-5 text-orange-400">🔧</div>

                <div className="p-6">
                  <h4 className="text-xl font-bold mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-orange-400" />
                    Token Metrics
                  </h4>
                  <div className="space-y-4">
                    {protocolMetrics.map((metric, index) => (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{metric.name}:</span>
                          <span className="text-sm font-bold text-orange-400">
                            {metric.value} {metric.unit}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{metric.description}</p>
                        {index < protocolMetrics.length - 1 && (
                          <div className="border-t border-orange-500/20 pt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Network Activity */}
              <div className="glass-card hover-glow metallic-shine relative">
                <div className="absolute top-4 right-4 w-5 h-5 text-orange-400">📡</div>

                <div className="p-6">
                  <h4 className="text-xl font-bold mb-6 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-400" />
                    Factory Activity
                  </h4>
                  <div className="space-y-4">
                    {networkActivity.map((activity, index) => (
                      <div key={activity.metric} className="flex items-center justify-between p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <div className="text-orange-400">
                              {activity.icon}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{activity.value}</p>
                            <p className="text-xs text-gray-400">{activity.metric}</p>
                          </div>
                        </div>
                        <span className="text-xs text-green-400 font-medium">{activity.change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staking Pools Analytics - Enhanced Industrial Design */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Production <span className="fabrik-brand">Lines</span> Analytics
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Performance breakdown and utilization metrics across all factory production lines
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakingPools.map((pool, index) => (
              <div key={pool.name} className="group glass-card hover-glow metallic-shine particles relative transition-all duration-300 hover:scale-105">
                <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">{pool.name}</h3>
                    <Badge className={`
                      ${pool.color === 'emerald' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' :
                        pool.color === 'blue' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' :
                        pool.color === 'purple' ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30' :
                        'bg-orange-900/30 text-orange-400 border border-orange-500/30'}
                    `}>
                      {pool.apr}% APR
                    </Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                      <span className="text-sm text-gray-400">Total Value Locked</span>
                      <span className="text-sm font-bold text-white">{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                      <span className="text-sm text-gray-400">Active Operators</span>
                      <span className="text-sm font-bold text-white">{pool.stakers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <span className="text-sm text-gray-400">24h Growth</span>
                      <span className="text-sm font-bold text-green-400">{pool.change24h}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Factory Utilization</span>
                      <span className="text-orange-400 font-bold">{pool.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full conveyor-belt transition-all duration-1000 ${
                          pool.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                          pool.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                          pool.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
                          'bg-gradient-to-r from-orange-500 to-orange-400'
                        }`}
                        style={{ width: `${pool.utilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Holders - Industrial Design */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Major <span className="fabrik-brand">Operators</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Industrial-scale token holders and their distribution across the factory ecosystem
            </p>
          </div>

          <div className="glass-card hover-glow metallic-shine relative">
            <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-orange-500/20 bg-orange-500/5">
                      <th className="text-left p-4 lg:p-6 text-sm font-bold text-orange-400">Rank</th>
                      <th className="text-left p-4 lg:p-6 text-sm font-bold text-orange-400">Operator Address</th>
                      <th className="text-left p-4 lg:p-6 text-sm font-bold text-orange-400">Token Balance</th>
                      <th className="text-left p-4 lg:p-6 text-sm font-bold text-orange-400">Share</th>
                      <th className="text-left p-4 lg:p-6 text-sm font-bold text-orange-400">USD Value</th>
                      <th className="text-left p-4 lg:p-6 text-sm font-bold text-orange-400">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topHolders.map((holder) => (
                      <tr key={holder.rank} className="border-b border-white/5 hover:bg-orange-500/5 transition-colors group">
                        <td className="p-4 lg:p-6">
                          <div className="flex items-center">
                            <Badge className="bg-orange-900/30 text-orange-400 border border-orange-500/30 group-hover:scale-110 transition-transform">
                              #{holder.rank}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 lg:p-6">
                          <span className="font-mono text-sm text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                            {holder.address}
                          </span>
                        </td>
                        <td className="p-4 lg:p-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-lg">{holder.balance}</span>
                            <span className="text-xs text-gray-400">BNB Chain Token</span>
                          </div>
                        </td>
                        <td className="p-4 lg:p-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-orange-400 font-bold">{holder.percentage}</span>
                            <div className="w-12 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 conveyor-belt"
                                style={{ width: `${Number.parseFloat(holder.percentage.replace('%', '')) * 10}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 lg:p-6">
                          <span className="font-bold text-green-400 text-lg">{holder.value}</span>
                        </td>
                        <td className="p-4 lg:p-6">
                          <Badge className={`border ${
                            holder.type === 'Whale' ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' :
                            holder.type === 'Institution' ? 'bg-purple-900/30 text-purple-400 border-purple-500/30' :
                            holder.type === 'DeFi Protocol' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' :
                            'bg-orange-900/30 text-orange-400 border-orange-500/30'
                          }`}>
                            {holder.type}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 group">
              <Globe className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              View All Operators
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Real-time Feed - Enhanced Industrial Design */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-sm mb-6">
                <Activity className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-orange-400 font-medium">Live Factory Feed</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Real-time <span className="fabrik-brand">Operations</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Monitor live transactions and protocol events across the industrial staking infrastructure
              </p>
            </div>

            <div className="glass-card hover-glow metallic-shine particles relative">
              <div className="absolute top-4 right-4 w-6 h-6 text-orange-400 gear-rotate">⚙️</div>

              <div className="p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center">
                      <Activity className="w-6 h-6 mr-3 text-green-400 animate-pulse" />
                      Factory Activity Stream
                    </h3>
                    <p className="text-gray-400">Real-time transactions and protocol events</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'tx-1', action: 'Stake €750 in VISTA Premium', address: '0x742d...35Ac', value: '+€750', time: '2 min ago', icon: '⚡', type: 'stake' },
                    { id: 'tx-2', action: 'Unstake €500 from 4WMM Standard', address: '0x892f...12Bd', value: '-€500', time: '5 min ago', icon: '🔓', type: 'unstake' },
                    { id: 'tx-3', action: 'Claim €15.50 GEURO rewards', address: '0x445e...98Cf', value: '+€15.50', time: '8 min ago', icon: '💰', type: 'claim' },
                    { id: 'tx-4', action: 'Stake €1,250 in GEURO Premium', address: '0x123a...67De', value: '+€1,250', time: '12 min ago', icon: '⚡', type: 'stake' },
                    { id: 'tx-5', action: 'Vote on VISTA Expansion', address: '0x789b...34Ef', value: '0', time: '15 min ago', icon: '🗳️', type: 'governance' }
                  ].map((transaction) => (
                    <div key={transaction.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-6 rounded-lg bg-gradient-to-r from-orange-500/5 to-orange-600/5 border border-orange-500/10 hover:bg-orange-500/10 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          transaction.type === 'stake' ? 'bg-green-500/20 border border-green-500/30' :
                          transaction.type === 'unstake' ? 'bg-red-500/20 border border-red-500/30' :
                          transaction.type === 'claim' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                          'bg-purple-500/20 border border-purple-500/30'
                        } group-hover:scale-110 transition-transform`}>
                          <span className="text-lg">{transaction.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm lg:text-base font-medium text-white leading-relaxed">
                            {transaction.action}
                          </p>
                          <p className="text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded mt-1 inline-block">{transaction.address}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className={`text-lg font-bold ${
                          transaction.value.startsWith('+') ? 'text-emerald-400' :
                          transaction.value.startsWith('-') ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {transaction.value}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center sm:justify-end">
                          <Clock className="w-3 h-3 mr-1" />
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8 border-t border-orange-500/20 mt-8">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 factory-glow group">
                    <Clock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    View All Operations
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AnalyticsPage
