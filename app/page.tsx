import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Clock, Play, Sparkles, Users, Trophy } from "lucide-react"
import { getTopAnime, getTopManga } from "@/lib/jikanApi"
import { translate } from "@/lib/translator"

export default async function HomePage() {
  const { data: popularAnime } = await getTopAnime();
  const { data: popularManga } = await getTopManga();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}


      {/* Hero Section */}
<section className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-background.jpg" // Replace with a high-quality background image
            alt="Anime collage background"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Tu Universo de Anime y Manga</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explora, organiza y sumérgete en tus historias favoritas. Todo en un solo lugar.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Comenzar Ahora
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Explorar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 bg-primary/80 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Logros y Retos</h3>
              <p className="text-muted-foreground">
                Desbloquea medallas, completa desafíos y sube en los rankings de la comunidad.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 bg-primary/80 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comunidad Activa</h3>
              <p className="text-muted-foreground">
                Conecta con otros fans, comparte reseñas y participa en foros temáticos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 bg-primary/80 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recomendaciones IA</h3>
              <p className="text-muted-foreground">
                Descubre nuevos títulos personalizados basados en tus gustos y preferencias.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Anime Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold text-foreground">Anime Popular</h3>
          <Link href="/search?type=anime">
            <Button variant="ghost">Ver todo</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {popularAnime?.map((anime: any) => (
            <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
              <Card className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={anime.images?.jpg?.image_url || "/placeholder.svg"}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {anime.score}
                    </Badge>
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
          <h3 className="text-3xl font-bold text-foreground">Manga Popular</h3>
          <Link href="/search?type=manga">
            <Button variant="ghost">Ver todo</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularManga?.map((manga: any) => (
            <Link key={manga.mal_id} href={`/manga/${manga.mal_id}`}>
              <Card className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={manga.images?.jpg?.image_url || "/placeholder.svg"}
                    alt={manga.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {manga.score}
                    </Badge>
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


    </div>
  )
}
