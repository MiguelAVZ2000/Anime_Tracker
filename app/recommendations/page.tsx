"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Play, Star, Sparkles, TrendingUp, Users, Heart } from "lucide-react"

// Mock recommendations data
const forYouRecommendations = [
  {
    id: 1,
    title: "Frieren: Beyond Journey's End",
    image: "/frieren-anime-poster.jpg",
    rating: 9.0,
    type: "anime",
    reason: "Based on your love for fantasy and character-driven stories",
    matchPercentage: 95,
    genres: ["Adventure", "Drama", "Fantasy"],
  },
  {
    id: 2,
    title: "Vinland Saga",
    image: "/vinland-saga-anime-poster.jpg",
    rating: 8.9,
    type: "anime",
    reason: "Similar to Attack on Titan's epic storytelling",
    matchPercentage: 92,
    genres: ["Action", "Adventure", "Drama"],
  },
  {
    id: 3,
    title: "Spy x Family",
    image: "/spy-family-poster.png",
    rating: 8.5,
    type: "anime",
    reason: "You enjoyed comedy-action series",
    matchPercentage: 88,
    genres: ["Action", "Comedy"],
  },
  {
    id: 4,
    title: "Blue Lock",
    image: "/blue-lock-anime-poster.jpg",
    rating: 8.1,
    type: "anime",
    reason: "Fans of competitive sports anime will love this",
    matchPercentage: 85,
    genres: ["Sports", "Drama"],
  },
]

const trendingRecommendations = [
  {
    id: 5,
    title: "Demon Slayer",
    image: "/demon-slayer-anime-poster.png",
    rating: 8.7,
    type: "anime",
    trendingRank: 1,
    genres: ["Action", "Supernatural"],
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-poster.png",
    rating: 8.6,
    type: "anime",
    trendingRank: 2,
    genres: ["Action", "Supernatural"],
  },
  {
    id: 7,
    title: "Chainsaw Man",
    image: "/chainsaw-man-anime-poster.png",
    rating: 8.5,
    type: "anime",
    trendingRank: 3,
    genres: ["Action", "Horror"],
  },
  {
    id: 8,
    title: "One Piece",
    image: "/anime-poster.png",
    rating: 8.9,
    type: "anime",
    trendingRank: 4,
    genres: ["Action", "Adventure"],
  },
]

const similarToWatched = [
  {
    id: 9,
    title: "Tokyo Ghoul",
    image: "/tokyo-ghoul-anime-poster.jpg",
    rating: 8.3,
    type: "anime",
    basedOn: "Attack on Titan",
    genres: ["Action", "Horror"],
  },
  {
    id: 10,
    title: "Parasyte",
    image: "/parasyte-anime-poster.jpg",
    rating: 8.4,
    type: "anime",
    basedOn: "Attack on Titan",
    genres: ["Action", "Horror", "Sci-Fi"],
  },
  {
    id: 11,
    title: "Berserk",
    image: "/berserk-manga-cover.jpg",
    rating: 9.1,
    type: "manga",
    basedOn: "Attack on Titan",
    genres: ["Action", "Drama", "Fantasy"],
  },
  {
    id: 12,
    title: "Vagabond",
    image: "/vagabond-manga-cover.jpg",
    rating: 9.0,
    type: "manga",
    basedOn: "Vinland Saga",
    genres: ["Action", "Drama"],
  },
]

const communityPicks = [
  {
    id: 13,
    title: "My Hero Academia",
    image: "/my-hero-academia-poster.png",
    rating: 8.4,
    type: "anime",
    recommendedBy: 1234,
    genres: ["Action", "Comedy"],
  },
  {
    id: 14,
    title: "One Punch Man",
    image: "/one-punch-man-manga-cover.png",
    rating: 8.7,
    type: "manga",
    recommendedBy: 987,
    genres: ["Action", "Comedy"],
  },
  {
    id: 15,
    title: "Kingdom",
    image: "/kingdom-manga-cover.jpg",
    rating: 8.7,
    type: "manga",
    recommendedBy: 856,
    genres: ["Action", "Drama"],
  },
]

export default function RecommendationsPage() {
  const [selectedTab, setSelectedTab] = useState("for-you")

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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-10 w-10 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Recommendations</h2>
          </div>
          <p className="text-muted-foreground text-lg">Discover your next favorite anime and manga</p>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="for-you" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              For You
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="similar" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Similar to Watched
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community Picks
            </TabsTrigger>
          </TabsList>

          {/* For You Tab */}
          <TabsContent value="for-you" className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Personalized Just for You</h3>
                    <p className="text-muted-foreground">
                      Based on your watch history, ratings, and preferences, we&apos;ve curated these recommendations that
                      match your taste.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forYouRecommendations.map((item) => (
                <Link key={item.id} href={`/${item.type}/${item.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-32 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full aspect-[3/4] object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-primary-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            {item.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{item.title}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="capitalize">
                            {item.type}
                          </Badge>
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            {item.matchPercentage}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.reason}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.genres.map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">What&apos;s Hot Right Now</h3>
                    <p className="text-muted-foreground">
                      The most popular anime and manga that everyone is talking about this week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingRecommendations.map((item) => (
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
                        <Badge className="bg-secondary text-secondary-foreground">#{item.trendingRank}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">{item.title}</h4>
                      <div className="flex flex-wrap gap-1">
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
          </TabsContent>

          {/* Similar to Watched Tab */}
          <TabsContent value="similar" className="space-y-6">
            <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Heart className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Because You Watched</h3>
                    <p className="text-muted-foreground">
                      Titles similar to the anime and manga you&apos;ve already enjoyed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {Object.entries(
                similarToWatched.reduce(
                  (acc, item) => {
                    if (!acc[item.basedOn]) acc[item.basedOn] = []
                    acc[item.basedOn].push(item)
                    return acc
                  },
                  {} as Record<string, typeof similarToWatched>,
                ),
              ).map(([basedOn, items]) => (
                <div key={basedOn}>
                  <h3 className="text-xl font-bold text-foreground mb-4">Because you watched {basedOn}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
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
                          </div>
                          <CardContent className="p-3">
                            <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">{item.title}</h4>
                            <div className="flex flex-wrap gap-1">
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
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Community Picks Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Community Favorites</h3>
                    <p className="text-muted-foreground">Highly recommended by users with similar tastes to yours.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {communityPicks.map((item) => (
                <Link key={item.id} href={`/${item.type}/${item.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-24 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full aspect-[3/4] object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {item.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground mb-2 line-clamp-2">{item.title}</h4>
                        <Badge variant="secondary" className="capitalize mb-2">
                          {item.type}
                        </Badge>
                        <p className="text-sm text-muted-foreground mb-2">
                          <Users className="h-3 w-3 inline mr-1" />
                          {item.recommendedBy.toLocaleString()} recommendations
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
