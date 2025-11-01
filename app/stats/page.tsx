"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const genreData = [
  { name: "Shonen", value: 45, color: "#ec4899" },
  { name: "Seinen", value: 25, color: "#3b82f6" },
  { name: "Slice of Life", value: 15, color: "#fb923c" },
  { name: "Romance", value: 10, color: "#a855f7" },
  { name: "Horror", value: 5, color: "#ef4444" },
]

const watchingTrend = [
  { month: "Ene", episodios: 45 },
  { month: "Feb", episodios: 52 },
  { month: "Mar", episodios: 48 },
  { month: "Abr", episodios: 61 },
  { month: "May", episodios: 55 },
  { month: "Jun", episodios: 70 },
]

const studioData = [
  { name: "MAPPA", count: 12 },
  { name: "Ufotable", count: 10 },
  { name: "Bones", count: 8 },
  { name: "Wit Studio", count: 7 },
  { name: "A-1 Pictures", count: 6 },
]

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Mis Estadísticas</h1>
        <p className="text-muted-foreground">Visualiza tu actividad y preferencias</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Completados</p>
            <p className="text-3xl font-bold text-primary">156</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Episodios Vistos</p>
            <p className="text-3xl font-bold text-secondary">2,847</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Días Totales</p>
            <p className="text-3xl font-bold text-accent">47.5</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Puntuación Media</p>
            <p className="text-3xl font-bold text-purple-500">8.4</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="genres" className="space-y-6">
        <TabsList>
          <TabsTrigger value="genres">Géneros</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="studios">Estudios</TabsTrigger>
        </TabsList>

        <TabsContent value="genres">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Género</CardTitle>
              <CardDescription>Tus géneros favoritos basados en tu historial</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Mensual</CardTitle>
              <CardDescription>Episodios vistos por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={watchingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="episodios" stroke="#ec4899" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="studios">
          <Card>
            <CardHeader>
              <CardTitle>Estudios Favoritos</CardTitle>
              <CardDescription>Estudios de animación que más has visto</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={studioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
