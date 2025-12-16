import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Database, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  MoreVertical,
  Calendar
} from "lucide-react";
import { donnees, indicateurs, programmes, utilisateurs } from "@/data/seedData";
import { indicators as indicatorsReferentiel } from "@/data/indicators";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const stats = {
    indicateursReferentiel: indicatorsReferentiel.length, // Total au référentiel
    indicateursActifs: indicateurs.length, // Avec données actives
    donneesEnAttente: donnees.filter(d => d.statut === "En validation").length,
    valideSPSE: Math.round((donnees.filter(d => d.statut === "Validé SPSE" || d.statut === "Publié").length / donnees.length) * 100),
    programmesSuivis: programmes.filter(p => p.statut === "En cours").length,
    utilisateursActifs: utilisateurs.filter(u => u.statut === "Actif").length
  };

  // Mock data for charts
  const activityData = [
    { time: "Jan", value: 45 },
    { time: "Fév", value: 52 },
    { time: "Mar", value: 48 },
    { time: "Avr", value: 61 },
    { time: "Mai", value: 55 },
    { time: "Juin", value: 67 },
    { time: "Juil", value: 72 },
    { time: "Août", value: 69 },
    { time: "Sep", value: 78 },
    { time: "Oct", value: 85 },
    { time: "Nov", value: 82 },
    { time: "Déc", value: 90 }
  ];

  const pieData = [
    { name: "Publié", value: 45, color: "hsl(var(--primary))" },
    { name: "Validé SPSE", value: 30, color: "hsl(var(--secondary))" },
    { name: "En validation", value: 15, color: "hsl(var(--accent))" },
    { name: "Brouillon", value: 10, color: "hsl(var(--muted))" }
  ];

  const dernieresActions = [
    { id: "#ACT-001", type: "validation", indicateur: "SLEC Exports", date: "2025-12-07", statut: "Validé" },
    { id: "#ACT-002", type: "saisie", indicateur: "Transferts Diaspora", date: "2025-12-07", statut: "En attente" },
    { id: "#ACT-003", type: "update", indicateur: "Voyageurs CEDEAO", date: "2025-12-06", statut: "Publié" },
    { id: "#ACT-004", type: "validation", indicateur: "Retours Réinsérés", date: "2025-12-06", statut: "En validation" },
    { id: "#ACT-005", type: "create", indicateur: "Commerce UEMOA", date: "2025-12-05", statut: "Brouillon" },
    { id: "#ACT-006", type: "api", indicateur: "BCEAO Import", date: "2025-12-05", statut: "Validé" }
  ];

  const indicateursSummary = [
    { type: "Intégration", count: 4, total: 156, moyenne: 39, dernier: "2025-12-07" },
    { type: "Diaspora", count: 2, total: 89, moyenne: 44, dernier: "2025-12-06" },
    { type: "Économie", count: 1, total: 45, moyenne: 45, dernier: "2025-12-05" },
    { type: "Social", count: 0, total: 23, moyenne: 23, dernier: "2025-12-04" }
  ];

  const getStatutBadge = (statut: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      "Validé": "default",
      "Publié": "default",
      "En attente": "secondary",
      "En validation": "secondary",
      "Brouillon": "outline"
    };
    return <Badge variant={variants[statut] || "outline"}>{statut}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble des activités ECOBASE</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            Décembre 2025
          </Badge>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 - Indicateurs */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Indicateurs
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stats.indicateursActifs}</span>
              <span className="text-sm text-muted-foreground">/ {stats.indicateursReferentiel}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.indicateursActifs} avec données actives sur {stats.indicateursReferentiel} au référentiel
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all" 
                  style={{ width: `${(stats.indicateursActifs / stats.indicateursReferentiel) * 100}%` }} 
                />
              </div>
              <span className="text-xs font-medium">{Math.round((stats.indicateursActifs / stats.indicateursReferentiel) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-muted-foreground">Couverture</span>
              <span className="flex items-center gap-1 text-secondary">
                <ArrowUpRight className="h-3 w-3" />
                +2 ce mois
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 - Utilisateurs */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Utilisateurs actifs
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.utilisateursActifs}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-muted-foreground">Session moy.</span>
              <span className="font-medium">12m 34s</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 connectés actuellement</p>
          </CardContent>
        </Card>

        {/* Card 3 - Validation */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Taux de validation
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-2">
              <div className="relative">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
                  <circle 
                    cx="40" cy="40" r="32" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray={`${stats.valideSPSE * 2.01} 201`}
                    className="text-primary" 
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {stats.valideSPSE}%
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Précision actuelle: {stats.valideSPSE}%</p>
          </CardContent>
        </Card>

        {/* Card 4 - Données */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Données traitées
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{donnees.length}</span>
              <span className="text-sm text-muted-foreground">entrées</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-8 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData.slice(-6)}>
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-muted-foreground">Ce mois</span>
              <span className="flex items-center gap-1 text-secondary">
                <ArrowUpRight className="h-3 w-3" />
                +12.5%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Activité mensuelle</CardTitle>
            <p className="text-xs text-muted-foreground">Données enregistrées et validées par mois</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Données (2025)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="text-muted-foreground">Données (2024)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary)/0.15)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Dernière mise à jour: 08.12.2025</span>
            <span>Vous avez 2 nouvelles validations en attente</span>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Actions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Actions récentes</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Nouvelle
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Indicateur</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Statut</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dernieresActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{action.id}</TableCell>
                    <TableCell className="text-sm">{action.indicateur}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{action.date}</TableCell>
                    <TableCell>{getStatutBadge(action.statut)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Affichage 1 à 6 sur 24 actions</p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-7 w-7 p-0">1</Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">2</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Indicateurs Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Résumé par type d'indicateur</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs text-right">Nb</TableHead>
                  <TableHead className="text-xs text-right">Total données</TableHead>
                  <TableHead className="text-xs text-right">Moyenne</TableHead>
                  <TableHead className="text-xs text-right">Dernier ajout</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicateursSummary.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium text-sm">{item.type}</TableCell>
                    <TableCell className="text-right text-sm">{item.count}</TableCell>
                    <TableCell className="text-right text-sm font-mono">{item.total}</TableCell>
                    <TableCell className="text-right text-sm">{item.moyenne}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{item.dernier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground text-right mt-4">Mis à jour il y a 1 heure</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Métriques de performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Source</TableHead>
                <TableHead className="text-xs text-right">Latence</TableHead>
                <TableHead className="text-xs text-right">Requêtes</TableHead>
                <TableHead className="text-xs text-right">Taux erreur</TableHead>
                <TableHead className="text-xs text-right">Dernière synchro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-sm">CEDEAO API</TableCell>
                <TableCell className="text-right text-sm">720ms</TableCell>
                <TableCell className="text-right text-sm font-mono">8,204</TableCell>
                <TableCell className="text-right text-sm text-secondary">0.8%</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">2025-12-07</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">BCEAO Import</TableCell>
                <TableCell className="text-right text-sm">930ms</TableCell>
                <TableCell className="text-right text-sm font-mono">1,029</TableCell>
                <TableCell className="text-right text-sm text-secondary">0.03%</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">2025-12-06</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">DOUANES CI</TableCell>
                <TableCell className="text-right text-sm">1.2s</TableCell>
                <TableCell className="text-right text-sm font-mono">489</TableCell>
                <TableCell className="text-right text-sm text-secondary">0%</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">2025-12-05</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">OIM Data</TableCell>
                <TableCell className="text-right text-sm">610ms</TableCell>
                <TableCell className="text-right text-sm font-mono">2,170</TableCell>
                <TableCell className="text-right text-sm text-secondary">0.1%</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">2025-12-04</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground text-right mt-4">Stats API mises à jour: 08.12.2025 08:32</p>
        </CardContent>
      </Card>
    </div>
  );
}
