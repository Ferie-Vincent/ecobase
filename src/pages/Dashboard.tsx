import { StatCard } from "@/components/StatCard";
import { dashboardStats, tradeEvolution, regionalWeights } from "@/data/mockData";
import { BarChart3, Users, Globe, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tableau de Bord ECOBASE
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Base de données socioéconomique et technique de l'intégration africaine et de gestion des Ivoiriens de l'extérieur
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-semibold">Mission:</span> Intégration Régionale
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-semibold">Période:</span> 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Statistiques Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Entreprises SLEC"
              value={dashboardStats.integration.slecEnterprises}
              unit="entreprises"
              trend="+18"
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              variant="primary"
            />
            <StatCard
              title="Ivoiriens Réinsérés"
              value={dashboardStats.diaspora.reinserted}
              unit="personnes"
              trend="+456"
              icon={<Users className="h-6 w-6 text-secondary" />}
              variant="secondary"
            />
            <StatCard
              title="Transferts d'argent / PIB"
              value={dashboardStats.diaspora.transfertsGDP}
              unit="%"
              trend="+0.6%"
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
            />
            <StatCard
              title="Trafic Routier CEDEAO"
              value={(dashboardStats.circulation.roadCEDEAO / 1000000).toFixed(1)}
              unit="M voyageurs"
              trend="+234K"
              icon={<Globe className="h-6 w-6 text-secondary" />}
            />
          </div>
        </section>

        {/* Commerce Evolution */}
        <section>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Évolution du Commerce (Milliards FCFA)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={tradeEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="exports" stroke="hsl(var(--primary))" strokeWidth={3} name="Exportations" />
                <Line type="monotone" dataKey="imports" stroke="hsl(var(--secondary))" strokeWidth={3} name="Importations" />
                <Line type="monotone" dataKey="intraAfrica" stroke="hsl(var(--accent))" strokeWidth={3} name="Intra-Afrique" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Regional Weights */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Poids de la Côte d'Ivoire dans les Régions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4">PIB Régional</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">UEMOA</span>
                    <span className="text-sm font-bold text-primary">{regionalWeights.pibUEMOA}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/80" style={{ width: `${regionalWeights.pibUEMOA}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CEDEAO</span>
                    <span className="text-sm font-bold text-primary">{regionalWeights.pibCEDEAO}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/80" style={{ width: `${regionalWeights.pibCEDEAO}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afrique</span>
                    <span className="text-sm font-bold text-primary">{regionalWeights.pibAfrica}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/80" style={{ width: `${regionalWeights.pibAfrica * 10}%` }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4">Exportations</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CEDEAO</span>
                    <span className="text-sm font-bold text-secondary">{regionalWeights.exportsCEDEAO}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-secondary/80" style={{ width: `${regionalWeights.exportsCEDEAO}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afrique</span>
                    <span className="text-sm font-bold text-secondary">{regionalWeights.exportsAfrica}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-secondary/80" style={{ width: `${regionalWeights.exportsAfrica * 10}%` }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4">Importations</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CEDEAO</span>
                    <span className="text-sm font-bold text-accent">{regionalWeights.importsCEDEAO}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-accent/80" style={{ width: `${regionalWeights.importsCEDEAO}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afrique</span>
                    <span className="text-sm font-bold text-accent">{regionalWeights.importsAfrica}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-accent/80" style={{ width: `${regionalWeights.importsAfrica * 10}%` }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
