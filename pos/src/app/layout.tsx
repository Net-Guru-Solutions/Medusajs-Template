import { SonnerProvider } from "@/components/layout/sonner-provider"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ModernPOS",
  description: "A modern Point of Sale system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SonnerProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
