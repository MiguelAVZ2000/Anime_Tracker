"use client"

import { Check, Heart, MessageCircle, Star, UserPlus, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "episode",
    icon: Tv,
    title: "Nuevo episodio disponible",
    description: "Attack on Titan - Episodio 25 ya está disponible",
    time: "Hace 5 minutos",
    read: false,
    link: "/anime/1",
  },
  {
    id: 2,
    type: "follower",
    icon: UserPlus,
    title: "Nuevo seguidor",
    description: "@otaku_master comenzó a seguirte",
    time: "Hace 1 hora",
    read: false,
    link: "/social/otaku_master",
  },
  {
    id: 3,
    type: "comment",
    icon: MessageCircle,
    title: "Comentario en tu reseña",
    description: '@anime_fan comentó: "¡Totalmente de acuerdo con tu análisis!"',
    time: "Hace 2 horas",
    read: false,
    link: "/anime/1",
  },
  {
    id: 4,
    type: "like",
    icon: Heart,
    title: "Le gustó tu reseña",
    description: "A @manga_lover y 12 personas más les gustó tu reseña de Demon Slayer",
    time: "Hace 3 horas",
    read: true,
    link: "/anime/2",
  },
  {
    id: 5,
    type: "recommendation",
    icon: Star,
    title: "Nueva recomendación",
    description: 'Basado en tu historial, te recomendamos "Jujutsu Kaisen"',
    time: "Hace 5 horas",
    read: true,
    link: "/recommendations",
  },
  {
    id: 6,
    type: "episode",
    icon: Tv,
    title: "Nuevo episodio disponible",
    description: "Demon Slayer - Episodio 12 ya está disponible",
    time: "Hace 1 día",
    read: true,
    link: "/anime/2",
  },
]

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Notificaciones</h1>
          <p className="text-muted-foreground">Tienes {unreadCount} notificaciones sin leer</p>
        </div>
        <Button variant="outline">
          <Check className="mr-2 h-4 w-4" />
          Marcar todas como leídas
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Todas
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="episodes">Episodios</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <Link key={notification.id} href={notification.link}>
                <Card
                  className={`hover:shadow-md transition-shadow cursor-pointer ${!notification.read ? "border-primary" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${!notification.read ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="ml-2">
                              Nuevo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </TabsContent>

        <TabsContent value="episodes" className="space-y-3">
          {notifications
            .filter((n) => n.type === "episode")
            .map((notification) => {
              const Icon = notification.icon
              return (
                <Link key={notification.id} href={notification.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
        </TabsContent>

        <TabsContent value="social" className="space-y-3">
          {notifications
            .filter((n) => ["follower", "comment", "like"].includes(n.type))
            .map((notification) => {
              const Icon = notification.icon
              return (
                <Link key={notification.id} href={notification.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-3">
          {notifications
            .filter((n) => n.type === "recommendation")
            .map((notification) => {
              const Icon = notification.icon
              return (
                <Link key={notification.id} href={notification.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
