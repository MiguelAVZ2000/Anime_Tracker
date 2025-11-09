"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { getSeasonNow } from "@/lib/jikanApi";

interface AnimeScheduleItem {
  id: number;
  title: string;
  episode?: number;
  time?: string;
  image: string;
  rating?: number;
}

const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [animeSchedule, setAnimeSchedule] = useState<{ [key: string]: AnimeScheduleItem[] }>({});
  const [loadingAnime, setLoadingAnime] = useState(true);
  const [errorAnime, setErrorAnime] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeSchedule = async () => {
      setLoadingAnime(true);
      setErrorAnime(null);
      try {
        const response = await getSeasonNow();
        const schedule: { [key: string]: AnimeScheduleItem[] } = {
          Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: [], Domingo: []
        };

        const dayMap: { [key: string]: string } = {
          "Mondays": "Lunes",
          "Tuesdays": "Martes",
          "Wednesdays": "Miércoles",
          "Thursdays": "Jueves",
          "Fridays": "Viernes",
          "Saturdays": "Sábado",
          "Sundays": "Domingo"
        };

        response.data.forEach((anime: any) => {
          if (anime.broadcast && anime.broadcast.day) {
            const day = dayMap[anime.broadcast.day];
            const item: AnimeScheduleItem = {
              id: anime.mal_id,
              title: anime.title_english || anime.title || anime.title_japanese,
              episode: anime.episodes,
              time: anime.broadcast.time,
              image: anime.images?.jpg?.large_image_url || anime.images?.webp?.large_image_url || "/placeholder.svg",
              rating: anime.score,
            };
            if (day && schedule[day]) {
              schedule[day].push(item);
            }
          }
        });
        setAnimeSchedule(schedule);
      } catch (err: any) {
        setErrorAnime("Error al cargar el calendario de anime.");
        console.error("Error fetching anime schedule:", err);
      } finally {
        setLoadingAnime(false);
      }
    };

    fetchAnimeSchedule();
  }, [currentWeek]);

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
        <TabsList className="grid w-full max-w-md grid-cols-1">
          <TabsTrigger value="anime">Anime Semanal</TabsTrigger>
        </TabsList>

        <TabsContent value="anime" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Anime Semanal</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek - 1)} disabled={currentWeek === 0}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek + 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingAnime && <p className="text-center text-muted-foreground py-4">Cargando calendario de anime...</p>}
              {errorAnime && <p className="text-center text-destructive py-4">{errorAnime}</p>}
              {!loadingAnime && !errorAnime && (
                <div className="grid gap-6">
                  {weekDays.map((day) => (
                    <div key={day} className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {day}
                        <Badge variant="secondary">
                          {animeSchedule[day]?.length || 0} estrenos
                        </Badge>
                      </h3>
                      <div className="grid gap-3">
                        {animeSchedule[day]?.map((anime) => (
                          <Link key={anime.id} href={`/anime/${anime.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <Image
                                    src={anime.image}
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
                        {(!animeSchedule[day] || animeSchedule[day].length === 0) && (
                          <p className="text-sm text-muted-foreground text-center py-4">No hay estrenos programados</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
