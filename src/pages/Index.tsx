import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Database,
  Users,
  TrendingUp,
  FileText,
  BookOpen,
  Building2,
  Network,
  Users2,
  Target,
  BarChart3,
  Globe2,
  Landmark,
  Sprout,
  CircleDollarSign,
  Plane,
  Coins,
  Flag,
  BanknoteIcon,
  Ship,
  ArrowUpRight,
} from "lucide-react";
import { metadata } from "@/data/metadata";
import { indicators } from "@/data/indicators";
import integrationPolicyImage from "@/assets/integration-policy.jpg";
import diasporaPolicyImage from "@/assets/diaspora-policy.jpg";
import { StatCard } from "@/components/StatCard";
import { regionalWeights } from "@/data/mockData";
import { Footer } from "@/components/Footer";
import { useData } from "@/contexts/DataContext";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Logos partenaires
import logoBad from "@/assets/logos/BAD.png";
import logoCedeao from "@/assets/logos/cedeao.png";
import logoCnps from "@/assets/logos/CNPS.png";
import logoDgbf from "@/assets/logos/DGBF.png";
import logoDgce from "@/assets/logos/DGCE.png";
import logoDouanes from "@/assets/logos/Douanes.png";
import logoEnabel from "@/assets/logos/Enabel.png";
import logoExpertiseFrance from "@/assets/logos/Expertise-France.png";
import logoOfii from "@/assets/logos/OFII.png";
import logoOim from "@/assets/logos/OIM.png";
import logoUemoa from "@/assets/logos/UEMOA.png";

// Mapping logos par sigle
const partnerLogos: { [key: string]: string } = {
  CEDEAO: logoCedeao,
  UEMOA: logoUemoa,
  BAD: logoBad,
  OIM: logoOim,
  CNPS: logoCnps,
  DGCE: logoDgce,
  DGD: logoDouanes,
  DBDES: logoDgbf,
  ENABEL: logoEnabel,
  "EXPERTISE FRANCE": logoExpertiseFrance,
  OFII: logoOfii,
};

const partnerUrls: Record<string, string> = {
  DBDES: "https://www.dgbf.ci/",
  DGCE: "https://www.gucecotedivoire.ci/",
  DGD: "https://www.douanes.ci/",
  CNPS: "https://www.cnps.ci/",
  CEDEAO: "https://www.ecowas.int/?lang=fr",
  UEMOA: "https://uemoa.switch-maker.net/",
  BAD: "https://www.afdb.org/fr",
  OIM: "https://rodakar.iom.int/fr/cote-divoire",
  ENABEL: "https://www.enabel.be/fr/",
  "EXPERTISE FRANCE": "https://www.expertisefrance.fr/fr",
  OFII: "https://www.ofii.fr/",
};

