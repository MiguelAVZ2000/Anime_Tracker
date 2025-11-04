import type { Metadata } from "next";
import type React from "react"
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import "./globals.css"

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
    <html lang="es" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
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
