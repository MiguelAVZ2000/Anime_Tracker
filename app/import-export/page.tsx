"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileJson, FileSpreadsheet, ExternalLink } from "lucide-react"

export default function ImportExportPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleExport = (format: string) => {
    console.log(`[v0] Exporting data in ${format} format`)
    // Simulate export
    alert(`Exportando tu lista en formato ${format}...`)
  }

  const handleImport = () => {
    if (!file) {
      alert("Por favor selecciona un archivo primero")
      return
    }
    console.log(`[v0] Importing file: ${file.name}`)
    alert(`Importando ${file.name}...`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Importar / Exportar</h1>
        <p className="text-muted-foreground">Gestiona tus listas y sincroniza con otras plataformas</p>
      </div>

      <Tabs defaultValue="export" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="export">Exportar</TabsTrigger>
          <TabsTrigger value="import">Importar</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exportar tu Lista</CardTitle>
              <CardDescription>Descarga tu lista completa en diferentes formatos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => handleExport("CSV")} className="h-24 flex-col gap-2">
                  <FileSpreadsheet className="h-8 w-8" />
                  <span>Exportar CSV</span>
                </Button>
                <Button onClick={() => handleExport("JSON")} variant="outline" className="h-24 flex-col gap-2">
                  <FileJson className="h-8 w-8" />
                  <span>Exportar JSON</span>
                </Button>
                <Button onClick={() => handleExport("MAL")} variant="outline" className="h-24 flex-col gap-2">
                  <ExternalLink className="h-8 w-8" />
                  <span>Formato MAL</span>
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Información de Exportación</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• CSV: Compatible con Excel y Google Sheets</li>
                  <li>• JSON: Formato completo con todos los datos</li>
                  <li>• MAL: Compatible con MyAnimeList</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importar Lista</CardTitle>
              <CardDescription>Sube tu lista desde otras plataformas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Seleccionar Archivo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.json,.xml"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="flex-1"
                    />
                    <Button onClick={handleImport} disabled={!file}>
                      <Upload className="h-4 w-4 mr-2" />
                      Importar
                    </Button>
                  </div>
                </div>
                {file && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm">
                      <span className="font-semibold">Archivo seleccionado:</span> {file.name}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Formatos Soportados</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• MyAnimeList XML export</li>
                  <li>• AniList JSON export</li>
                  <li>• CSV genérico (título, estado, puntuación)</li>
                  <li>• Kitsu JSON export</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  <strong>Nota:</strong> La importación puede tardar unos minutos dependiendo del tamaño de tu lista.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
