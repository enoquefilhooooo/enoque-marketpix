import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MarketPIX | Sua loja online',
  description: 'Compre produtos com praticidade e pague via PIX.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
