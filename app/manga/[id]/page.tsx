import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Play, Star, TrendingUp, Heart, Bookmark, Share2, Plus } from "lucide-react"

// Mock manga data
const mangaData = {
  id: 7,
  title: "Berserk",
  japaneseTitle: "Beruseruku",
  image: "/berserk-manga-cover.jpg",
  banner: "/berserk-banner.jpg",
  rating: 9.1,
  status: "Publishing",
  chapters: 374,
  volumes: 41,
  published: "Aug 1989 - Present",
  authors: ["Kentaro Miura", "Studio Gaga"],
  serialization: "Young Animal",
  genres: ["Action", "Adventure", "Drama", "Fantasy", "Horror", "Supernatural"],
  synopsis:
    "Guts, a former mercenary now known as the 'Black Swordsman,' is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.",
  score: 9.1,
  scoredBy: 234567,
  ranked: 1,
  popularity: 3,
  members: 456789,
  favorites: 89012,
}

const characters = [
  { name: "Guts", role: "Main", image: "/guts-character.jpg" },
  { name: "Griffith", role: "Main", image: "/griffith-character.jpg" },
  { name: "Casca", role: "Main", image: "/casca-character.jpg" },
  { name: "Puck", role: "Supporting", image: "/puck-character.jpg" },
]

const recommendations = [
  {
    id: 8,
    title: "Vagabond",
    image: "/vagabond-manga-cover.jpg",
    rating: 9.0,
  },
  {
    id: 9,
    title: "Vinland Saga",
    image: "/vinland-saga-manga-cover.jpg",
    rating: 8.8,
  },
  {
    id: 10,
    title: "Kingdom",
    image: "/kingdom-manga-cover.jpg",
    rating: 8.7,
  },
  {
    id: 11,
    title: "Claymore",
    image: "/claymore-manga-cover.jpg",
    rating: 8.2,
  },
]

const reviews = [
  {
    user: "MangaReader2024",
    rating: 10,
    date: "1 week ago",
    helpful: 456,
    review:
      "A dark fantasy masterpiece with incredible art and storytelling. Miura's legacy lives on through this epic tale of revenge, ambition, and humanity.",
  },
  {
    user: "DarkFantasyFan",
    rating: 10,
    date: "3 weeks ago",
    helpful: 389,
    review:
      "The art is breathtaking, the story is gripping, and the characters are unforgettable. This is what peak manga looks like.",
  },
]

export default function MangaDetailPage() {
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

      {/* Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={mangaData.banner || "/placeholder.svg?height=400&width=1920"}
          alt={mangaData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cover and Actions */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <img
                src={mangaData.image || "/placeholder.svg?height=600&width=400"}
                alt={mangaData.title}
                className="w-full aspect-[3/4] object-cover"
              />
              <CardContent className="p-4 space-y-3">
                <Button className="w-full" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add to List
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge variant="secondary">{mangaData.status}</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Chapters</p>
                  <p className="text-foreground font-medium">{mangaData.chapters}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volumes</p>
                  <p className="text-foreground font-medium">{mangaData.volumes}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Published</p>
                  <p className="text-foreground font-medium">{mangaData.published}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Authors</p>
                  <p className="text-foreground font-medium">{mangaData.authors.join(", ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Serialization</p>
                  <p className="text-foreground font-medium">{mangaData.serialization}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Genres</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mangaData.genres.map((genre) => (
                      <Badge key={genre} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ranked</span>
                  <span className="text-foreground font-medium">#{mangaData.ranked}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Popularity</span>
                  <span className="text-foreground font-medium">#{mangaData.popularity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="text-foreground font-medium">{mangaData.members.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Favorites</span>
                  <span className="text-foreground font-medium">{mangaData.favorites.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-foreground mb-2">{mangaData.title}</h2>
              <p className="text-xl text-muted-foreground mb-4">{mangaData.japaneseTitle}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-primary fill-primary" />
                  <span className="text-3xl font-bold text-foreground">{mangaData.score}</span>
                  <span className="text-muted-foreground">({mangaData.scoredBy.toLocaleString()} users)</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="characters">Characters</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Synopsis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{mangaData.synopsis}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Main Characters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {characters.slice(0, 4).map((character) => (
                        <div key={character.name} className="text-center">
                          <img
                            src={character.image || "/placeholder.svg?height=200&width=150"}
                            alt={character.name}
                            className="w-full aspect-[3/4] object-cover rounded-lg mb-2"
                          />
                          <p className="font-medium text-sm text-foreground">{character.name}</p>
                          <p className="text-xs text-muted-foreground">{character.role}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="characters">
                <Card>
                  <CardHeader>
                    <CardTitle>Characters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {characters.map((character) => (
                        <div key={character.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                          <img
                            src={character.image || "/placeholder.svg?height=100&width=75"}
                            alt={character.name}
                            className="w-16 h-24 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-foreground">{character.name}</p>
                            <Badge variant="secondary" className="mt-1">
                              {character.role}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.user}</CardTitle>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-primary fill-primary" />
                            <span className="text-xl font-bold text-foreground">{review.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground leading-relaxed mb-4">{review.review}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Button variant="ghost" size="sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle>You Might Also Like</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {recommendations.map((rec) => (
                        <Link key={rec.id} href={`/manga/${rec.id}`}>
                          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                            <div className="relative aspect-[3/4]">
                              <img
                                src={rec.image || "/placeholder.svg"}
                                alt={rec.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-primary text-primary-foreground">
                                  <Star className="h-3 w-3 mr-1" />
                                  {rec.rating}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <h4 className="font-semibold text-sm text-foreground line-clamp-2">{rec.title}</h4>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