const Index = () => {
  const { partners, piliers, dashboardStatsByYear } = useData();
  
  // Get current year stats (default to 2024)
  const currentStats = dashboardStatsByYear["2024"] || [];
  
  // Helper to get stat by name
  const getStat = (nom: string) => currentStats.find(s => s.nom === nom);
  
  // Calculate indicator counts automatically from actual indicators
  const indicatorsByPillar = {
    INT: indicators.filter((i) => i.pillar === "INT").length,
    DIA: indicators.filter((i) => i.pillar === "DIA").length,
    MACRO: indicators.filter((i) => i.pillar === "MACRO").length,
  };

  // Helper function to get icon for organization based on sigle
  const getOrgIcon = (sigle: string) => {
    const iconMap: { [key: string]: any } = {
      CEDEAO: Globe2,
      UEMOA: Coins,
      BAD: TrendingUp,
      OIM: Plane,
      DBDES: Landmark,
      DGCE: Ship,
      DGD: Building2,
      CNPS: BanknoteIcon,
    };
    return iconMap[sigle] || Building2;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec motif africain */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background pattern africain */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.3'%3E%3Cpath d='M40 0L60 20L40 40L20 20L40 0zM0 40L20 20L40 40L20 60L0 40zM40 40L60 20L80 40L60 60L40 40zM40 80L60 60L80 80L60 100L40 80zM40 40L60 60L40 80L20 60L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background/80 to-background" />

        {/* Décor cercles */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-primary/20 blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-xl" />

        {/* Contenu Hero */}
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          {/* Badge */}
          <Badge className="bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium rounded-full">
            <span className="w-2 h-2 bg-secondary rounded-full inline-block mr-2 animate-pulse" />
            Plateforme Officielle du Ministère
          </Badge>

          {/* Titre principal */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-primary">Base de Données</span>
              <br />
              <span className="text-foreground">Socio-Économique</span>
              <br />
              <span className="text-secondary">ECOBASE</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Plateforme officielle du Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur
            pour le suivi et l'évaluation des politiques publiques
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="/integration"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/30"
            >
              <TrendingUp className="w-5 h-5" />
              Explorer l'Intégration
            </a>
            <a
              href="/diaspora"
              className="inline-flex items-center gap-2 bg-card text-foreground border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="w-5 h-5" />
              Analyser la Diaspora
            </a>
          </div>

          {/* Statistiques clés avec tooltips explicatifs */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center group cursor-help" title="Total des indicateurs définis dans le référentiel ECOBASE">
              <div className="text-3xl md:text-4xl font-bold text-primary">{indicators.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Indicateurs
                <br />
                <span className="text-xs opacity-70">au référentiel</span>
              </div>
            </div>
            <div className="text-center group cursor-help" title="Organisations partenaires techniques et financiers">
              <div className="text-3xl md:text-4xl font-bold text-secondary">{partners.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Partenaires
                <br />
                <span className="text-xs opacity-70">techniques</span>
              </div>
            </div>
            <div className="text-center group cursor-help" title="Piliers stratégiques : Intégration, Diaspora, Macroéconomie">
              <div className="text-3xl md:text-4xl font-bold text-foreground">{piliers.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Piliers
                <br />
                <span className="text-xs opacity-70">stratégiques</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu Rapide - Mini Charts */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Chart 1 - Commerce SLEC */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Exportations SLEC</CardTitle>
                <Badge variant="secondary" className="text-xs">+73%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">52.4 Mds FCFA</div>
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { year: "2020", value: 30 },
                    { year: "2021", value: 35 },
                    { year: "2022", value: 42 },
                    { year: "2023", value: 47 },
                    { year: "2024", value: 52 },
                  ]}>
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" strokeWidth={2} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value} Mds FCFA`, 'Exports']}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Chart 2 - Transferts Diaspora */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Transferts Diaspora / PIB</CardTitle>
                <Badge variant="outline" className="text-xs">Stable</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">9.1%</div>
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { year: "2020", value: 8.2 },
                    { year: "2021", value: 8.5 },
                    { year: "2022", value: 8.8 },
                    { year: "2023", value: 9.0 },
                    { year: "2024", value: 9.1 },
                  ]}>
                    <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value}%`, 'Part PIB']}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Chart 3 - Voyageurs CEDEAO */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Voyageurs CEDEAO</CardTitle>
                <Badge className="text-xs bg-primary/20 text-primary border-0">+12%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">1.2M</div>
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { year: "2020", value: 650 },
                    { year: "2021", value: 780 },
                    { year: "2022", value: 920 },
                    { year: "2023", value: 1050 },
                    { year: "2024", value: 1200 },
                  ]}>
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary)/0.2)" strokeWidth={2} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value}K`, 'Voyageurs']}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
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
                        <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">
                          Intégration Africaine
                        </h3>
                        <p className="text-sm text-white/90">
                          Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, et renforcer la
                          coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA
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
                        <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-secondary">
                          Ivoiriens de l'Extérieur
                        </h3>
                        <p className="text-sm text-white/90">
                          Accompagner et coordonner les initiatives visant le regroupement et l'organisation des
                          Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences
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
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          Le Décret
                        </p>
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
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          Organigramme
                        </p>
                        <p className="text-xs text-muted-foreground">À télécharger</p>
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
                            <li>
                              Participation et harmonisation des instruments techniques et économiques d'intégration
                            </li>
                            <li>Coordination des politiques sectorielles en matière d'intégration africaine</li>
                            <li>Mise en œuvre et suivi des programmes communautaires</li>
                            <li>Promotion de la paix et de la sécurité régionale</li>
                          </ul>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
                            <p className="font-semibold text-sm">
                              Direction des Politiques Communautaires Macroéconomiques et Financières
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
                            <p className="font-semibold text-sm">
                              Direction des Politiques Communautaires du Commerce et de la Libre Circulation
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
                            <p className="font-semibold text-sm">
                              Direction des Politiques de la Promotion Humaine et du Développement Durable
                            </p>
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
                      <CardDescription>Gestion et accompagnement de la diaspora ivoirienne</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Attributions principales :</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>
                              Encourager et coordonner les initiatives de regroupement des Ivoiriens de l'extérieur
                            </li>
                            <li>
                              Appuyer la réinsertion économique, sociale et culturelle lors du retour en Côte d'Ivoire
                            </li>
                            <li>Faciliter l'accès au logement et coordonner la participation au développement</li>
                            <li>Mobiliser les compétences des Ivoiriens de l'extérieur</li>
                          </ul>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary/20">
                            <p className="font-semibold text-sm">
                              Direction de l'Accueil, de l'Orientation et du Suivi des Actions de Réinsertion
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary/20">
                            <p className="font-semibold text-sm">
                              Direction de la Mobilisation des Compétences et des Ressources
                            </p>
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
                      <CardDescription>Gestionnaire de la plateforme ECOBASE</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Rôle vis-à-vis d'ECOBASE :</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Le SPSE est le service responsable de la gestion et du maintien de la plateforme ECOBASE. Il
                            assure la collecte, la validation et la diffusion des données et indicateurs stratégiques.
                          </p>
                          <h4 className="font-semibold mb-2">Attributions principales :</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Participation à l'élaboration des Plans Nationaux de Développement</li>
                            <li>Production des statistiques et indicateurs sectoriels</li>
                            <li>
                              Accompagnement des structures du ministère en matière de planification et de
                              suivi-évaluation
                            </li>
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
            {piliers.map((pilier) => (
              <Card
                key={pilier.id}
                className="transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 cursor-pointer group bg-card/60 backdrop-blur-sm border-border/50"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between transition-colors duration-300 group-hover:text-primary">
                    {pilier.titre}
                    <Badge
                      variant="secondary"
                      className="transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      {indicatorsByPillar[pilier.code as keyof typeof indicatorsByPillar]} indicateurs
                    </Badge>
                  </CardTitle>
                  <CardDescription className="transition-colors duration-300 group-hover:text-foreground">
                    {pilier.description}
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
            {currentStats.map((stat, index) => (
              <StatCard
                key={stat.id}
                title={stat.nom}
                value={stat.valeur}
                unit={stat.unite}
                trend={stat.tendance}
                icon={
                  stat.categorie === "Intégration" ? <BarChart3 className="h-6 w-6 text-primary" /> :
                  stat.categorie === "Diaspora" ? <Users2 className="h-6 w-6 text-secondary" /> :
                  <Globe2 className="h-6 w-6 text-secondary" />
                }
                variant={stat.categorie === "Intégration" ? "primary" : stat.categorie === "Diaspora" ? "secondary" : undefined}
              />
            ))}
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
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-primary">
                PIB Régional
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">UEMOA</span>
                    <span className="text-sm font-bold text-primary">{regionalWeights.pibUEMOA}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80"
                      style={{ width: `${regionalWeights.pibUEMOA}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CEDEAO</span>
                    <span className="text-sm font-bold text-primary">{regionalWeights.pibCEDEAO}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80"
                      style={{ width: `${regionalWeights.pibCEDEAO}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afrique</span>
                    <span className="text-sm font-bold text-primary">{regionalWeights.pibAfrica}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80"
                      style={{ width: `${regionalWeights.pibAfrica * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/10 hover:border-secondary/40 group cursor-pointer bg-card/60 backdrop-blur-sm border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-secondary">
                Exportations
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CEDEAO</span>
                    <span className="text-sm font-bold text-secondary">{regionalWeights.exportsCEDEAO}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-secondary/80"
                      style={{ width: `${regionalWeights.exportsCEDEAO}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afrique</span>
                    <span className="text-sm font-bold text-secondary">{regionalWeights.exportsAfrica}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-secondary/80"
                      style={{ width: `${regionalWeights.exportsAfrica * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40 group cursor-pointer bg-card/60 backdrop-blur-sm border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-accent">
                Importations
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CEDEAO</span>
                    <span className="text-sm font-bold text-accent">{regionalWeights.importsCEDEAO}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/80"
                      style={{ width: `${regionalWeights.importsCEDEAO}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afrique</span>
                    <span className="text-sm font-bold text-accent">{regionalWeights.importsAfrica}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/80"
                      style={{ width: `${regionalWeights.importsAfrica * 10}%` }}
                    />
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

          {/* Nationales */}
          <Card className="mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Building2 className="w-6 h-6 text-primary transition-transform duration-300 hover:scale-110" />
                Nationales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {partners
                  .filter((p) => p.type === "National" || p.type === "Nationale")
                  .map((p) => {
                    const logo = partnerLogos[p.sigle];
                    const url = p.url || partnerUrls[p.sigle];
                    return (
                      <a
                        key={p.id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg bg-background hover:bg-primary/5 hover:border-primary/30 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group flex flex-col items-center text-center no-underline"
                      >
                        <div className="w-16 h-16 flex items-center justify-center mb-3">
                          {logo ? (
                            <img src={logo} alt={p.sigle} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Building2 className="w-10 h-10 text-primary" />
                          )}
                        </div>
                        <p className="font-semibold text-sm transition-colors duration-300 group-hover:text-primary">
                          {p.sigle}
                        </p>
                        <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground mt-1">
                          {p.nom}
                        </p>
                      </a>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Régionales */}
          <Card className="mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Network className="w-6 h-6 text-accent transition-transform duration-300 hover:scale-110" />
                Régionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                {partners
                  .filter((p) => p.type === "Régional" || p.type === "Régionale")
                  .map((p) => {
                    const logo = partnerLogos[p.sigle];
                    const url = p.url || partnerUrls[p.sigle];
                    return (
                      <a
                        key={p.id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg bg-background hover:bg-accent/5 hover:border-accent/30 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group flex flex-col items-center text-center no-underline"
                      >
                        <div className="w-16 h-16 flex items-center justify-center mb-3">
                          {logo ? (
                            <img src={logo} alt={p.sigle} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Network className="w-10 h-10 text-accent" />
                          )}
                        </div>
                        <p className="font-semibold text-sm transition-colors duration-300 group-hover:text-accent">
                          {p.sigle}
                        </p>
                        <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground mt-1">
                          {p.nom}
                        </p>
                      </a>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Internationales */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Globe2 className="w-6 h-6 text-secondary transition-transform duration-300 hover:rotate-180" />
                Internationales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
                {partners
                  .filter((p) => p.type === "International" || p.type === "Internationale")
                  .map((p) => {
                    const logo = partnerLogos[p.sigle];
                    const url = p.url || partnerUrls[p.sigle];
                    return (
                      <a
                        key={p.id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg bg-background hover:bg-secondary/5 hover:border-secondary/30 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group flex flex-col items-center text-center no-underline"
                      >
                        <div className="w-16 h-16 flex items-center justify-center mb-3">
                          {logo ? (
                            <img src={logo} alt={p.sigle} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Globe2 className="w-10 h-10 text-secondary" />
                          )}
                        </div>
                        <p className="font-semibold text-sm transition-colors duration-300 group-hover:text-secondary">
                          {p.sigle}
                        </p>
                        <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground mt-1">
                          {p.nom}
                        </p>
                      </a>
                    );
                  })}
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
