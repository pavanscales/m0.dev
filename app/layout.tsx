import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'm0 ',
  description: 'generate any native ui ',
  generator: 'm0.zero',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
