"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PieChart, Plus, Search, Download, RefreshCw, AlertTriangle, Target, TrendingUp, TrendingDown } from "lucide-react"

// モックデータ
const mockPortfolioData = {
  totalValue: 12500000,
  totalCost: 11800000,
  totalGain: 700000,
  totalGainPercent: 5.93,
  todayChange: 125000,
  todayChangePercent: 1.02,
  cashBalance: 950000,
}

const mockHoldings = [
  {
    id: "1",
    symbol: "7203",
    name: "トヨタ自動車",
    sector: "自動車",
    shares: 100,
    avgPrice: 2650,
    currentPrice: 2800,
    marketValue: 280000,
    unrealizedGain: 15000,
    unrealizedGainPercent: 5.66,
    todayChange: 2.1,
    weight: 22.4,
  },
  {
    id: "2",
    symbol: "6758",
    name: "ソニーグループ",
    sector: "電機",
    shares: 50,
    avgPrice: 3800,
    currentPrice: 3900,
    marketValue: 195000,
    unrealizedGain: 5000,
    unrealizedGainPercent: 2.63,
    todayChange: -1.2,
    weight: 15.6,
  },
  {
    id: "3",
    symbol: "9984",
    name: "ソフトバンクグループ",
    sector: "通信",
    shares: 30,
    avgPrice: 5800,
    currentPrice: 6000,
    marketValue: 180000,
    unrealizedGain: 6000,
    unrealizedGainPercent: 3.45,
    todayChange: 3.5,
    weight: 14.4,
  },
  {
    id: "4",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    sector: "ETF",
    shares: 25,
    avgPrice: 4600,
    currentPrice: 4800,
    marketValue: 120000,
    unrealizedGain: 5000,
    unrealizedGainPercent: 4.35,
    todayChange: -0.8,
    weight: 9.6,
  },
  {
    id: "5",
    symbol: "VTI",
    name: "バンガード・トータル・ストック・マーケットETF",
    sector: "ETF",
    shares: 40,
    avgPrice: 2200,
    currentPrice: 2300,
    marketValue: 92000,
    unrealizedGain: 4000,
    unrealizedGainPercent: 4.55,
    todayChange: -0.5,
    weight: 7.4,
  },
]

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")

  const filteredHoldings = mockHoldings.filter((holding) => {
    const matchesSearch =
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || holding.sector === selectedSector
    return matchesSearch && matchesSector
  })

  const sectors = Array.from(new Set(mockHoldings.map((h) => h.sector)))

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-2">
                <PieChart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-serif font-bold">ポートフォリオ管理</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              エクスポート
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              更新
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              銘柄追加
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* ポートフォリオ概要 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">総資産</p>
                <p className="text-2xl font-bold">¥{mockPortfolioData.totalValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">評価損益</p>
                <p className={`text-2xl font-bold ${mockPortfolioData.totalGain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mockPortfolioData.totalGain > 0 ? '+' : ''}¥{mockPortfolioData.totalGain.toLocaleString()}
                </p>
                <Badge variant={mockPortfolioData.totalGainPercent > 0 ? "default" : "destructive"} className="text-xs">
                  {mockPortfolioData.totalGainPercent > 0 ? '+' : ''}{mockPortfolioData.totalGainPercent}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">当日損益</p>
                <p className={`text-2xl font-bold ${mockPortfolioData.todayChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mockPortfolioData.todayChange > 0 ? '+' : ''}¥{mockPortfolioData.todayChange.toLocaleString()}
                </p>
                <Badge variant={mockPortfolioData.todayChangePercent > 0 ? "default" : "destructive"} className="text-xs">
                  {mockPortfolioData.todayChangePercent > 0 ? '+' : ''}{mockPortfolioData.todayChangePercent}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">現金残高</p>
                <p className="text-2xl font-bold">¥{mockPortfolioData.cashBalance.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* メインコンテンツ */}
        <div className="mt-6">
          <Tabs defaultValue="holdings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="holdings">保有銘柄</TabsTrigger>
              <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
              <TabsTrigger value="allocation">資産配分</TabsTrigger>
              <TabsTrigger value="analysis">分析</TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="space-y-6">
              {/* 検索・フィルター */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="銘柄名またはシンボルで検索..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="sm:w-48">
                      <select
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="all">すべて</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 保有銘柄テーブル */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {filteredHoldings.map((holding) => (
                      <div key={holding.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{holding.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {holding.symbol}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {holding.sector}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {holding.shares}株 @ ¥{holding.avgPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="font-medium">¥{holding.marketValue.toLocaleString()}</p>
                          <div className="flex items-center gap-2 justify-end">
                            <div className="flex items-center gap-1">
                              {holding.unrealizedGain > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                              <span className={`text-xs ${holding.unrealizedGain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {holding.unrealizedGain > 0 ? '+' : ''}¥{holding.unrealizedGain.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {holding.todayChange > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                              <span className={`text-xs ${holding.todayChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {holding.todayChange > 0 ? '+' : ''}{holding.todayChange}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>パフォーマンス分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    パフォーマンスチャートが表示されます
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="allocation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>資産配分</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">セクター別配分</h3>
                      <div className="space-y-2">
                        {sectors.map((sector) => {
                          const sectorHoldings = mockHoldings.filter(h => h.sector === sector)
                          const sectorValue = sectorHoldings.reduce((sum, h) => sum + h.marketValue, 0)
                          const sectorPercent = (sectorValue / mockPortfolioData.totalValue * 100).toFixed(1)

                          return (
                            <div key={sector} className="flex justify-between">
                              <span className="text-sm">{sector}</span>
                              <span className="text-sm font-medium">{sectorPercent}%</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="text-center py-8 text-muted-foreground">
                      資産配分チャートが表示されます
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* リスク分析 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      リスク分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">ポートフォリオβ値</span>
                        <span className="text-sm font-medium">1.15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">年間ボラティリティ</span>
                        <span className="text-sm font-medium">18.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">シャープレシオ</span>
                        <span className="text-sm font-medium">0.85</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">最大ドローダウン</span>
                        <span className="text-sm font-medium text-red-600">-12.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      推奨アクション
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">地域分散の改善</p>
                      <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                        欧州株式への投資を検討してください
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">現金比率の調整</p>
                      <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                        現金比率を10-15%に引き上げることを推奨
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">リバランス時期</p>
                      <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                        四半期末のリバランスを検討してください
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}