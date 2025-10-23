import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CreateConnecteurModal } from "@/components/admin/modals/CreateConnecteurModal";
import { connecteurs, regles_calcul } from "@/data/seedData";
import { Plus, Activity, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Connecteurs() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { hasRole } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Connecteurs & Règles</h1>
          <p className="text-muted-foreground">Gestion des API et règles de calcul</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau connecteur
          </Button>
        )}
      </div>

      {/* Connecteurs API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Connecteurs API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connecteurs.map((conn) => (
              <div key={conn.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{conn.nom}</h3>
                    <Badge variant={conn.etat === "ON" ? "default" : "outline"}>
                      {conn.etat}
                    </Badge>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Cible: <span className="font-mono">{conn.cible}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fréquence: {conn.frequence}
                    </p>
                    {conn.dernier_run && (
                      <p className="text-sm text-muted-foreground">
                        Dernier run: {new Date(conn.dernier_run).toLocaleString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {conn.etat === "ON" ? (
                    <CheckCircle className="h-5 w-5 text-secondary" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  {hasRole("SPSE_ADMIN") && (
                    <Switch checked={conn.etat === "ON"} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Règles de calcul */}
      <Card>
        <CardHeader>
          <CardTitle>Règles de calcul</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regles_calcul.map((regle) => (
              <div key={regle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{regle.nom}</h3>
                    <Badge variant={regle.etat === "ON" ? "secondary" : "outline"}>
                      {regle.etat}
                    </Badge>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Indicateur: <span className="font-mono">{regle.cible_indicateur_id}</span>
                    </p>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-2">
                      {regle.expression}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {hasRole("SPSE_ADMIN") && (
                    <>
                      <Button variant="outline" size="sm">
                        Tester
                      </Button>
                      <Switch checked={regle.etat === "ON"} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateConnecteurModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  );
}
