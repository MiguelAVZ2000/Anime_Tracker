"use client"

import { Users, TrendingUp, Heart, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const topUsers = [
  { id: 1, username: "otaku_master", avatar: "/user-avatar.jpg", animeWatched: 523, followers: 1250, rank: 1 },
  { id: 2, username: "anime_fan", avatar: "/user-avatar.jpg", animeWatched: 487, followers: 980, rank: 2 },
  { id: 3, username: "manga_lover", avatar: "/user-avatar.jpg", animeWatched: 445, followers: 856, rank: 3 },
  { id: 4, username: "shounen_king", avatar: "/user-avatar.jpg", animeWatched: 412, followers: 723, rank: 4 },
  { id: 5, username: "seinen_master", avatar: "/user-avatar.jpg", animeWatched: 398, followers: 654, rank: 5 },
]

const activityFeed = [
  {
    id: 1,
    user: "otaku_master",
    avatar: "/user-avatar.jpg",
    action: "completó",
    anime: "Attack on Titan",
    rating: 10,
    time: "Hace 5 minutos",
  },
  {
    id: 2,
    user: "anime_fan",
    avatar: "/user-avatar.jpg",
    action: "añadió a su lista",
    anime: "Demon Slayer",
    time: "Hace 15 minutos",
  },
  {
    id: 3,
    user: "manga_lover",
    avatar: "/user-avatar.jpg",
    action: "escribió una reseña de",
    anime: "Jujutsu Kaisen",
    rating: 9,
    time: "Hace 30 minutos",
  },
  {
    id: 4,
    user: "shounen_king",
    avatar: "/user-avatar.jpg",
    action: "está viendo",
    anime: "My Hero Academia",
    episode: 22,
    time: "Hace 1 hora",
  },
]

const recommendations = [
  {
    id: 1,
    user: "otaku_master",
    avatar: "/user-avatar.jpg",
    anime: "Steins;Gate",
    image: "/anime-poster.png",
    comment: "Una obra maestra del género sci-fi. La trama es increíble y los personajes están muy bien desarrollados.",
    likes: 45,
    comments: 12,
  },
  {
    id: 2,
    user: "anime_fan",
    avatar: "/user-avatar.jpg",
    anime: "Fullmetal Alchemist",
    image: "/anime-poster.png",
    comment: "Perfecto balance entre acción, drama y filosofía. Un must-watch para cualquier fan del anime.",
    likes: 38,
    comments: 8,
  },
]

export default function SocialPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Exploración Social</h1>
          <p className="text-muted-foreground">Conecta con otros fans de anime y manga</p>
        </div>
        <Users className="h-12 w-12 text-primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">+180 desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reseñas Hoy</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+23% vs semana pasada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interacciones</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-xs text-muted-foreground">Likes y comentarios</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ranking" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="ranking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Usuarios Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user) => (
                  <Link key={user.id} href={`/social/${user.username}`}>
                    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative">
                          {user.rank <= 3 && (
                            <Badge
                              className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
                              variant={user.rank === 1 ? "default" : "secondary"}
                            >
                              {user.rank}
                            </Badge>
                          )}
                          {user.rank > 3 && (
                            <span className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                              {user.rank}
                            </span>
                          )}
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">@{user.username}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user.animeWatched} animes vistos • {user.followers} seguidores
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Seguir
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex gap-4 p-4 rounded-lg hover:bg-accent transition-colors">
                    <Avatar>
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>{activity.user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <Link href={`/social/${activity.user}`} className="font-semibold hover:underline">
                          @{activity.user}
                        </Link>{" "}
                        {activity.action} <span className="font-semibold">{activity.anime}</span>
                        {activity.episode && ` - Episodio ${activity.episode}`}
                        {activity.rating && (
                          <Badge variant="secondary" className="ml-2">
                            ⭐ {activity.rating}/10
                          </Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Muro de Recomendaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={rec.avatar || "/placeholder.svg"} alt={rec.user} />
                          <AvatarFallback>{rec.user[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Link href={`/social/${rec.user}`} className="font-semibold hover:underline">
                            @{rec.user}
                          </Link>
                          <p className="text-sm text-muted-foreground">recomienda</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <img
                          src={rec.image || "/placeholder.svg"}
                          alt={rec.anime}
                          className="w-24 h-32 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{rec.anime}</h3>
                          <p className="text-sm text-muted-foreground">{rec.comment}</p>
                          <div className="flex gap-4 pt-2">
                            <Button variant="ghost" size="sm">
                              <Heart className="mr-2 h-4 w-4" />
                              {rec.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              {rec.comments}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
