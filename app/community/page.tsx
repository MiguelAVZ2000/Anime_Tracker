"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Heart, Share2, Search, Filter } from "lucide-react"

const topUsers = [
  {
    id: 1,
    name: "SakuraFan99",
    avatar: "/user-avatar.jpg",
    rank: 1,
    points: 2450,
    animeCompleted: 156,
    followers: 1234,
  },
  {
    id: 2,
    name: "OtakuMaster",
    avatar: "/user-avatar.jpg",
    rank: 2,
    points: 2180,
    animeCompleted: 142,
    followers: 987,
  },
  {
    id: 3,
    name: "AnimeLover",
    avatar: "/user-avatar.jpg",
    rank: 3,
    points: 1950,
    animeCompleted: 128,
    followers: 856,
  },
]

const communities = [
  {
    id: 1,
    name: "Shonen Fans",
    description: "Para los amantes de la acción y aventura",
    members: 15420,
    posts: 8934,
    icon: "⚔️",
  },
  {
    id: 2,
    name: "Slice of Life",
    description: "Historias cotidianas y emotivas",
    members: 8765,
    posts: 5432,
    icon: "🌸",
  },
  {
    id: 3,
    name: "Manga Readers",
    description: "Discusiones sobre manga y manhwa",
    members: 12340,
    posts: 9876,
    icon: "📚",
  },
]

const activityFeed = [
  {
    id: 1,
    user: "SakuraFan99",
    avatar: "/user-avatar.jpg",
    action: "completó",
    title: "Attack on Titan",
    rating: 10,
    time: "hace 5 min",
  },
  {
    id: 2,
    user: "OtakuMaster",
    avatar: "/user-avatar.jpg",
    action: "añadió a su lista",
    title: "Demon Slayer",
    time: "hace 15 min",
  },
  {
    id: 3,
    user: "AnimeLover",
    avatar: "/user-avatar.jpg",
    action: "escribió una reseña de",
    title: "Jujutsu Kaisen",
    rating: 9,
    time: "hace 30 min",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Comunidad</h1>
        <p className="text-muted-foreground">Conecta con otros fans y comparte tu pasión por el anime</p>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feed">Feed de Actividad</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="communities">Comunidades</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar actividad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {activityFeed.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                        <span className="font-semibold text-primary">{activity.title}</span>
                        {activity.rating && <Badge className="bg-primary">⭐ {activity.rating}/10</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{activity.time}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Me gusta
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comentar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Compartir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Usuarios</CardTitle>
              <CardDescription>Los usuarios más activos de la comunidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      #{user.rank}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{user.points} puntos</span>
                        <span>•</span>
                        <span>{user.animeCompleted} completados</span>
                        <span>•</span>
                        <span>{user.followers} seguidores</span>
                      </div>
                    </div>
                    <Button variant="outline">Seguir</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.map((community) => (
              <Card key={community.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-4xl">{community.icon}</div>
                    <CardTitle className="text-xl">{community.name}</CardTitle>
                  </div>
                  <CardDescription>{community.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Miembros
                      </span>
                      <span className="font-semibold">{community.members.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Posts
                      </span>
                      <span className="font-semibold">{community.posts.toLocaleString()}</span>
                    </div>
                    <Button className="w-full">Unirse</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
