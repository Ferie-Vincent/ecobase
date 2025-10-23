import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programmes } from "@/data/seedData";
import { Plus, Calendar, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Programmes() {
  const { hasRole } = useAuth();

  const getStatutBadge = (statut: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "En cours": "default",
      "Planifié": "secondary",
      "Clôturé": "outline"
    };
    return <Badge variant={variants[statut] || "outline"}>{statut}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Programmes & Projets</h1>
          <p className="text-muted-foreground">Gestion des programmes de développement</p>
        </div>
        {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau programme
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {programmes.map((programme) => (
          <Card key={programme.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{programme.titre}</h3>
                  <div className="flex items-center gap-2">
                    <Badge>{programme.domaine}</Badge>
                    {getStatutBadge(programme.statut)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{programme.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Période:</span>
                  <span className="font-medium">
                    {new Date(programme.debut).toLocaleDateString('fr-FR')} - {new Date(programme.fin).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                
                {programme.budget && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium font-mono">
                      {(programme.budget / 1000000000).toFixed(1)}Mds FCFA
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  Voir détails
                </Button>
                {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
