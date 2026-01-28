import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TUMALU AI - Gerador de Conteúdo com IA',
  description: 'Crie imagens e vídeos com IA usando FLUX e LivePortrait',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
