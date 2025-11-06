"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Search,
  User,
  Menu,
  Moon,
  Sun,
  Monitor,
  Home,
  LayoutDashboard,
  Compass,
  Calendar,
  Users,
  Sparkles,
  Type,
  Contrast,
  Trophy,
  BarChart3,
  MessageSquare,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNav, setShowNav] = useState(true)
  const [fontSize, setFontSize] = useState("medium")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 10)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px"
  }, [fontSize])

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/search", label: "Explorar", icon: Compass },
    { href: "/calendar", label: "Calendario", icon: Calendar },
    { href: "/community", label: "Comunidad", icon: Users },
    { href: "/forum", label: "Foro", icon: MessageSquare },
    { href: "/recommendations", label: "Recomendaciones", icon: Sparkles },
    { href: "/achievements", label: "Logros", icon: Trophy },
    { href: "/stats", label: "Estadísticas", icon: BarChart3 },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "bg-background/80 backdrop-blur-md border-b border-border/40",
        "shadow-sm",
        isScrolled ? "shadow-md" : "",
        showNav ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="container flex h-14 items-center justify-between px-4">
        {/* Logo and Avatar */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white animate-float">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                </svg>
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hidden sm:inline-block group-hover:scale-105 transition-transform">
              Otakutrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-4">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-accent/50 hover:scale-105 hover:shadow-sm",
                    pathname === item.href
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      pathname === item.href && "animate-pulse",
                    )}
                  />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Search,
  User,
  Menu,
  Moon,
  Sun,
  Monitor,
  Home,
  LayoutDashboard,
  Compass,
  Calendar,
  Users,
  Sparkles,
  Type,
  Contrast,
  Trophy,
  BarChart3,
  MessageSquare,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNav, setShowNav] = useState(true)
  const [fontSize, setFontSize] = useState("medium")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 10)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px"
  }, [fontSize])

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/search", label: "Explorar", icon: Compass },
    { href: "/calendar", label: "Calendario", icon: Calendar },
    { href: "/community", label: "Comunidad", icon: Users },
    { href: "/forum", label: "Foro", icon: MessageSquare },
    { href: "/recommendations", label: "Recomendaciones", icon: Sparkles },
    { href: "/achievements", label: "Logros", icon: Trophy },
    { href: "/stats", label: "Estadísticas", icon: BarChart3 },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "bg-background/80 backdrop-blur-md border-b border-border/40",
        "shadow-sm",
        isScrolled ? "shadow-md" : "",
        showNav ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="container flex h-14 items-center justify-between px-4">
        {/* Logo and Avatar */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white animate-float">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                </svg>
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hidden sm:inline-block group-hover:scale-105 transition-transform">
              Otakutrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-4">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-accent/50 hover:scale-105 hover:shadow-sm",
                    pathname === item.href
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      pathname === item.href && "animate-pulse",
                    )}
                  />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden sm:flex hover:bg-accent/50 hover:scale-110 transition-all"
          >
            <Link href="/search" aria-label="Buscar">
              <Search className="h-4 w-4" />
            </Link>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Notificaciones"
              >
                <Bell className="h-4 w-4 animate-wiggle" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] animate-bounce">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-md">
              <div className="flex items-center justify-between p-3">
                <h3 className="font-semibold text-sm">Notificaciones</h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Marcar leídas
                </Button>
              </div>
              <DropdownMenuSeparator />
              <Link href="/notifications">
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Nuevo episodio disponible</p>
                    <p className="text-xs text-muted-foreground">Attack on Titan - Episodio 25</p>
                    <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/notifications">
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Nuevo seguidor</p>
                    <p className="text-xs text-muted-foreground">@otaku_master comenzó a seguirte</p>
                    <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/notifications">
                <DropdownMenuItem className="justify-center text-sm">Ver todas</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size Control */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Tamaño de fuente"
              >
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
              <DropdownMenuLabel>Tamaño de fuente</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFontSize("small")}>
                <Type className="mr-2 h-3 w-3" />
                Pequeño
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("medium")}>
                <Type className="mr-2 h-4 w-4" />
                Mediano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("large")}>
                <Type className="mr-2 h-5 w-5" />
                Grande
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Cambiar tema"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
              <DropdownMenuLabel>Tema</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Menú de usuario"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-md">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/lists">
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Mis Listas
                </DropdownMenuItem>
              </Link>
              <Link href="/achievements">
                <DropdownMenuItem>
                  <Trophy className="mr-2 h-4 w-4" />
                  Logros
                </DropdownMenuItem>
              </Link>
              <Link href="/stats">
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Estadísticas
                </DropdownMenuItem>
              </Link>
              <Link href="/import-export">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Importar/Exportar
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/settings">
                <DropdownMenuItem>
                  <Contrast className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/admin">
                <DropdownMenuItem>Panel Admin</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-md">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                      />
                    </svg>
                  </div>
                  Otakutrack
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        "hover:bg-accent/50",
                        pathname === item.href
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}


          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Notificaciones"
              >
                <Bell className="h-4 w-4 animate-wiggle" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] animate-bounce">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-md">
              <div className="flex items-center justify-between p-3">
                <h3 className="font-semibold text-sm">Notificaciones</h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Marcar leídas
                </Button>
              </div>
              <DropdownMenuSeparator />
              <Link href="/notifications">
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Nuevo episodio disponible</p>
                    <p className="text-xs text-muted-foreground">Attack on Titan - Episodio 25</p>
                    <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/notifications">
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Nuevo seguidor</p>
                    <p className="text-xs text-muted-foreground">@otaku_master comenzó a seguirte</p>
                    <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/notifications">
                <DropdownMenuItem className="justify-center text-sm">Ver todas</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size Control */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Tamaño de fuente"
              >
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
              <DropdownMenuLabel>Tamaño de fuente</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFontSize("small")}>
                <Type className="mr-2 h-3 w-3" />
                Pequeño
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("medium")}>
                <Type className="mr-2 h-4 w-4" />
                Mediano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("large")}>
                <Type className="mr-2 h-5 w-5" />
                Grande
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Cambiar tema"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
              <DropdownMenuLabel>Tema</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Menú de usuario"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-md">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/lists">
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Mis Listas
                </DropdownMenuItem>
              </Link>
              <Link href="/achievements">
                <DropdownMenuItem>
                  <Trophy className="mr-2 h-4 w-4" />
                  Logros
                </DropdownMenuItem>
              </Link>
              <Link href="/stats">
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Estadísticas
                </DropdownMenuItem>
              </Link>
              <Link href="/import-export">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Importar/Exportar
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/settings">
                <DropdownMenuItem>
                  <Contrast className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/admin">
                <DropdownMenuItem>Panel Admin</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-accent/50 hover:scale-110 transition-all"
                aria-label="Menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-md">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                      />
                    </svg>
                  </div>
                  Otakutrack
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        "hover:bg-accent/50",
                        pathname === item.href
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
