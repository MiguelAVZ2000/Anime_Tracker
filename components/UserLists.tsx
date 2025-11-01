"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import EditEntryControls from "./EditEntryControls";
import { IAnimeEntry } from "@/models/AnimeEntry";
import { IMangaEntry } from "@/models/MangaEntry";

interface UserListsProps {
  initialAnimeList: IAnimeEntry[];
  initialMangaList: IMangaEntry[];
}

type MediaEntry = (IAnimeEntry | IMangaEntry) & { _id: string };

const statusMap = {
  anime: {
    all: "Todos",
    watching: "Viendo",
    completed: "Completado",
    on_hold: "En espera",
    dropped: "Abandonado",
    plan_to_watch: "Planeo ver",
  },
  manga: {
    all: "Todos",
    reading: "Leyendo",
    completed: "Completado",
    on_hold: "En espera",
    dropped: "Abandonado",
    plan_to_read: "Planeo leer",
  },
};

function ListGrid({
  items,
  mediaType,
  onUpdate,
}: { items: MediaEntry[]; mediaType: "anime" | "manga"; onUpdate: (updatedItem: MediaEntry) => void }) {
  if (items.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No hay nada en esta lista todavía.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
          <Link href={`/${mediaType}/${item.mal_id}`} className="block">
            <CardContent className="p-0 relative">
              <Image
                src={item.image}
                alt={item.title}
                width={225}
                height={320}
                className="w-full h-auto object-cover aspect-[225/320]"
              />
              <Badge className="absolute top-2 right-2">{item.score > 0 ? `⭐ ${item.score}` : 'Sin nota'}</Badge>
            </CardContent>
          </Link>
          <CardHeader className="p-3 flex-grow">
            <CardTitle className="text-sm font-semibold leading-tight" title={item.title}>
              <Link href={`/${mediaType}/${item.mal_id}`} className="hover:text-primary transition-colors">
                {item.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardFooter className="p-3 mt-auto flex justify-between items-center">
            <Badge variant="secondary" className="text-xs">{statusMap[mediaType][item.status as keyof typeof statusMap.anime]}</Badge>
            <EditEntryControls item={item} mediaType={mediaType} onUpdate={onUpdate} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function UserLists({ initialAnimeList, initialMangaList }: UserListsProps) {
  const [animeList, setAnimeList] = useState(initialAnimeList);
  const [mangaList, setMangaList] = useState(initialMangaList);
  const [activeAnimeTab, setAnimeTab] = useState("all");
  const [activeMangaTab, setMangaTab] = useState("all");

  const handleUpdateEntry = (updatedEntry: MediaEntry) => {
    if ('progress' in updatedEntry && typeof updatedEntry.progress === 'number') { // Es AnimeEntry
      setAnimeList(prev => prev.map(item => item._id === updatedEntry._id ? updatedEntry : item));
    } else { // Es MangaEntry
      setMangaList(prev => prev.map(item => item._id === updatedEntry._id ? updatedEntry : item));
    }
  };

  const filteredAnime = useMemo(() => {
    if (activeAnimeTab === "all") return animeList;
    return animeList.filter((item) => item.status === activeAnimeTab);
  }, [animeList, activeAnimeTab]);

  const filteredManga = useMemo(() => {
    if (activeMangaTab === "all") return mangaList;
    return mangaList.filter((item) => item.status === activeMangaTab);
  }, [mangaList, activeMangaTab]);

  return (
    <Tabs defaultValue="anime">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="anime">Mi Lista de Anime ({animeList.length})</TabsTrigger>
        <TabsTrigger value="manga">Mi Lista de Manga ({mangaList.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="anime">
        <Tabs defaultValue="all" onValueChange={setAnimeTab}>
          <TabsList className="flex-wrap h-auto">
            {Object.entries(statusMap.anime).map(([key, value]) => (
              <TabsTrigger key={key} value={key}>{value}</TabsTrigger>
            ))}
          </TabsList>
          <ListGrid items={filteredAnime} mediaType="anime" />
        </Tabs>
      </TabsContent>
      <TabsContent value="manga">
        <Tabs defaultValue="all" onValueChange={setMangaTab}>
          <TabsList className="flex-wrap h-auto">
            {Object.entries(statusMap.manga).map(([key, value]) => (
              <TabsTrigger key={key} value={key}>{value}</TabsTrigger>
            ))}
          </TabsList>
          <ListGrid items={filteredManga} mediaType="manga" />
        </Tabs>
      </TabsContent>
    </Tabs>
  );
}