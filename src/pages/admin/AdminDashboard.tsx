import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Database, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { donnees, indicateurs, programmes, utilisateurs } from "@/data/seedData";

export default function AdminDashboard() {
  const stats = {
    indicateursActifs: indicateurs.length,
    donneesEnAttente: donnees.filter(d => d.statut === "En validation").length,
    valideSPSE: Math.round((donnees.filter(d => d.statut === "Validé SPSE" || d.statut === "Publié").length / donnees.length) * 100),
    programmesSuivis: programmes.filter(p => p.statut === "En cours").length
  };

  const dernieresActions = [
    { type: "validation", message: "Donnée slec_exportations_valeur validée par SPSE", date: "Il y a 2h", user: "Admin SPSE" },
    { type: "update", message: "Programme Intégration Économique mis à jour", date: "Il y a 4h", user: "Direction DGPI" },
    { type: "validation", message: "Donnée retours_reinseres_nb soumise pour validation", date: "Il y a 5h", user: "Direction DGIE" },
    { type: "create", message: "Nouvel indicateur ajouté : voyageurs_aeriens_cedeao_nb", date: "Hier", user: "Admin SPSE" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble des activités ECOBASE</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indicateurs actifs</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.indicateursActifs}</div>
            <p className="text-xs text-muted-foreground">+2 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Données en attente</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.donneesEnAttente}</div>
            <p className="text-xs text-muted-foreground">À valider</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% Validé SPSE</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.valideSPSE}%</div>
            <p className="text-xs text-muted-foreground">+5% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmes suivis</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.programmesSuivis}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Dernières actions */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dernieresActions.map((action, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {action.type === "validation" && <CheckCircle2 className="h-4 w-4 text-secondary" />}
                  {action.type === "update" && <AlertCircle className="h-4 w-4 text-primary" />}
                  {action.type === "create" && <Database className="h-4 w-4 text-accent" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{action.message}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{action.user}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{action.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Utilisateurs actifs */}
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs actifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {utilisateurs.filter(u => u.statut === "Actif").map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {user.nom.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.nom}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge variant={user.role === "SPSE_ADMIN" ? "default" : "secondary"}>
                  {user.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
