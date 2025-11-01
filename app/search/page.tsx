"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Play, Star, Search, SlidersHorizontal } from "lucide-react"

// Mock search results
const allResults = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/attack-on-titan-poster.jpg",
    rating: 9.0,
    status: "Completed",
    episodes: 87,
    type: "anime",
    genres: ["Action", "Drama", "Fantasy"],
    year: 2013,
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "/demon-slayer-anime-poster.png",
    rating: 8.7,
    status: "Ongoing",
    episodes: 55,
    type: "anime",
    genres: ["Action", "Supernatural"],
    year: 2019,
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-poster.png",
    rating: 8.6,
    status: "Ongoing",
    episodes: 47,
    type: "anime",
    genres: ["Action", "Supernatural"],
    year: 2020,
  },
  {
    id: 4,
    title: "One Piece",
    image: "/anime-poster.png",
    rating: 8.9,
    status: "Ongoing",
    episodes: 1100,
    type: "anime",
    genres: ["Action", "Adventure", "Comedy"],
    year: 1999,
  },
  {
    id: 5,
    title: "My Hero Academia",
    image: "/my-hero-academia-poster.png",
    rating: 8.4,
    status: "Ongoing",
    episodes: 138,
    type: "anime",
    genres: ["Action", "Comedy"],
    year: 2016,
  },
  {
    id: 6,
    title: "Chainsaw Man",
    image: "/chainsaw-man-anime-poster.png",
    rating: 8.5,
    status: "Completed",
    episodes: 12,
    type: "anime",
    genres: ["Action", "Horror"],
    year: 2022,
  },
  {
    id: 7,
    title: "Berserk",
    image: "/berserk-manga-cover.jpg",
    rating: 9.1,
    status: "Publishing",
    chapters: 374,
    type: "manga",
    genres: ["Action", "Drama", "Fantasy", "Horror"],
    year: 1989,
  },
  {
    id: 8,
    title: "One Punch Man",
    image: "/one-punch-man-manga-cover.png",
    rating: 8.7,
    status: "Publishing",
    chapters: 195,
    type: "manga",
    genres: ["Action", "Comedy"],
    year: 2009,
  },
  {
    id: 9,
    title: "Tokyo Ghoul",
    image: "/tokyo-ghoul-manga-cover.jpg",
    rating: 8.3,
    status: "Completed",
    chapters: 143,
    type: "manga",
    genres: ["Action", "Horror", "Supernatural"],
    year: 2011,
  },
  {
    id: 10,
    title: "Vinland Saga",
    image: "/vinland-saga-manga-cover.jpg",
    rating: 8.8,
    status: "Publishing",
    chapters: 207,
    type: "manga",
    genres: ["Action", "Adventure", "Drama"],
    year: 2005,
  },
  {
    id: 11,
    title: "Frieren: Beyond Journey's End",
    image: "/frieren-anime-poster.jpg",
    rating: 9.0,
    status: "Ongoing",
    episodes: 28,
    type: "anime",
    genres: ["Adventure", "Drama", "Fantasy"],
    year: 2023,
  },
  {
    id: 12,
    title: "Spy x Family",
    image: "/spy-family-poster.png",
    rating: 8.5,
    status: "Ongoing",
    episodes: 25,
    type: "anime",
    genres: ["Action", "Comedy"],
    year: 2022,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort results
  const filteredResults = allResults
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = typeFilter === "all" || item.type === typeFilter
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase().includes(statusFilter.toLowerCase())
      const matchesGenre =
        genreFilter === "all" || item.genres.some((g) => g.toLowerCase() === genreFilter.toLowerCase())
      return matchesSearch && matchesType && matchesStatus && matchesGenre
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "year") return b.year - a.year
      return 0
    })

  const allGenres = Array.from(new Set(allResults.flatMap((item) => item.genres))).sort()

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
        {/* Search Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">Search Anime & Manga</h2>
          <p className="text-muted-foreground text-lg">Discover your next favorite series</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for anime or manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="manga">Manga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="publishing">Publishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Genre</label>
                  <Select value={genreFilter} onValueChange={setGenreFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genres</SelectItem>
                      {allGenres.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredResults.length} of {allResults.length} results
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTypeFilter("all")
                    setStatusFilter("all")
                    setGenreFilter("all")
                    setSortBy("rating")
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={typeFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setTypeFilter("all")}>
            All
          </Button>
          <Button
            variant={typeFilter === "anime" ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter("anime")}
          >
            Anime
          </Button>
          <Button
            variant={typeFilter === "manga" ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter("manga")}
          >
            Manga
          </Button>
          <div className="w-px h-8 bg-border mx-2" />
          <Button
            variant={genreFilter === "action" ? "default" : "outline"}
            size="sm"
            onClick={() => setGenreFilter(genreFilter === "action" ? "all" : "action")}
          >
            Action
          </Button>
          <Button
            variant={genreFilter === "comedy" ? "default" : "outline"}
            size="sm"
            onClick={() => setGenreFilter(genreFilter === "comedy" ? "all" : "comedy")}
          >
            Comedy
          </Button>
          <Button
            variant={genreFilter === "drama" ? "default" : "outline"}
            size="sm"
            onClick={() => setGenreFilter(genreFilter === "drama" ? "all" : "drama")}
          >
            Drama
          </Button>
          <Button
            variant={genreFilter === "fantasy" ? "default" : "outline"}
            size="sm"
            onClick={() => setGenreFilter(genreFilter === "fantasy" ? "all" : "fantasy")}
          >
            Fantasy
          </Button>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredResults.map((item) => (
              <Link key={item.id} href={`/${item.type}/${item.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        {item.rating}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-medium">
                          {item.type === "anime" ? `${item.episodes} Episodes` : `${item.chapters} Chapters`}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm text-foreground line-clamp-2 text-balance">{item.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setTypeFilter("all")
                  setStatusFilter("all")
                  setGenreFilter("all")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
