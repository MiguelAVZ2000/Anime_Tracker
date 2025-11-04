import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Lock } from "lucide-react"
import { Achievement, achievementsList } from "@/lib/achievements";

interface AchievementStatus extends Achievement {
  unlocked: boolean;
  progress: number;
}

async function getAchievementsStatus(): Promise<AchievementStatus[]> {
  // En una aplicación real, esto sería una llamada a nuestra API interna
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/achievements`);
  // const data = await res.json();
  // return data;

  // Simulación de la llamada a la API para este ejemplo
  const { default: dbConnect } = await import("@/lib/dbConnect");
  const { default: User } = await import("@/models/User");
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  await dbConnect();
  const user = await User.findById(session.user.id).lean();
  const userAchievements = user?.unlockedAchievements?.map(a => a.achievementId) || [];

  return achievementsList.map(ach => {
    const unlocked = userAchievements.includes(ach.id);
    // El progreso real se podría calcular aquí si la lógica fuera más compleja
    const progress = unlocked ? 100 : 0;
    return { ...ach, unlocked, progress };
  });
}

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export default async function AchievementsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const achievements = await getAchievementsStatus();

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
      </Tabs>
    </div>
  )
}
