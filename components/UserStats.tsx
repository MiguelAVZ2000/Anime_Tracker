"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAnimeEntry } from "@/models/AnimeEntry";
import { IMangaEntry } from "@/models/MangaEntry";
import { Tv, BookOpen, Star, CheckCircle, Clock } from "lucide-react";

interface UserStatsProps {
  animeList: IAnimeEntry[];
  mangaList: IMangaEntry[];
}

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ElementType }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function UserStats({ animeList, mangaList }: UserStatsProps) {
  const animeStats = useMemo(() => {
    const completed = animeList.filter((a) => a.status === "completed").length;
    const watching = animeList.filter((a) => a.status === "watching").length;
    const scoredItems = animeList.filter((a) => a.score > 0);
    const avgScore =
      scoredItems.length > 0
        ? (scoredItems.reduce((acc, a) => acc + a.score, 0) / scoredItems.length).toFixed(2)
        : "N/A";
    const episodesWatched = animeList.reduce((acc, a) => acc + a.progress, 0);
    return { total: animeList.length, completed, watching, avgScore, episodesWatched };
  }, [animeList]);

  const mangaStats = useMemo(() => {
    const completed = mangaList.filter((m) => m.status === "completed").length;
    const reading = mangaList.filter((m) => m.status === "reading").length;
    const scoredItems = mangaList.filter((m) => m.score > 0);
    const avgScore =
      scoredItems.length > 0
        ? (scoredItems.reduce((acc, m) => acc + m.score, 0) / scoredItems.length).toFixed(2)
        : "N/A";
    const chaptersRead = mangaList.reduce((acc, m) => acc + m.progress, 0);
    return { total: mangaList.length, completed, reading, avgScore, chaptersRead };
  }, [mangaList]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Animes en Lista" value={animeStats.total} icon={Tv} />
        <StatCard title="Animes Completados" value={animeStats.completed} icon={CheckCircle} />
        <StatCard title="Puntuación Media (Anime)" value={animeStats.avgScore} icon={Star} />
        <StatCard title="Episodios Vistos" value={animeStats.episodesWatched} icon={Clock} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <StatCard title="Mangas en Lista" value={mangaStats.total} icon={BookOpen} />
        <StatCard title="Mangas Completados" value={mangaStats.completed} icon={CheckCircle} />
        <StatCard title="Puntuación Media (Manga)" value={mangaStats.avgScore} icon={Star} />
        <StatCard title="Capítulos Leídos" value={mangaStats.chaptersRead} icon={Clock} />
      </div>
    </div>
  );
}