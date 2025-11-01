import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Play,
  BookOpen,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  Calendar,
  BarChart3,
  Bell,
  Sparkles,
} from "lucide-react"
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userStatsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-stats`);
  const userStats = userStatsResponse.ok ? await userStatsResponse.json() : null;

  if (!userStats) {
    redirect("/login");
  }

  const [currentlyWatchingResponse, currentlyReadingResponse, recentActivityResponse, upcomingReleasesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/currently-watching`),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/currently-reading`),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recent-activity`),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upcoming-releases`),
  ]);

  const currentlyWatching = currentlyWatchingResponse.ok ? await currentlyWatchingResponse.json() : [];
  const currentlyReading = currentlyReadingResponse.ok ? await currentlyReadingResponse.json() : [];
  const recentActivity = recentActivityResponse.ok ? await recentActivityResponse.json() : [];
  const upcomingReleases = upcomingReleasesResponse.ok ? await upcomingReleasesResponse.json() : [];


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="h-8 w-8 text-primary" />
              <Link href="/">
                <h1 className="text-2xl font-bold text-foreground">AnimeTracker</h1>
              </Link>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/search">
                <Button variant="ghost">Search</Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">Bienvenido de nuevo!</h2>
          <p className="text-muted-foreground text-lg">Aquí está tu resumen de anime y manga</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Watching</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{userStats.animeWatching}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{userStats.animeCompleted}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Plan to Watch</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{userStats.animePlanToWatch}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Reading</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{userStats.mangaReading}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-secondary" />
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{userStats.averageScore}</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Total Episodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{userStats.totalEpisodesWatched.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Episodes watched</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Days Watched
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{userStats.daysWatched}</p>
              <p className="text-sm text-muted-foreground mt-1">Days of content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Chapters Read
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{userStats.totalChaptersRead.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Manga chapters</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary animate-wiggle" />
              Próximos Estrenos
              <Badge className="ml-2 bg-primary animate-pulse">Nuevo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingReleases.map((release) => (
                <div
                  key={release.id}
                  className="flex gap-3 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{release.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{release.releaseDate}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{release.releaseTime}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {release.type === "anime" ? `Episodio ${release.episode}` : `Capítulo ${release.chapter}`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/calendar">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Calendario Completo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gradient-to-br from-accent/5 to-purple-500/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Recomendaciones para Ti
              <Badge className="ml-2 bg-gradient-to-r from-accent to-purple-500">IA</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Steins;Gate", match: "95%", image: "/steins-gate-anime.png" },
                { title: "Monster", match: "92%", image: "/monster-anime.jpg" },
                { title: "Mob Psycho 100", match: "89%", image: "/mob-psycho-anime.jpg" },
                { title: "Vinland Saga", match: "87%", image: "/vinland-saga-anime.jpg" },
              ].map((rec, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <img
                      src={rec.image || "/placeholder.svg"}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-accent text-white">{rec.match}</Badge>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center">{rec.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/recommendations">
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ver Más Recomendaciones
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Currently Watching */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Currently Watching
                  </span>
                  <Link href="/list/watching">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentlyWatching.map((anime) => (
                    <Link key={anime.id} href={`/anime/${anime.id}`}>
                      <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <img
                          src={anime.image || "/placeholder.svg"}
                          alt={anime.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{anime.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              {anime.rating}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {anime.progress}/{anime.total} episodes
                            </span>
                          </div>
                          <Progress value={(anime.progress / anime.total) * 100} className="h-2" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Currently Reading */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Currently Reading
                  </span>
                  <Link href="/list/reading">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentlyReading.map((manga) => (
                    <Link key={manga.id} href={`/manga/${manga.id}`}>
                      <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <img
                          src={manga.image || "/placeholder.svg"}
                          alt={manga.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{manga.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              {manga.rating}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {manga.progress}/{manga.total} chapters
                            </span>
                          </div>
                          <Progress value={(manga.progress / manga.total) * 100} className="h-2" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "completed" && <CheckCircle2 className="h-5 w-5 text-secondary" />}
                        {activity.type === "added" && <Clock className="h-5 w-5 text-accent" />}
                        {activity.type === "updated" && <TrendingUp className="h-5 w-5 text-primary" />}
                        {activity.type === "rated" && <Star className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
