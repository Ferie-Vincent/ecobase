import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donnees, indicateurs } from "@/data/seedData";
import { Clock, AlertCircle, CheckCircle, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Workflow() {
  const { hasRole } = useAuth();

  const groupedByStatut = {
    "Brouillon": donnees.filter(d => d.statut === "Brouillon"),
    "En validation": donnees.filter(d => d.statut === "En validation"),
    "Validé SPSE": donnees.filter(d => d.statut === "Validé SPSE"),
    "Publié": donnees.filter(d => d.statut === "Publié")
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "Brouillon":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case "En validation":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "Validé SPSE":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "Publié":
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Workflow de validation</h1>
        <p className="text-muted-foreground">Suivi des données par statut</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(groupedByStatut).map(([statut, items]) => (
          <Card key={statut}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{statut}</CardTitle>
                {getStatutIcon(statut)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{items.length}</div>
              <p className="text-xs text-muted-foreground">données</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Object.entries(groupedByStatut).map(([statut, items]) => (
          <Card key={statut}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {getStatutIcon(statut)}
                <CardTitle>{statut}</CardTitle>
                <Badge variant="outline">{items.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.slice(0, 5).map((donnee) => {
                  const ind = indicateurs.find(i => i.id === donnee.indicateur_id);
                  return (
                    <div key={donnee.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{ind?.nom}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {donnee.year} • {donnee.value} {donnee.unit}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {statut === "En validation" && hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                          <Button size="sm" variant="outline">
                            Valider
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Aucune donnée
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
