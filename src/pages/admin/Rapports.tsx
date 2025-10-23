import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, FileText, Download, Eye } from "lucide-react";

export default function Rapports() {
  const templates = [
    {
      id: 1,
      nom: "Suivi Intégration CEDEAO",
      description: "Rapport trimestriel des indicateurs d'intégration régionale",
      frequence: "Trimestriel",
      dernier: "2025-Q1"
    },
    {
      id: 2,
      nom: "Contribution Diaspora",
      description: "Analyse des transferts et réinsertion des Ivoiriens de l'extérieur",
      frequence: "Annuel",
      dernier: "2024"
    },
    {
      id: 3,
      nom: "Commerce SLEC",
      description: "Évolution du commerce sous le schéma SLEC",
      frequence: "Trimestriel",
      dernier: "2025-Q1"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rapports & Exports</h1>
          <p className="text-muted-foreground">Génération de rapports et exports de données</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Générer un rapport
        </Button>
      </div>

      {/* Actions rapides */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Export CSV</h3>
                <p className="text-sm text-muted-foreground">Toutes les données</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Export PDF</h3>
                <p className="text-sm text-muted-foreground">Rapport personnalisé</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Download className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Export JSON</h3>
                <p className="text-sm text-muted-foreground">Format technique</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Templates de rapports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold">{template.nom}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{template.frequence}</Badge>
                    <Badge variant="secondary">Dernier: {template.dernier}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Aperçu
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Générer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
