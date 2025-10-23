import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pays, organisations } from "@/data/seedData";
import { Plus, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Pays() {
  const { hasRole } = useAuth();

  const getPaysOrganisations = (code: string) => {
    return organisations.filter(org => 
      org.pays_membres_ids?.includes(code)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pays membres</h1>
          <p className="text-muted-foreground">Pays membres des organisations régionales</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Associer un pays
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pays.map((p) => {
          const orgs = getPaysOrganisations(p.code);
          return (
            <Card key={p.code} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.nom}</h3>
                    <Badge variant="outline" className="mt-2">{p.code}</Badge>
                  </div>
                  <Globe className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Membre de {orgs.length} organisation{orgs.length > 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {orgs.map(org => (
                      <Badge key={org.id} variant="secondary">
                        {org.sigle}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Voir détails
                  </Button>
                  {hasRole("SPSE_ADMIN") && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Gérer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
