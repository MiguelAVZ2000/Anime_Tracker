"use client";

import { useState, useEffect, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Tv, Film, Book } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MediaItem {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  episodes?: number; // Opcional para manga
  chapters?: number; // Opcional para anime
  score: number;
  type: string;
}

interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<"anime" | "manga">("anime");
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const apiEndpoints = {
    anime: { search: "/api/anime/search", top: "/api/anime/top" },
    manga: { search: "/api/manga/search", top: "/api/manga/top" },
  };

  const performFetch = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("La solicitud falló");
      }
      const data = await response.json();
      setResults(data.data || []);
      setPagination(data.pagination || null);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: FormEvent<HTMLFormElement>, page: number = 1) => {
    if (e) e.preventDefault();
    if (!query) return;
    setCurrentPage(page);
    const url = `${apiEndpoints[searchType].search}?q=${encodeURIComponent(query)}&page=${page}`;
    performFetch(url);
  };

  useEffect(() => {
    const fetchTopContent = (page: number = 1) => {
      setCurrentPage(page);
      const url = `${apiEndpoints[searchType].top}?page=${page}`;
      performFetch(url);
    };
    fetchTopContent(currentPage);
  }, [searchType, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Buscar</h1>
        <p className="text-muted-foreground">Encuentra tu próximo anime o manga favorito.</p>
      </div>

      <Tabs
        value={searchType}
        onValueChange={(value) => {
          setSearchType(value as "anime" | "manga");
          setCurrentPage(1); // Reset page on type change
          setQuery(""); // Reset query
        }}
        className="mb-8"
      >
        <TabsList>
          <TabsTrigger value="anime">Anime</TabsTrigger>
          <TabsTrigger value="manga">Manga</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Buscar ${searchType} por nombre...`}
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </form>

      {error && <p className="text-destructive text-center">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((item) => (
          <Link href={`/${searchType}/${item.mal_id}`} key={item.mal_id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardContent className="p-0">
                <Image
                  src={item.images.jpg.large_image_url}
                  alt={item.title}
                  width={225}
                  height={320}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
              <CardHeader className="p-3 flex-grow">
                <CardTitle className="text-sm font-semibold leading-tight" title={item.title}>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="p-3 flex justify-between items-center text-xs text-muted-foreground mt-auto">
                <div className="flex items-center gap-1">
                  {item.type === "TV" && <Tv className="h-3 w-3" />}
                  {(item.type === "Movie" || item.type === "OVA" || item.type === "Special") && <Film className="h-3 w-3" />}
                  {searchType === "manga" && <Book className="h-3 w-3" />}
                  <span>{item.episodes ? `${item.episodes} ep.` : item.chapters ? `${item.chapters} cap.` : 'N/A'}</span>
                </div>
                {item.score && (
                  <Badge variant="secondary" className="text-xs">
                    ⭐ {item.score}
                  </Badge>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {pagination && (pagination.has_next_page || pagination.current_page > 1) && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); if (pagination.has_next_page) setCurrentPage(currentPage + 1); }}
                className={!pagination.has_next_page ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {loading && <p className="text-center mt-8">Cargando más resultados...</p>}
    </div>
  );
}