"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Edit, Loader2, Minus, Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { IAnimeEntry } from "@/models/AnimeEntry";
import { IMangaEntry } from "@/models/MangaEntry";
import AchievementToast from "./AchievementToast";

type MediaEntry = IAnimeEntry | IMangaEntry;

interface EditEntryControlsProps {
  item: MediaEntry;
  mediaType: "anime" | "manga";
  onUpdate: (updatedItem: MediaEntry) => void;
}

const statusOptions = {
  anime: [
    { value: "watching", label: "Viendo" },
    { value: "completed", label: "Completado" },
    { value: "on_hold", label: "En espera" },
    { value: "dropped", label: "Abandonado" },
    { value: "plan_to_watch", label: "Planeo ver" },
  ],
  manga: [
    { value: "reading", label: "Leyendo" },
    { value: "completed", label: "Completado" },
    { value: "on_hold", label: "En espera" },
    { value: "dropped", label: "Abandonado" },
    { value: "plan_to_read", label: "Planeo leer" },
  ],
};

export default function EditEntryControls({ item, mediaType, onUpdate }: EditEntryControlsProps) {
  const [status, setStatus] = useState(item.status);
  const [score, setScore] = useState(item.score);
  const [progress, setProgress] = useState(item.progress);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const total = mediaType === 'anime' ? item.totalEpisodes : item.totalChapters;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/list/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, score, progress, mediaType }),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data.entry);
        toast({ title: "¡Éxito!", description: "Tu lista ha sido actualizada." });
        
        if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
          data.newlyUnlocked.forEach((achievement: any) => {
            toast({ duration: 6000, description: <AchievementToast achievement={achievement} /> });
          });
        }

        setIsOpen(false);
      } else {
        toast({ variant: "destructive", title: "Error", description: data.message });
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message || "No se pudo actualizar la entrada." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Editar Entrada</h4>
            <p className="text-sm text-muted-foreground">Actualiza tu progreso y puntuación.</p>
          </div>
          <div className="grid gap-2">
            <div className="space-y-1">
              <Label htmlFor="status">Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions[mediaType].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="score">Puntuación: {score}</Label>
              <Slider id="score" min={0} max={10} step={1} value={[score]} onValueChange={(val) => setScore(val[0])} />
            </div>
            {(status === 'watching' || status === 'reading') && (
              <div className="space-y-1">
                <Label htmlFor="progress">Progreso</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setProgress(p => Math.max(0, p - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="progress"
                    type="number"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="text-center"
                  />
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setProgress(p => (total ? Math.min(p + 1, total) : p + 1))}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {total && <p className="text-xs text-muted-foreground text-right">/ {total}</p>}
              </div>
            )}
          </div>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}