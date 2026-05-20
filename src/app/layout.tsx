import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AURA-AI | Neural Aesthetic Intelligence System',
  description: 'Next-generation AI facial intelligence platform. Upload your face, receive a neural aesthetic profile.',
  keywords: 'AI face scanner, neural aesthetics, facial analysis, cyberpunk AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
