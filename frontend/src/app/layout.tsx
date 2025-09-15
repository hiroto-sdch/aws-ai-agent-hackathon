import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
  display: "swap",
})

export const metadata: Metadata = {
  title: "パーソナル投資アシスタント",
  description: "個人投資家向けのAI投資アシスタント",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`font-sans ${playfairDisplay.variable} ${sourceSansPro.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}