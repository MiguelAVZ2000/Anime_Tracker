import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Otakutrack - Tu plataforma definitiva de seguimiento de anime y manga",
  description: "Descubre, rastrea y comparte tus animes y mangas favoritos con la comunidad otaku más grande",
  generator: "v0.app",
}


import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <MainNav />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
