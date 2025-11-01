"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Edit, Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { IAnimeEntry } from "@/models/AnimeEntry";
import { IMangaEntry } from "@/models/MangaEntry";

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
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/list/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, score, mediaType }),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data.entry);
        toast({ title: "¡Éxito!", description: "Tu lista ha sido actualizada." });
        setIsOpen(false);
      } else {
        toast({ variant: "destructive", title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo actualizar la entrada." });
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