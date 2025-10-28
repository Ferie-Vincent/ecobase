import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Users, TrendingUp, FileText, BookOpen, Building2, Network, Users2, Target, BarChart3, Globe2 } from "lucide-react";
import { metadata, organizations, pillars } from "@/data/metadata";
import { indicators } from "@/data/indicators";
import integrationPolicyImage from "@/assets/integration-policy.jpg";
import diasporaPolicyImage from "@/assets/diaspora-policy.jpg";
import { StatCard } from "@/components/StatCard";
import { dashboardStats, tradeEvolution, regionalWeights } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Footer } from "@/components/Footer";

const Index = () => {
  const indicatorsByPillar = {
    INT: indicators.filter(i => i.pillar === "INT").length,
    DIA: indicators.filter(i => i.pillar === "DIA").length,
    MACRO: indicators.filter(i => i.pillar === "MACRO").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section - Présentation du Ministère */}
        <div className="text-center mb-16 space-y-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-xl border border-orange-500/20">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ECOBASE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plateforme de données pour le suivi et l'évaluation des politiques publiques
          </p>
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-base text-foreground/90 leading-relaxed">
              ECOBASE est la base de données officielle du{" "}
              <strong>Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur</strong>.
              Elle centralise les indicateurs socio-économiques et techniques permettant le suivi et l'évaluation 
              de deux politiques majeures : <strong>l'Intégration Africaine</strong> et la{" "}
              <strong>Gestion des Ivoiriens de l'Extérieur</strong>.
            </p>
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            <Badge variant="outline" className="text-sm">
              Version {metadata.version}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {metadata.license}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Mis à jour: {metadata.updated_at}
            </Badge>
          </div>
        </div>

        {/* Missions du ministère */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Target className="w-8 h-8 text-primary" />
              Nos Missions
            </CardTitle>
            <CardDescription className="text-base">
              Le ministère assure deux missions stratégiques complémentaires
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mission 1 - Intégration */}
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={integrationPolicyImage} 
                  alt="Politique d'Intégration Africaine" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Intégration Africaine</h3>
                    <p className="text-sm text-white/90">
                      Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, 
                      et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission 2 - Diaspora */}
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={diasporaPolicyImage} 
                  alt="Gestion des Ivoiriens de l'Extérieur" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Ivoiriens de l'Extérieur</h3>
                    <p className="text-sm text-white/90">
                      Accompagner et coordonner les initiatives visant le regroupement et l'organisation 
                      des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pillars Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Piliers Stratégiques
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.id} className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pillar.label}
                    <Badge variant="secondary">
                      {indicatorsByPillar[pillar.id as keyof typeof indicatorsByPillar]} indicateurs
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {pillar.id === "INT" && "Mesure de l'intégration régionale et du commerce intra-africain"}
                    {pillar.id === "DIA" && "Suivi des Ivoiriens de l'extérieur et de la diaspora"}
                    {pillar.id === "MACRO" && "Indicateurs macroéconomiques et transversaux"}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Statistics */}
        <section className="mb-12">
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
              icon={<Users2 className="h-6 w-6 text-secondary" />}
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
              icon={<Globe2 className="h-6 w-6 text-secondary" />}
            />
          </div>
        </section>

        {/* Commerce Evolution */}
        <section className="mb-12">
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
        <section className="mb-12">
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

        {/* Organizations Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Organisations Contributeurs
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizations.map((org) => (
                  <div key={org.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <p className="font-semibold text-sm">{org.id}</p>
                    <p className="text-xs text-muted-foreground">{org.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Structure organisationnelle */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            Structure Organisationnelle
          </h2>

          <div className="grid gap-6">
            {/* DGPI */}
            <Card className="card-hover border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Network className="w-6 h-6 text-primary" />
                  Direction Générale des Politiques d'Intégration (DGPI)
                </CardTitle>
                <CardDescription>
                  Coordinatrice des politiques d'intégration régionale et africaine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Attributions principales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Participation et harmonisation des instruments techniques et économiques d'intégration</li>
                      <li>Coordination des politiques sectorielles en matière d'intégration africaine</li>
                      <li>Mise en œuvre et suivi des programmes communautaires</li>
                      <li>Promotion de la paix et de la sécurité régionale</li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction des Politiques Communautaires Macroéconomiques et Financières</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction des Politiques Communautaires du Commerce et de la Libre Circulation</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction des Politiques de la Promotion Humaine et du Développement Durable</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DGIE */}
            <Card className="card-hover border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users2 className="w-6 h-6 text-primary" />
                  Direction Générale des Ivoiriens de l'Extérieur (DGIE)
                </CardTitle>
                <CardDescription>
                  Gestion et accompagnement de la diaspora ivoirienne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Attributions principales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Encourager et coordonner les initiatives de regroupement des Ivoiriens de l'extérieur</li>
                      <li>Appuyer la réinsertion économique, sociale et culturelle lors du retour en Côte d'Ivoire</li>
                      <li>Faciliter l'accès au logement et coordonner la participation au développement</li>
                      <li>Mobiliser les compétences des Ivoiriens de l'extérieur</li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction de l'Accueil, de l'Orientation et du Suivi des Actions de Réinsertion</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction de la Mobilisation des Compétences et des Ressources</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction de l'Action Sociale</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SPSE */}
            <Card className="card-hover border-l-4 border-l-accent bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  Service Planification & Suivi-Évaluation (SPSE)
                </CardTitle>
                <CardDescription>
                  Gestionnaire de la plateforme ECOBASE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Rôle vis-à-vis d'ECOBASE :</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Le SPSE est le service responsable de la gestion et du maintien de la plateforme ECOBASE. 
                      Il assure la collecte, la validation et la diffusion des données et indicateurs stratégiques.
                    </p>
                    <h4 className="font-semibold mb-2">Attributions principales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Participation à l'élaboration des Plans Nationaux de Développement</li>
                      <li>Production des statistiques et indicateurs sectoriels</li>
                      <li>Accompagnement des structures du ministère en matière de planification et de suivi-évaluation</li>
                      <li>Élaboration des bilans semestriels et annuels des activités du ministère</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
