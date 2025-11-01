"use client"

import { Plus, Lock, Globe, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

const customLists = [
  {
    id: 1,
    name: "Animes de Acción Épicos",
    description: "Mis animes de acción favoritos con las mejores escenas de batalla",
    count: 15,
    isPublic: true,
    image: "/attack-on-titan-poster.jpg",
  },
  {
    id: 2,
    name: "Slice of Life Relajantes",
    description: "Para esos días en los que solo quiero relajarme",
    count: 8,
    isPublic: true,
    image: "/anime-poster.png",
  },
  {
    id: 3,
    name: "Mangas Psicológicos",
    description: "Historias que te hacen pensar",
    count: 12,
    isPublic: false,
    image: "/berserk-manga-cover.jpg",
  },
  {
    id: 4,
    name: "Romances que me Hicieron Llorar",
    description: "Preparar pañuelos antes de ver",
    count: 6,
    isPublic: false,
    image: "/anime-poster.png",
  },
]

export default function ListsPage() {
  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mis Listas Personalizadas</h1>
          <p className="text-muted-foreground">Organiza tus animes y mangas en colecciones temáticas</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Lista
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Lista</DialogTitle>
              <DialogDescription>
                Crea una lista personalizada para organizar tus animes y mangas favoritos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la lista</Label>
                <Input id="name" placeholder="Ej: Mis Favoritos de 2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe tu lista..." />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public">Lista pública</Label>
                  <p className="text-sm text-muted-foreground">Otros usuarios podrán ver esta lista</p>
                </div>
                <Switch id="public" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Crear Lista</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {customLists.map((list) => (
          <Card key={list.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img src={list.image || "/placeholder.svg"} alt={list.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{list.name}</h3>
                  <Badge variant={list.isPublic ? "default" : "secondary"} className="ml-2">
                    {list.isPublic ? <Globe className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
                    {list.isPublic ? "Pública" : "Privada"}
                  </Badge>
                </div>
                <p className="text-sm text-white/90">{list.count} títulos</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">{list.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                  <Link href={`/profile/lists/${list.id}`}>Ver Lista</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
