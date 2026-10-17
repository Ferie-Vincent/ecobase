import { useEffect, useRef, useState } from "react";
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
import ministreDossoAdama from "@/assets/ministre-dosso-adama.png";
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

// Composant Section Ministre avec animation au scroll
const MinistereSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { ministreInfo } = useData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-primary/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-center">
            {/* Photo du Ministre - 2 colonnes */}
            <div 
              className={`md:col-span-2 flex justify-center transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="relative group">
                {/* Cadre décoratif arrière */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl transform rotate-3 group-hover:rotate-1 transition-transform duration-500" />
                
                {/* Photo principale */}
                <div className="relative w-72 h-80 md:w-80 md:h-[420px] rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-background">
                  <img 
                    src={ministreInfo.photoUrl || ministreDossoAdama} 
                    alt={ministreInfo.nom} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay subtil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Badge nom - style plus élégant */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-8 py-3 rounded-xl shadow-xl shadow-primary/30 transform hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-base md:text-lg tracking-wide whitespace-nowrap">{ministreInfo.nom}</span>
                </div>
              </div>
            </div>

            {/* Message - 3 colonnes */}
            <div 
              className={`md:col-span-3 space-y-8 pt-8 md:pt-0 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              {/* Titre avec ligne décorative */}
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  Message du Ministre
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-12 h-1.5 bg-primary rounded-full" />
                  <div className="w-6 h-1.5 bg-secondary rounded-full" />
                </div>
              </div>
              
              {/* Citation avec guillemets stylisés */}
              <div 
                className={`relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {/* Guillemet ouvrant */}
                <div className="absolute -top-4 left-6 flex">
                  <span className="text-7xl font-serif text-primary leading-none">"</span>
                </div>
                
                {/* Barre latérale colorée */}
                <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-secondary to-primary rounded-full" />
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed pl-4 pt-4 italic">
                  {ministreInfo.citation}
                </p>
                
                {/* Guillemet fermant */}
                <div className="absolute -bottom-4 right-6 flex">
                  <span className="text-7xl font-serif text-secondary leading-none">"</span>
                </div>
              </div>

              {/* Titre officiel - style amélioré */}
              <div 
                className={`flex items-start gap-4 pl-4 transition-all duration-1000 delay-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full self-stretch min-h-[60px]" />
                <div>
                  <p className="font-semibold text-foreground text-base md:text-lg">
                    {ministreInfo.titreComplet.split(",")[0]},
                  </p>
                  <p className="font-semibold text-foreground text-base md:text-lg">
                    {ministreInfo.titreComplet.split(",")[1] || ""}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 uppercase tracking-widest font-medium">
                    République de Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
      {/* Hero Bento */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative container mx-auto px-4 pt-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(150px,auto)] gap-4">
            {/* Grande tuile titre */}
            <div className="md:col-span-3 md:row-span-2 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft flex flex-col justify-between animate-fade-in">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Plateforme Officielle du Ministère
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
                  Base de Données
                  <br />
                  Socio-Économique{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ECOBASE</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Plateforme officielle du Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur
                  pour le suivi et l'évaluation des politiques publiques
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-8">
                <a href="/integration" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5">
                  <TrendingUp className="w-4 h-4" />
                  Explorer l'Intégration
                </a>
                <a href="/diaspora" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-semibold text-foreground transition-all hover:bg-muted hover:-translate-y-0.5">
                  <BarChart3 className="w-4 h-4" />
                  Analyser la Diaspora
                </a>
              </div>
            </div>

            {/* Indicateurs */}
            <div className="rounded-3xl bg-primary text-primary-foreground p-6 flex flex-col justify-between shadow-soft animate-fade-in" title="Total des indicateurs définis dans le référentiel ECOBASE">
              <Database className="w-6 h-6 opacity-90" />
              <div>
                <div className="text-5xl font-extrabold tracking-tight">{indicators.length}</div>
                <div className="text-sm opacity-90">Indicateurs au référentiel</div>
              </div>
            </div>

            {/* Partenaires */}
            <div className="rounded-3xl bg-secondary text-secondary-foreground p-6 flex flex-col justify-between shadow-soft animate-fade-in" title="Organisations partenaires techniques et financiers">
              <Network className="w-6 h-6 opacity-90" />
              <div>
                <div className="text-5xl font-extrabold tracking-tight">{partners.length}</div>
                <div className="text-sm opacity-90">Partenaires techniques</div>
              </div>
            </div>

            {/* Tuiles d'accès rapide */}
            {[
              { href: "/integration", icon: Globe2, label: "Intégration africaine", sub: "CEDEAO · UEMOA · ZLECAf", tone: "text-primary bg-primary/10" },
              { href: "/diaspora", icon: Users2, label: "Ivoiriens de l'Extérieur", sub: "Transferts · Retours · Consulats", tone: "text-secondary bg-secondary/10" },
              { href: "/circulation", icon: Plane, label: "Libre circulation", sub: "Voyageurs · Frontières", tone: "text-primary bg-primary/10" },
            ].map((t) => (
              <a key={t.href} href={t.href} className="group rounded-3xl border border-border bg-card p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${t.tone}`}>
                    <t.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <div className="pt-6">
                  <div className="font-semibold text-foreground">{t.label}</div>
                  <div className="text-sm text-muted-foreground">{t.sub}</div>
                </div>
              </a>
            ))}

            {/* Piliers */}
            <div className="rounded-3xl border border-border bg-muted p-6 flex flex-col justify-between" title="Piliers stratégiques">
              <Target className="w-6 h-6 text-foreground" />
              <div>
                <div className="text-5xl font-extrabold tracking-tight text-foreground">{piliers.length}</div>
                <div className="text-sm text-muted-foreground">Piliers stratégiques</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message du Ministre */}
      <MinistereSection />

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
