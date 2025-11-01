import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Clock, Play, Sparkles, Users, Trophy } from "lucide-react"

// Mock data for popular titles
const popularAnime = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/anime-poster.png",
    rating: 9.0,
    status: "Completed",
    episodes: 87,
    type: "anime",
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "/demon-slayer-anime-poster.png",
    rating: 8.7,
    status: "Ongoing",
    episodes: 55,
    type: "anime",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-poster.png",
    rating: 8.6,
    status: "Ongoing",
    episodes: 47,
    type: "anime",
  },
  {
    id: 4,
    title: "One Piece",
    image: "/anime-poster.png",
    rating: 8.9,
    status: "Ongoing",
    episodes: 1100,
    type: "anime",
  },
  {
    id: 5,
    title: "My Hero Academia",
    image: "/my-hero-academia-poster.png",
    rating: 8.4,
    status: "Ongoing",
    episodes: 138,
    type: "anime",
  },
  {
    id: 6,
    title: "Chainsaw Man",
    image: "/chainsaw-man-anime-poster.png",
    rating: 8.5,
    status: "Completed",
    episodes: 12,
    type: "anime",
  },
]

const popularManga = [
  {
    id: 7,
    title: "Berserk",
    image: "/berserk-manga-cover.jpg",
    rating: 9.1,
    status: "Ongoing",
    chapters: 374,
    type: "manga",
  },
  {
    id: 8,
    title: "One Punch Man",
    image: "/one-punch-man-manga-cover.png",
    rating: 8.7,
    status: "Ongoing",
    chapters: 195,
    type: "manga",
  },
  {
    id: 9,
    title: "Tokyo Ghoul",
    image: "/tokyo-ghoul-manga-cover.jpg",
    rating: 8.3,
    status: "Completed",
    chapters: 143,
    type: "manga",
  },
  {
    id: 10,
    title: "Vinland Saga",
    image: "/vinland-saga-manga-cover.jpg",
    rating: 8.8,
    status: "Ongoing",
    chapters: 207,
    type: "manga",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">AnimeTracker</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/search">
                <Button variant="ghost">Search</Button>
              </Link>
              <Link href="/login">
                <Button variant="default">Sign In</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-shimmer" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary to-secondary animate-glow">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                Bienvenido a Otakutrack
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tu Viaje Anime & Manga Comienza Aquí
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
              Descubre, rastrea y comparte tus series favoritas. Únete a miles de otakus organizando sus listas y
              conectando con la comunidad.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Comenzar Gratis
                </Button>
              </Link>
              <Link href="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 hover:scale-105 transition-transform bg-transparent"
                >
                  Explorar Títulos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-primary/20 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Logros y Retos</h3>
              <p className="text-muted-foreground">
                Desbloquea medallas, completa desafíos y sube en los rankings de la comunidad
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-secondary/20 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comunidad Activa</h3>
              <p className="text-muted-foreground">
                Conecta con otros fans, comparte reseñas y participa en foros temáticos
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-accent/20 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recomendaciones IA</h3>
              <p className="text-muted-foreground">
                Descubre nuevos títulos personalizados basados en tus gustos y preferencias
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-muted-foreground">Anime & Manga</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <Star className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">1M+</p>
                  <p className="text-muted-foreground">Reseñas de Usuarios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">24/7</p>
                  <p className="text-muted-foreground">Siempre Actualizado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Anime Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold text-foreground">Popular Anime</h3>
          <Link href="/search?type=anime">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularAnime.map((anime) => (
            <Link key={anime.id} href={`/anime/${anime.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <img
                    src={anime.image || "/placeholder.svg"}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {anime.rating}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium">{anime.episodes} Episodes</p>
                      <Badge variant="secondary" className="mt-1">
                        {anime.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm text-foreground line-clamp-2 text-balance">{anime.title}</h4>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Manga Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold text-foreground">Popular Manga</h3>
          <Link href="/search?type=manga">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularManga.map((manga) => (
            <Link key={manga.id} href={`/manga/${manga.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <img
                    src={manga.image || "/placeholder.svg"}
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {manga.rating}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium">{manga.chapters} Chapters</p>
                      <Badge variant="secondary" className="mt-1">
                        {manga.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm text-foreground line-clamp-2 text-balance">{manga.title}</h4>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 AnimeTracker. Track your anime and manga journey.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
