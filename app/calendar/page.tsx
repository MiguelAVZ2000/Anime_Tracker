"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const animeSchedule = {
  Lunes: [
    { id: 1, title: "Attack on Titan", episode: 25, time: "16:00", image: "/attack-on-titan-poster.jpg", rating: 9.2 },
    { id: 2, title: "Demon Slayer", episode: 12, time: "18:30", image: "/demon-slayer-anime-poster.png", rating: 8.9 },
  ],
  Martes: [
    { id: 3, title: "Jujutsu Kaisen", episode: 18, time: "17:00", image: "/jujutsu-kaisen-poster.png", rating: 9.0 },
    {
      id: 4,
      title: "My Hero Academia",
      episode: 22,
      time: "19:00",
      image: "/my-hero-academia-poster.png",
      rating: 8.7,
    },
  ],
  Miércoles: [
    { id: 5, title: "Chainsaw Man", episode: 8, time: "16:30", image: "/chainsaw-man-anime-poster.png", rating: 8.8 },
    { id: 6, title: "One Punch Man", episode: 15, time: "20:00", image: "/one-punch-man-manga-cover.png", rating: 8.9 },
  ],
  Jueves: [
    { id: 7, title: "Tokyo Ghoul", episode: 10, time: "17:30", image: "/tokyo-ghoul-anime-poster.jpg", rating: 8.5 },
  ],
  Viernes: [
    { id: 8, title: "Parasyte", episode: 14, time: "18:00", image: "/parasyte-anime-poster.jpg", rating: 8.6 },
    { id: 9, title: "Attack on Titan", episode: 26, time: "21:00", image: "/attack-on-titan-poster.jpg", rating: 9.2 },
  ],
  Sábado: [
    { id: 10, title: "Demon Slayer", episode: 13, time: "15:00", image: "/demon-slayer-anime-poster.png", rating: 8.9 },
  ],
  Domingo: [
    { id: 11, title: "Jujutsu Kaisen", episode: 19, time: "16:00", image: "/jujutsu-kaisen-poster.png", rating: 9.0 },
  ],
}

const mangaReleases = [
  { id: 1, title: "Berserk", chapter: 375, date: "2025-11-05", image: "/berserk-manga-cover.jpg", rating: 9.5 },
  {
    id: 2,
    title: "One Piece",
    chapter: 1095,
    date: "2025-11-08",
    image: "/one-punch-man-manga-cover.png",
    rating: 9.3,
  },
  {
    id: 3,
    title: "Attack on Titan",
    chapter: 142,
    date: "2025-11-12",
    image: "/attack-on-titan-poster.jpg",
    rating: 9.2,
  },
  {
    id: 4,
    title: "Chainsaw Man",
    chapter: 145,
    date: "2025-11-15",
    image: "/chainsaw-man-anime-poster.png",
    rating: 8.8,
  },
]

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(0)

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Calendario de Estrenos</h1>
          <p className="text-muted-foreground">Descubre cuándo salen tus animes y mangas favoritos</p>
        </div>
        <CalendarIcon className="h-12 w-12 text-primary" />
      </div>

      <Tabs defaultValue="anime" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="anime">Anime Semanal</TabsTrigger>
          <TabsTrigger value="manga">Manga Próximos</TabsTrigger>
        </TabsList>

        <TabsContent value="anime" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Semana Actual</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek + 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {weekDays.map((day) => (
                  <div key={day} className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {day}
                      <Badge variant="secondary">
                        {animeSchedule[day as keyof typeof animeSchedule]?.length || 0} estrenos
                      </Badge>
                    </h3>
                    <div className="grid gap-3">
                      {animeSchedule[day as keyof typeof animeSchedule]?.map((anime) => (
                        <Link key={anime.id} href={`/anime/${anime.id}`}>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <Image
                                  src={anime.image || "/placeholder.svg"}
                                  alt={anime.title}
                                  width={80}
                                  height={112}
                                  className="w-20 h-28 object-cover rounded-md"
                                />
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold">{anime.title}</h4>
                                      <p className="text-sm text-muted-foreground">Episodio {anime.episode}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm font-medium">{anime.rating}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{anime.time}</span>
                                  </div>
                                  <Button size="sm" className="w-full">
                                    Añadir Recordatorio
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                      {!animeSchedule[day as keyof typeof animeSchedule]?.length && (
                        <p className="text-sm text-muted-foreground text-center py-4">No hay estrenos programados</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manga" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Capítulos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mangaReleases.map((manga) => (
                  <Link key={manga.id} href={`/manga/${manga.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <Image
                            src={manga.image || "/placeholder.svg"}
                            alt={manga.title}
                            width={80}
                            height={112}
                            className="w-20 h-28 object-cover rounded-md"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{manga.title}</h4>
                                <p className="text-sm text-muted-foreground">Capítulo {manga.chapter}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{manga.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {new Date(manga.date).toLocaleDateString("es-ES", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <Button size="sm" className="w-full">
                              Añadir Recordatorio
                            </Button>
                          </div>
                        </div>
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
  )
}
