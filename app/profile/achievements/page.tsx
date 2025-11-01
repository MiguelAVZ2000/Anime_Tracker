import { Trophy, Award, Star, Flame, Target, Heart, MessageCircle, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const achievements = [
  {
    id: 1,
    name: "Maratonista",
    description: "Completa 100 animes",
    icon: Flame,
    progress: 87,
    total: 100,
    unlocked: false,
    rarity: "epic",
  },
  {
    id: 2,
    name: "Crítico Experto",
    description: "Escribe 50 reseñas",
    icon: MessageCircle,
    progress: 50,
    total: 50,
    unlocked: true,
    rarity: "rare",
  },
  {
    id: 3,
    name: "Explorador",
    description: "Descubre 500 títulos diferentes",
    icon: Eye,
    progress: 342,
    total: 500,
    unlocked: false,
    rarity: "epic",
  },
  {
    id: 4,
    name: "Coleccionista",
    description: "Añade 200 títulos a tu lista",
    icon: Star,
    progress: 200,
    total: 200,
    unlocked: true,
    rarity: "common",
  },
  {
    id: 5,
    name: "Influencer",
    description: "Consigue 1000 seguidores",
    icon: Heart,
    progress: 756,
    total: 1000,
    unlocked: false,
    rarity: "legendary",
  },
  {
    id: 6,
    name: "Perfeccionista",
    description: "Completa tu perfil al 100%",
    icon: Target,
    progress: 100,
    total: 100,
    unlocked: true,
    rarity: "common",
  },
]

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export default function AchievementsPage() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Logros y Insignias</h1>
          <p className="text-muted-foreground">
            Has desbloqueado {unlockedCount} de {achievements.length} logros
          </p>
        </div>
        <Trophy className="h-12 w-12 text-primary" />
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Progreso General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Logros Desbloqueados</span>
                <span className="font-medium">
                  {unlockedCount}/{achievements.length}
                </span>
              </div>
              <Progress value={(unlockedCount / achievements.length) * 100} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const Icon = achievement.icon
          const isUnlocked = achievement.unlocked

          return (
            <Card key={achievement.id} className={`relative overflow-hidden ${isUnlocked ? "" : "opacity-60"}`}>
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${rarityColors[achievement.rarity as keyof typeof rarityColors]} opacity-10 rounded-bl-full`}
              />
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center ${isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      {isUnlocked && (
                        <Badge variant="default" className="ml-2">
                          <Award className="h-3 w-3 mr-1" />
                          Desbloqueado
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {achievement.rarity}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span className="font-medium">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <Progress value={(achievement.progress / achievement.total) * 100} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
