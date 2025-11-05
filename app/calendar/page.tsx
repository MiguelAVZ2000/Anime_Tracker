"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { getSeasonNow, getSeasonUpcoming } from "@/lib/jikanApi";
import { getUpcomingMangaAnilist } from "@/lib/anilistApi";

interface AnimeScheduleItem {
  id: number;
  title: string;
  episode?: number;
  time?: string;
  image: string;
  rating?: number;
}

interface MangaReleaseItem {
  id: number;
  title: string;
  chapter?: number;
  date: string;
  image: string;
  rating?: number;
}

const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const animeSchedule: { [key: string]: any[] } = {};
const mangaReleases: any[] = [];

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [animeSchedule, setAnimeSchedule] = useState<{ [key: string]: AnimeScheduleItem[] }>({});
  const [mangaReleases, setMangaReleases] = useState<MangaReleaseItem[]>([]);
  const [loadingAnime, setLoadingAnime] = useState(true);
  const [loadingManga, setLoadingManga] = useState(true);
  const [errorAnime, setErrorAnime] = useState<string | null>(null);
  const [errorManga, setErrorManga] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeSchedule = async () => {
      setLoadingAnime(true);
      setErrorAnime(null);
      try {
        const response = await getSeasonNow();
        const schedule: { [key: string]: AnimeScheduleItem[] } = {
          Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: [], Domingo: []
        };

        response.data.forEach((anime: any) => {
          if (anime.broadcast && anime.broadcast.day) {
            const day = anime.broadcast.day.replace('s', 's').replace('u', 'u').replace('a', 'a').replace('d', 'd').replace('o', 'o'); // Simple mapping, might need more robust logic
            const item: AnimeScheduleItem = {
              id: anime.mal_id,
              title: anime.title_english || anime.title || anime.title_japanese,
              episode: anime.episodes,
              time: anime.broadcast.time,
              image: anime.images?.jpg?.large_image_url || anime.images?.webp?.large_image_url || "/placeholder.svg",
              rating: anime.score,
            };
            if (schedule[day]) {
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

    const fetchMangaReleases = async () => {
      setLoadingManga(true);
      setErrorManga(null);
      try {
        const anilistResponse = await getUpcomingMangaAnilist();
        const releases: MangaReleaseItem[] = anilistResponse.Page.media.map((manga: any) => {
          const date = manga.startDate.year && manga.startDate.month && manga.startDate.day
            ? new Date(manga.startDate.year, manga.startDate.month - 1, manga.startDate.day).toISOString()
            : new Date().toISOString(); // Placeholder si no hay fecha

          return {
            id: manga.id,
            title: manga.title.userPreferred || manga.title.english || manga.title.romaji,
            chapter: manga.chapters || "N/A",
            date: date,
            image: manga.coverImage.large,
            rating: manga.averageScore || "N/A",
          };
        });
        setMangaReleases(releases);
      } catch (err: any) {
        setErrorManga("Error al cargar los próximos lanzamientos de manga.");
        console.error("Error fetching manga releases:", err);
      } finally {
        setLoadingManga(false);
      }
    };

    fetchAnimeSchedule();
    fetchMangaReleases();
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
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="anime">Anime Semanal</TabsTrigger>
          <TabsTrigger value="manga">Manga Próximos</TabsTrigger>
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

        <TabsContent value="manga" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Capítulos</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingManga && <p className="text-center text-muted-foreground py-4">Cargando próximos lanzamientos de manga...</p>}
              {errorManga && <p className="text-center text-destructive py-4">{errorManga}</p>}
              {!loadingManga && !errorManga && (
                <div className="grid gap-4">
                  {mangaReleases.length > 0 ? (
                    mangaReleases.map((manga) => (
                      <Link key={manga.id} href={`/manga/${manga.id}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <Image
                                src={manga.image}
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
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No hay próximos lanzamientos de manga.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
