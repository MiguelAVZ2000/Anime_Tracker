"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  Trophy,
  BarChart3,
  MessageSquare,
  Download,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSession, signOut } from "next-auth/react"
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
  const router = useRouter()
  const { setTheme } = useTheme()
  const { data: session, status } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNav, setShowNav] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0) // Example state for notifications

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) { // Desplazamiento hacia abajo y más allá de 50px
        setShowNav(false);
      } else { // Desplazamiento hacia arriba o cerca de la parte superior
        setShowNav(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Para evitar valores negativos
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Dependencia vacía para que se ejecute una sola vez al montar

  const handleNavigate = (href: string) => {
    router.push(href)
    setMobileMenuOpen(false)
  }

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
  ];

  // Placeholder for user role
  const isAdmin = session?.user?.role === 'admin';

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        "bg-background/80 backdrop-blur-md border-b border-border/40",
        isScrolled ? "shadow-xl" : "shadow-lg",
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
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] animate-bounce">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 z-[100] data-[state=closed]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
              <div className="flex items-center justify-between p-3">
                <h3 className="font-semibold text-sm">Notificaciones</h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setNotificationCount(0)}>
                  Marcar leídas
                </Button>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm" onSelect={() => handleNavigate('/notifications')}>
                Ver todas
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
            <DropdownMenuContent 
              align="end" 
              className="z-[100] data-[state=closed]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
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
          {status === 'authenticated' ? (
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
              <DropdownMenuContent 
              align="end" 
              className="w-48 z-[100] data-[state=closed]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => handleNavigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigate('/profile/lists')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Mis Listas
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigate('/achievements')}>
                    <Trophy className="mr-2 h-4 w-4" />
                    Logros
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigate('/stats')}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Estadísticas
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigate('/import-export')}>
                    <Download className="mr-2 h-4 w-4" />
                    Importar/Exportar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem onSelect={() => handleNavigate('/admin')}>
                      Panel Admin
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive">Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate('/login')}
              className="hover:bg-accent/50 hover:scale-110 transition-all"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          )}

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