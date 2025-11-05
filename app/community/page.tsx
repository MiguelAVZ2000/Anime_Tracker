"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Heart, Share2, Search, Filter } from "lucide-react"

const topUsers: any[] = [];
const communities: any[] = [];
const activityFeed: any[] = [];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Comunidad</h1>
        <p className="text-muted-foreground">Conecta con otros fans y comparte tu pasión por el anime</p>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feed">Feed de Actividad</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="communities">Comunidades</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar actividad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="text-center text-muted-foreground py-10">
            <p>La sección de comunidad está en desarrollo. ¡Pronto habrá más!</p>
          </div>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-4">
          <div className="text-center text-muted-foreground py-10">
            <p>Los rankings de usuarios están en construcción. ¡Vuelve pronto!</p>
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          <div className="text-center text-muted-foreground py-10">
            <p>Las comunidades están siendo organizadas. ¡Pronto podrás unirte!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
