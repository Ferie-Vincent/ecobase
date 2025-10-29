import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, Users, TrendingUp, FileText, BookOpen, Building2, Network, Users2, Target, BarChart3, Globe2 } from "lucide-react";
import { metadata, organizations, pillars } from "@/data/metadata";
import { indicators } from "@/data/indicators";
import integrationPolicyImage from "@/assets/integration-policy.jpg";
import diasporaPolicyImage from "@/assets/diaspora-policy.jpg";
import { StatCard } from "@/components/StatCard";
import { dashboardStats, regionalWeights } from "@/data/mockData";
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
        <div className="text-center mb-16 space-y-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-xl border border-orange-500/20 backdrop-blur-sm">
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

        {/* Accordion: Missions + Documents + Structure */}
        <Card className="mb-12 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
          <Accordion type="single" collapsible className="w-full">
            {/* Nos Missions */}
            <AccordionItem value="missions">
              <AccordionTrigger className="px-6 text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Target className="w-7 h-7 text-primary transition-transform duration-300" />
                  Nos Missions
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-base text-muted-foreground mb-6">
                  Le ministère assure deux missions stratégiques complémentaires
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mission 1 - Intégration */}
                  <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <img 
                      src={integrationPolicyImage} 
                      alt="Politique d'Intégration Africaine" 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50">
                      <div className="p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                        <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">Intégration Africaine</h3>
                        <p className="text-sm text-white/90">
                          Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, 
                          et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mission 2 - Diaspora */}
                  <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <img 
                      src={diasporaPolicyImage} 
                      alt="Gestion des Ivoiriens de l'Extérieur" 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50">
                      <div className="p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                        <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-secondary">Ivoiriens de l'Extérieur</h3>
                        <p className="text-sm text-white/90">
                          Accompagner et coordonner les initiatives visant le regroupement et l'organisation 
                          des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Documents à télécharger */}
            <AccordionItem value="documents">
              <AccordionTrigger className="px-6 text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7 text-primary transition-transform duration-300" />
                  Documents à télécharger
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <a 
                    href="#" 
                    className="group p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-card/60 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Le Décret</p>
                        <p className="text-xs text-muted-foreground">Fichier PDF</p>
                      </div>
                    </div>
                  </a>
                  <a 
                    href="#" 
                    className="group p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-card/60 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Network className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Organigramme</p>
                        <p className="text-xs text-muted-foreground">À télécharger</p>
                      </div>
                    </div>
                  </a>
                  <a 
                    href="#" 
                    className="group p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-card/60 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Structure organisationnelle</p>
                        <p className="text-xs text-muted-foreground">Cabinet, DGPI, DGIE, SPSE</p>
                      </div>
                    </div>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Structure Organisationnelle */}
            <AccordionItem value="structure">
              <AccordionTrigger className="px-6 text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-primary transition-transform duration-300" />
                  Structure Organisationnelle
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid gap-6">
                  {/* DGPI */}
                  <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 border-l-4 border-l-primary hover:border-l-primary/80 cursor-pointer group bg-card/60 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 transition-colors duration-300 group-hover:text-primary">
                        <Network className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
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
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
                            <p className="font-semibold text-sm">Direction des Politiques Communautaires Macroéconomiques et Financières</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
                            <p className="font-semibold text-sm">Direction des Politiques Communautaires du Commerce et de la Libre Circulation</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
                            <p className="font-semibold text-sm">Direction des Politiques de la Promotion Humaine et du Développement Durable</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* DGIE */}
                  <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/10 border-l-4 border-l-secondary hover:border-l-secondary/80 cursor-pointer group bg-card/60 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 transition-colors duration-300 group-hover:text-secondary">
                        <Users2 className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
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
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary/20">
                            <p className="font-semibold text-sm">Direction de l'Accueil, de l'Orientation et du Suivi des Actions de Réinsertion</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary/20">
                            <p className="font-semibold text-sm">Direction de la Mobilisation des Compétences et des Ressources</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary/20">
                            <p className="font-semibold text-sm">Direction de l'Action Sociale</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SPSE */}
                  <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10 border-l-4 border-l-accent hover:border-l-accent/80 bg-gradient-subtle cursor-pointer group bg-card/60 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 transition-colors duration-300 group-hover:text-accent">
                        <FileText className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Pillars Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary transition-transform duration-300 hover:rotate-12" />
            Les Piliers Stratégiques
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.id} className="transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 cursor-pointer group bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between transition-colors duration-300 group-hover:text-primary">
                    {pillar.label}
                    <Badge variant="secondary" className="transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      {indicatorsByPillar[pillar.id as keyof typeof indicatorsByPillar]} indicateurs
                    </Badge>
                  </CardTitle>
                  <CardDescription className="transition-colors duration-300 group-hover:text-foreground">
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

        {/* Regional Weights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe2 className="w-7 h-7 text-primary transition-transform duration-300 hover:rotate-180" />
            Poids de la Côte d'Ivoire dans les Régions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer bg-card/60 backdrop-blur-sm border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-primary">PIB Régional</h4>
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

            <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/10 hover:border-secondary/40 group cursor-pointer bg-card/60 backdrop-blur-sm border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-secondary">Exportations</h4>
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

            <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40 group cursor-pointer bg-card/60 backdrop-blur-sm border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-accent">Importations</h4>
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

        {/* Partenaires Techniques Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary transition-transform duration-300 hover:scale-110" />
            Partenaires Techniques
          </h2>
          
          {/* National */}
          <Card className="mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Building2 className="w-6 h-6 text-primary transition-transform duration-300 hover:scale-110" />
                National
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizations.filter(org => ['INS', 'MINEF', 'MINADER'].includes(org.id)).map((org) => (
                  <div key={org.id} className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group">
                    <p className="font-semibold text-sm transition-colors duration-300 group-hover:text-primary">{org.id}</p>
                    <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">{org.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Internationales */}
          <Card className="mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Globe2 className="w-6 h-6 text-secondary transition-transform duration-300 hover:rotate-180" />
                Internationales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizations.filter(org => ['BM', 'FMI', 'BAD', 'OIM'].includes(org.id)).map((org) => (
                  <div key={org.id} className="p-3 rounded-lg bg-muted/50 hover:bg-secondary/10 hover:border-secondary/30 border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group">
                    <p className="font-semibold text-sm transition-colors duration-300 group-hover:text-secondary">{org.id}</p>
                    <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">{org.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Organisations communautaires */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Network className="w-6 h-6 text-accent transition-transform duration-300 hover:scale-110" />
                Organisations Communautaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizations.filter(org => ['CEDEAO', 'UEMOA', 'UA'].includes(org.id)).map((org) => (
                  <div key={org.id} className="p-3 rounded-lg bg-muted/50 hover:bg-accent/10 hover:border-accent/30 border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group">
                    <p className="font-semibold text-sm transition-colors duration-300 group-hover:text-accent">{org.id}</p>
                    <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">{org.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
