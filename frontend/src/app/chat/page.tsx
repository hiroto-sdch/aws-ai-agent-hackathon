"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MessageSquare, Send, Bot, ArrowLeft, Lightbulb, PieChart, BarChart3, Clock, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "こんにちは！パーソナル投資アシスタントです。投資に関するご質問やご相談をお聞かせください。市場分析、ポートフォリオ最適化、リスク評価など、幅広くサポートいたします。",
    timestamp: new Date(),
    suggestions: [
      "今日の市場要約を教えて",
      "ポートフォリオの最適化提案",
      "米国金利の影響について",
      "リスク分析レポート",
    ],
  },
]

const quickTemplates = [
  {
    icon: BarChart3,
    title: "市場分析",
    description: "今日の市場動向を分析",
    prompt: "今日の日経平均と米国株の動きを分析して、主要な要因と今後の見通しを教えてください。",
  },
  {
    icon: PieChart,
    title: "ポートフォリオ診断",
    description: "現在の資産配分を評価",
    prompt: "私のポートフォリオを分析して、リスク分散の観点から改善点があれば教えてください。",
  },
  {
    icon: TrendingUp,
    title: "投資提案",
    description: "新しい投資機会を探す",
    prompt: "現在の市場環境を考慮して、中長期的な投資機会があれば提案してください。",
  },
  {
    icon: Clock,
    title: "短期戦略",
    description: "短期トレードの相談",
    prompt: "今週の短期トレード戦略について、注目すべき銘柄や指標があれば教えてください。",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (message?: string) => {
    const messageToSend = message || input.trim()
    if (!messageToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // AIレスポンスのシミュレーション
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(messageToSend),
        timestamp: new Date(),
        suggestions: generateSuggestions(messageToSend),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateMockResponse = (userMessage: string): string => {
    if (userMessage.includes("市場") || userMessage.includes("分析")) {
      return `本日の市場分析をお伝えします。

**日経平均株価**
- 現在値: 33,750円 (+756円, +2.3%)
- 主要要因: 円安進行と好決算銘柄の買いが支援

**米国株式市場**
- S&P 500: 4,890 (-39ポイント, -0.8%)
- 主要要因: インフレ懸念とFRBの金利政策への警戒

**今後の見通し**
日本株は円安メリットを享受する輸出関連株に注目。米国株は金利動向を慎重に見極める必要があります。`
    }

    if (userMessage.includes("ポートフォリオ")) {
      return `現在のポートフォリオを分析いたします。

**資産配分の評価**
- 日本株: 52.4% (やや高め)
- 米国株: 24.0% (適正)
- ETF: 16.0% (適正)
- 現金: 7.6% (やや低め)

**改善提案**
1. 地域分散の強化: 欧州株式への投資を検討
2. セクター分散: テクノロジー以外の成長セクターへの配分
3. 現金比率の調整: 10-15%程度への引き上げを推奨

リスク許容度に応じて段階的な調整をお勧めします。`
    }

    return `ご質問ありがとうございます。${userMessage}について詳しく分析いたします。

現在の市場環境と、あなたの投資プロファイルを考慮した回答を準備しています。具体的なデータと根拠に基づいて、最適な投資戦略をご提案いたします。

追加でご質問がございましたら、お気軽にお聞かせください。`
  }

  const generateSuggestions = (userMessage: string): string[] => {
    if (userMessage.includes("市場")) {
      return ["セクター別の動向は？", "明日の注目ポイント", "リスク要因の分析"]
    }
    if (userMessage.includes("ポートフォリオ")) {
      return ["具体的な銘柄提案", "リバランスのタイミング", "税務上の考慮点"]
    }
    return ["詳細な分析レポート", "関連する投資機会", "リスク管理について"]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-serif font-bold">AI投資相談</h1>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            オンライン
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* サイドバー */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">クイックテンプレート</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => handleSend(template.prompt)}
                  >
                    <template.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-xs">{template.title}</div>
                      <div className="text-xs text-muted-foreground">{template.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">投資コンテキスト</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">リスク許容度</span>
                  <span>中程度</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">投資期間</span>
                  <span>長期（5年+）</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">投資経験</span>
                  <span>中級</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ポートフォリオ</span>
                  <span>¥12.5M</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* メインチャットエリア */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">パーソナル投資アシスタント</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start gap-3">
                        {message.role === "assistant" ? (
                          <div className="bg-primary rounded-full p-2">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                        ) : (
                          <div className="bg-secondary rounded-full p-2">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <div className={`rounded-lg p-3 max-w-[80%] ${
                            message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground ml-auto"
                          }`}>
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          </div>
                          {message.suggestions && (
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={() => handleSend(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start gap-3">
                        <div className="bg-primary rounded-full p-2">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">分析中...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 入力エリア */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="投資に関する質問を入力してください..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button onClick={() => handleSend()} disabled={!input.trim() || isLoading} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Lightbulb className="h-3 w-3" />
                    <span>Enterで送信、Shift+Enterで改行</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}