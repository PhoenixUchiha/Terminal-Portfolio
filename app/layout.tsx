import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Pixelify_Sans } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phoenix',
  description: 'log-portfolio',
}

const PixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-pixelify"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${PixelifySans.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
