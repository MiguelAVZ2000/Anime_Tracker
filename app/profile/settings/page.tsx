"use client"

import { Settings, Palette, Bell, Accessibility, Keyboard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function SettingsPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en AnimeTracker</p>
        </div>
        <Settings className="h-12 w-12 text-primary" />
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Tema y Colores
              </CardTitle>
              <CardDescription>Personaliza la apariencia de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="vaporwave">Oscuro Vaporwave</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent">Color de Acento</Label>
                <Select defaultValue="pink">
                  <SelectTrigger id="accent">
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pink">Rosa (Predeterminado)</SelectItem>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="purple">Púrpura</SelectItem>
                    <SelectItem value="orange">Naranja</SelectItem>
                    <SelectItem value="green">Verde</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animaciones</Label>
                  <p className="text-sm text-muted-foreground">Habilitar transiciones y animaciones</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact">Modo Compacto</Label>
                  <p className="text-sm text-muted-foreground">Reduce el espaciado entre elementos</p>
                </div>
                <Switch id="compact" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferencias de Notificaciones
              </CardTitle>
              <CardDescription>Controla qué notificaciones recibes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-episodes">Nuevos Episodios</Label>
                  <p className="text-sm text-muted-foreground">Notificar cuando salgan nuevos episodios</p>
                </div>
                <Switch id="new-episodes" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-chapters">Nuevos Capítulos</Label>
                  <p className="text-sm text-muted-foreground">Notificar cuando salgan nuevos capítulos de manga</p>
                </div>
                <Switch id="new-chapters" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comments">Comentarios</Label>
                  <p className="text-sm text-muted-foreground">Notificar cuando comenten tus reseñas</p>
                </div>
                <Switch id="comments" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="likes">Me Gusta</Label>
                  <p className="text-sm text-muted-foreground">Notificar cuando les guste tu contenido</p>
                </div>
                <Switch id="likes" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="followers">Nuevos Seguidores</Label>
                  <p className="text-sm text-muted-foreground">Notificar cuando alguien te siga</p>
                </div>
                <Switch id="followers" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recommendations">Recomendaciones</Label>
                  <p className="text-sm text-muted-foreground">Notificar nuevas recomendaciones personalizadas</p>
                </div>
                <Switch id="recommendations" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email">Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">Recibir resumen semanal por correo</p>
                </div>
                <Switch id="email" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Opciones de Accesibilidad
              </CardTitle>
              <CardDescription>Ajusta la aplicación para una mejor experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="font-size">Tamaño de Fuente</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">A</span>
                  <Slider id="font-size" defaultValue={[100]} max={150} min={75} step={25} className="flex-1" />
                  <span className="text-lg">A</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrast">Contraste</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="contrast">
                    <SelectValue placeholder="Selecciona el contraste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">Alto</SelectItem>
                    <SelectItem value="higher">Muy Alto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion">Reducir Movimiento</Label>
                  <p className="text-sm text-muted-foreground">Minimiza animaciones y transiciones</p>
                </div>
                <Switch id="reduce-motion" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="screen-reader">Optimizar para Lector de Pantalla</Label>
                  <p className="text-sm text-muted-foreground">Mejora la compatibilidad con lectores de pantalla</p>
                </div>
                <Switch id="screen-reader" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="focus-indicators">Indicadores de Foco Mejorados</Label>
                  <p className="text-sm text-muted-foreground">Resalta elementos enfocados con el teclado</p>
                </div>
                <Switch id="focus-indicators" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Atajos de Teclado
              </CardTitle>
              <CardDescription>Navega más rápido con el teclado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Ir al Dashboard</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">G + D</kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Buscar</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl + K</kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Notificaciones</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">G + N</kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Perfil</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">G + P</kbd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Ayuda</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">?</kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline">Restablecer</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  )
}
