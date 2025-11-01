"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Eye, Clock, Plus, Search, TrendingUp, Pin } from "lucide-react"

const categories = [
  { id: "shonen", name: "Shonen", icon: "⚔️", threads: 1234, posts: 8765 },
  { id: "seinen", name: "Seinen", icon: "🎯", threads: 876, posts: 5432 },
  { id: "slice-of-life", name: "Slice of Life", icon: "🌸", threads: 654, posts: 4321 },
  { id: "romance", name: "Romance", icon: "💕", threads: 543, posts: 3210 },
  { id: "horror", name: "Horror", icon: "👻", threads: 321, posts: 2109 },
  { id: "isekai", name: "Isekai", icon: "🌍", threads: 987, posts: 6543 },
]

const threads = [
  {
    id: 1,
    title: "¿Cuál es el mejor arco de Attack on Titan?",
    author: "SakuraFan99",
    avatar: "/user-avatar.jpg",
    category: "Shonen",
    replies: 45,
    views: 1234,
    lastActivity: "Hace 5 min",
    isPinned: true,
    likes: 23,
  },
  {
    id: 2,
    title: "Recomendaciones de manga seinen poco conocidos",
    author: "OtakuMaster",
    avatar: "/user-avatar.jpg",
    category: "Seinen",
    replies: 32,
    views: 876,
    lastActivity: "Hace 15 min",
    isPinned: false,
    likes: 18,
  },
  {
    id: 3,
    title: "Debate: ¿Demon Slayer está sobrevalorado?",
    author: "AnimeLover",
    avatar: "/user-avatar.jpg",
    category: "Shonen",
    replies: 89,
    views: 2345,
    lastActivity: "Hace 30 min",
    isPinned: false,
    likes: 45,
  },
  {
    id: 4,
    title: "Los mejores openings de anime de 2024",
    author: "MusicFan",
    avatar: "/user-avatar.jpg",
    category: "General",
    replies: 67,
    views: 1567,
    lastActivity: "Hace 1 hora",
    isPinned: false,
    likes: 34,
  },
]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewThread, setShowNewThread] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-foreground">Foro de la Comunidad</h1>
          <Button onClick={() => setShowNewThread(!showNewThread)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Tema
          </Button>
        </div>
        <p className="text-muted-foreground">Discute sobre tus animes y mangas favoritos con la comunidad</p>
      </div>

      {showNewThread && (
        <Card className="mb-6 border-primary/50">
          <CardHeader>
            <CardTitle>Crear Nuevo Tema</CardTitle>
            <CardDescription>Comparte tus pensamientos con la comunidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Título del tema" />
            </div>
            <div>
              <Textarea placeholder="Escribe tu mensaje..." rows={6} />
            </div>
            <div className="flex items-center gap-4">
              <Button>Publicar</Button>
              <Button variant="outline" onClick={() => setShowNewThread(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="trending">Tendencias</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar temas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {threads.map((thread) => (
            <Card key={thread.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={thread.avatar || "/placeholder.svg"} alt={thread.author} />
                    <AvatarFallback>{thread.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {thread.isPinned && <Pin className="h-4 w-4 text-primary" />}
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">{thread.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="font-medium">{thread.author}</span>
                          <span>•</span>
                          <Badge variant="outline">{thread.category}</Badge>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {thread.lastActivity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mt-3">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        {thread.replies} respuestas
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {thread.views} vistas
                      </span>
                      <Button variant="ghost" size="sm" className="h-8">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {thread.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Temas en Tendencia
              </CardTitle>
              <CardDescription>Los temas más populares de la semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threads
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((thread, index) => (
                    <div
                      key={thread.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold hover:text-primary cursor-pointer">{thread.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span>{thread.replies} respuestas</span>
                          <span>•</span>
                          <span>{thread.views} vistas</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {category.threads} temas • {category.posts} posts
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Categoría
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
