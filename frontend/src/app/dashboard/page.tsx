"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  PieChart,
  Bell,
  User,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// モックデータ
const mockMarketData = {
  nikkei: { value: 33750, change: 2.3, changeValue: 756 },
  sp500: { value: 4890, change: -0.8, changeValue: -39 },
  usdjpy: { value: 149.85, change: 0.2, changeValue: 0.3 },
  yield10y: { value: 0.75, change: 0.05, changeValue: 0.05 },
}

const mockPortfolio = {
  totalValue: 12500000,
  todayChange: 125000,
  todayChangePercent: 1.02,
  holdings: [
    { symbol: "7203", name: "トヨタ自動車", shares: 100, value: 2800000, change: 2.1 },
    { symbol: "6758", name: "ソニーグループ", shares: 50, value: 1950000, change: -1.2 },
    { symbol: "9984", name: "ソフトバンクグループ", shares: 30, value: 1800000, change: 3.5 },
    { symbol: "SPY", name: "SPDR S&P 500 ETF", shares: 25, value: 1200000, change: -0.8 },
  ],
}

const mockNews = [
  {
    title: "日銀、金利政策の見直しを示唆",
    time: "2時間前",
    impact: "high",
  },
  {
    title: "米国インフレ率、予想を下回る",
    time: "4時間前",
    impact: "medium",
  },
  {
    title: "トヨタ、EV戦略を発表",
    time: "6時間前",
    impact: "low",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-2">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-serif font-bold">パーソナル投資アシスタント</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* メインコンテンツ */}
          <div className="flex-1 space-y-6">
            {/* ウェルカムセクション */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold">おはようございます</h2>
                <p className="text-muted-foreground">今日の市場概況をお伝えします</p>
              </div>
              <div className="flex gap-2">
                <Link href="/portfolio">
                  <Button variant="outline" size="sm">
                    <PieChart className="h-4 w-4 mr-2" />
                    ポートフォリオ
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI相談
                  </Button>
                </Link>
              </div>
            </div>

            {/* 市場サマリー */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  市場概況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">日経平均</p>
                    <p className="text-2xl font-bold">{mockMarketData.nikkei.value.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {mockMarketData.nikkei.change > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          mockMarketData.nikkei.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {mockMarketData.nikkei.change > 0 ? "+" : ""}
                        {mockMarketData.nikkei.changeValue} ({mockMarketData.nikkei.change}%)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">S&P 500</p>
                    <p className="text-2xl font-bold">{mockMarketData.sp500.value.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {mockMarketData.sp500.change > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          mockMarketData.sp500.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {mockMarketData.sp500.change > 0 ? "+" : ""}
                        {mockMarketData.sp500.changeValue} ({mockMarketData.sp500.change}%)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">USD/JPY</p>
                    <p className="text-2xl font-bold">{mockMarketData.usdjpy.value}</p>
                    <div className="flex items-center gap-1">
                      {mockMarketData.usdjpy.change > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          mockMarketData.usdjpy.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {mockMarketData.usdjpy.change > 0 ? "+" : ""}
                        {mockMarketData.usdjpy.changeValue} ({mockMarketData.usdjpy.change}%)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">10年国債利回り</p>
                    <p className="text-2xl font-bold">{mockMarketData.yield10y.value}%</p>
                    <div className="flex items-center gap-1">
                      {mockMarketData.yield10y.change > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          mockMarketData.yield10y.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {mockMarketData.yield10y.change > 0 ? "+" : ""}
                        {mockMarketData.yield10y.changeValue}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ポートフォリオサマリー */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  ポートフォリオ概況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">総資産</p>
                    <p className="text-3xl font-bold">¥{mockPortfolio.totalValue.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">当日損益</p>
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-2xl font-bold ${
                          mockPortfolio.todayChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {mockPortfolio.todayChange > 0 ? "+" : ""}¥{mockPortfolio.todayChange.toLocaleString()}
                      </p>
                      <Badge
                        variant={mockPortfolio.todayChangePercent > 0 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {mockPortfolio.todayChangePercent > 0 ? "+" : ""}
                        {mockPortfolio.todayChangePercent}%
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">保有銘柄数</p>
                    <p className="text-2xl font-bold">{mockPortfolio.holdings.length}銘柄</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 保有銘柄 */}
            <Card>
              <CardHeader>
                <CardTitle>保有銘柄</CardTitle>
                <CardDescription>現在の保有状況</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPortfolio.holdings.map((holding) => (
                    <div key={holding.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{holding.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {holding.symbol}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{holding.shares}株保有</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">¥{holding.value.toLocaleString()}</p>
                        <div className="flex items-center gap-1">
                          {holding.change > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span className={`text-xs ${holding.change > 0 ? "text-green-600" : "text-red-600"}`}>
                            {holding.change > 0 ? "+" : ""}
                            {holding.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/portfolio">
                    <Button variant="outline" className="w-full bg-transparent">
                      詳細を見る
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="w-full lg:w-80 space-y-6">
            {/* 市場ニュース */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  市場ニュース
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockNews.map((news, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge
                        variant={
                          news.impact === "high" ? "destructive" : news.impact === "medium" ? "default" : "secondary"
                        }
                        className="text-xs mt-1"
                      >
                        {news.impact === "high" ? "高" : news.impact === "medium" ? "中" : "低"}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">{news.title}</p>
                        <p className="text-xs text-muted-foreground">{news.time}</p>
                      </div>
                    </div>
                    {index < mockNews.length - 1 && <div className="border-b" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AIアシスタント */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AIアシスタント
                </CardTitle>
                <CardDescription>投資に関する質問をしてみましょう</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                  >
                    <span className="text-sm">今日の市場要約を作成</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                  >
                    <span className="text-sm">ポートフォリオ最適化提案</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                  >
                    <span className="text-sm">リスク分析レポート</span>
                  </Button>
                </div>
                <Link href="/chat">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    チャットを開始
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}