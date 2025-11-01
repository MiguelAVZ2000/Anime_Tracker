"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Flame, Target, Users, Calendar, Award, Lock } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "Primer Paso",
    description: "Completa tu primer anime",
    icon: Star,
    progress: 100,
    unlocked: true,
    rarity: "common",
    points: 10,
  },
  {
    id: 2,
    title: "Maratonista",
    description: "Ve 10 episodios en un día",
    icon: Flame,
    progress: 100,
    unlocked: true,
    rarity: "rare",
    points: 25,
  },
  {
    id: 3,
    title: "Coleccionista",
    description: "Añade 50 títulos a tu lista",
    icon: Trophy,
    progress: 76,
    unlocked: false,
    rarity: "epic",
    points: 50,
  },
  {
    id: 4,
    title: "Crítico Experto",
    description: "Escribe 20 reseñas",
    icon: Award,
    progress: 45,
    unlocked: false,
    rarity: "rare",
    points: 30,
  },
  {
    id: 5,
    title: "Social Butterfly",
    description: "Consigue 100 seguidores",
    icon: Users,
    progress: 62,
    unlocked: false,
    rarity: "epic",
    points: 40,
  },
  {
    id: 6,
    title: "Dedicación Total",
    description: "Usa la app durante 365 días consecutivos",
    icon: Calendar,
    progress: 28,
    unlocked: false,
    rarity: "legendary",
    points: 100,
  },
]

const challenges = [
  {
    id: 1,
    title: "Maratón de Shonen",
    description: "Completa 5 animes de género Shonen este mes",
    progress: 3,
    total: 5,
    timeLeft: "12 días",
    reward: "50 puntos + Badge exclusivo",
  },
  {
    id: 2,
    title: "Explorador de Géneros",
    description: "Ve al menos un anime de 5 géneros diferentes",
    progress: 2,
    total: 5,
    timeLeft: "20 días",
    reward: "30 puntos",
  },
  {
    id: 3,
    title: "Lector Veloz",
    description: "Lee 100 capítulos de manga esta semana",
    progress: 45,
    total: 100,
    timeLeft: "3 días",
    reward: "40 puntos",
  },
]

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-orange-500",
}

export default function AchievementsPage() {
  const [filter, setFilter] = useState("all")

  const totalPoints = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Logros y Retos</h1>
        <p className="text-muted-foreground">Completa desafíos y desbloquea logros exclusivos</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Trophy className="h-10 w-10 text-primary" />
              <div>
                <p className="text-3xl font-bold">
                  {unlockedCount}/{achievements.length}
                </p>
                <p className="text-sm text-muted-foreground">Logros Desbloqueados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Star className="h-10 w-10 text-secondary" />
              <div>
                <p className="text-3xl font-bold">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Puntos Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="h-10 w-10 text-accent" />
              <div>
                <p className="text-3xl font-bold">{challenges.length}</p>
                <p className="text-sm text-muted-foreground">Retos Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
          <TabsTrigger value="challenges">Retos</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`relative overflow-hidden ${achievement.unlocked ? "border-primary/50" : "opacity-60"}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`p-3 rounded-lg ${achievement.unlocked ? "bg-primary/20" : "bg-muted"} ${achievement.unlocked ? "animate-glow" : ""}`}
                      >
                        {achievement.unlocked ? (
                          <Icon className="h-6 w-6 text-primary" />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Puntos</span>
                        <span className="font-semibold text-primary">{achievement.points} pts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          {challenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{challenge.timeLeft}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-semibold">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  <Progress value={(challenge.progress / challenge.total) * 100} className="h-3" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Recompensa:</span>
                  <span className="font-semibold text-accent">{challenge.reward}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
