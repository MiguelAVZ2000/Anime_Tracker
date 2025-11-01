"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddToListButtonProps {
  media: {
    mal_id: number;
    title: string;
    image: string;
    type: string;
    totalEpisodes?: number;
    totalChapters?: number;
  };
  mediaType: 'anime' | 'manga';
}

export default function AddToListButton({ media, mediaType }: AddToListButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const { toast } = useToast();

  const handleAdd = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...media, mediaType }),
      });
      const data = await response.json();

      if (response.ok) {
        setAdded(true);
        toast({ title: "¡Éxito!", description: data.message });
      } else {
        toast({ variant: "destructive", title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: `No se pudo agregar el ${mediaType} a la lista.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleAdd} disabled={loading || added} className="w-full mt-4">
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : added ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
      {loading ? "Agregando..." : added ? "En tu lista" : "Agregar a mi lista"}
    </Button>
  );
}