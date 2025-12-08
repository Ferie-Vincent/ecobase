import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { performanceIndicators, projectsData } from "@/data/mockData";
import { TrendingUp, Calendar, User, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { MultiYearSelector } from "@/components/MultiYearSelector";
import { IndicatorSelector } from "@/components/IndicatorSelector";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { TimelineChart } from "@/components/TimelineChart";
import { Footer } from "@/components/Footer";
import { ExportMenu } from "@/components/ExportMenu";
import { useState, useMemo } from "react";

const Performance = () => {
  const [selectedYears, setSelectedYears] = useState<string[]>(["2024"]);
  const [selectedAdminIndicators, setSelectedAdminIndicators] = useState<string[]>(["realisation", "digitalisation", "partenaires"]);
  const [selectedIntegrationIndicators, setSelectedIntegrationIndicators] = useState<string[]>(["iira", "penetration", "agrements"]);
  const availableYears = ["Référence", "2022", "2023", "2024"];
  
  // Advanced filters state
  const [selectedObjectifAdmin, setSelectedObjectifAdmin] = useState<string>("tous");
  const [selectedStatutAdmin, setSelectedStatutAdmin] = useState<string>("tous");
  const [selectedObjectifIntegration, setSelectedObjectifIntegration] = useState<string>("tous");
  const [selectedStatutIntegration, setSelectedStatutIntegration] = useState<string>("tous");
  const [selectedObjectifDiaspora, setSelectedObjectifDiaspora] = useState<string>("tous");
  const [selectedStatutDiaspora, setSelectedStatutDiaspora] = useState<string>("tous");

  const adminIndicatorsOptions = [
    { value: "realisation", label: "Taux réalisation (%)" },
    { value: "digitalisation", label: "Digitalisation (%)" },
    { value: "partenaires", label: "Partenaires mobilisés" }
  ];

  const integrationIndicatorsOptions = [
    { value: "iira", label: "IIRA (indice)" },
    { value: "penetration", label: "Pénétration marchés (%)" },
    { value: "agrements", label: "Agréments SLE" }
  ];

  const allTimelineData = useMemo(() => [
    { year: "Référence", realisation: 68, digitalisation: 20, partenaires: 5, iira: 0.55, penetration: 3.0, agrements: 20 },
    { year: "2022", realisation: 69, digitalisation: 25, partenaires: 5, iira: 0.60, penetration: 3.5, agrements: 25 },
    { year: "2023", realisation: 70, digitalisation: 28, partenaires: 6, iira: 0.64, penetration: 4.2, agrements: 30 },
    { year: "2024", realisation: 72, digitalisation: 32, partenaires: 7, iira: 0.67, penetration: 5.0, agrements: 35 },
  ], []);

  const timelineData = useMemo(() => {
    return allTimelineData.filter(item => selectedYears.includes(item.year));
  }, [selectedYears, allTimelineData]);

  const integrationTimelineData = useMemo(() => {
    return allTimelineData.filter(item => selectedYears.includes(item.year));
  }, [selectedYears, allTimelineData]);

  const adminLines = useMemo(() => {
    return adminIndicatorsOptions
      .filter(opt => selectedAdminIndicators.includes(opt.value))
      .map((opt, idx) => ({
        dataKey: opt.value,
        name: opt.label,
        color: idx === 0 ? "hsl(var(--primary))" : idx === 1 ? "hsl(var(--secondary))" : "hsl(var(--accent))"
      }));
  }, [selectedAdminIndicators]);

  const integrationLines = useMemo(() => {
    return integrationIndicatorsOptions
      .filter(opt => selectedIntegrationIndicators.includes(opt.value))
      .map((opt, idx) => ({
        dataKey: opt.value,
        name: opt.label,
        color: idx === 0 ? "hsl(var(--primary))" : idx === 1 ? "hsl(var(--secondary))" : "hsl(var(--accent))"
      }));
  }, [selectedIntegrationIndicators]);

  // Calculate status based on target achievement
  const calculateStatut = (reference: string, cible: string, year: string): string => {
    const refNum = parseFloat(reference.replace(/[^\d.-]/g, ''));
    const cibleNum = parseFloat(cible.replace(/[^\d.-]/g, ''));
    
    if (isNaN(refNum) || isNaN(cibleNum)) return "en_cours";
    
    const progress = ((cibleNum - refNum) / Math.abs(refNum)) * 100;
    
    if (progress >= 100) return "atteint";
    if (progress >= 70) return "en_cours";
    if (progress >= 40) return "risque";
    return "non_atteint";
  };

  // Get status badge
  const getStatutBadge = (reference: string, cible: string, year: string) => {
    const statut = calculateStatut(reference, cible, year);
    
    switch (statut) {
      case "atteint":
        return <Badge className="bg-green-500 hover:bg-green-600">Atteint</Badge>;
      case "en_cours":
        return <Badge variant="secondary">En cours</Badge>;
      case "risque":
        return <Badge className="bg-orange-500 hover:bg-orange-600">À risque</Badge>;
      case "non_atteint":
        return <Badge variant="destructive">Non atteint</Badge>;
      default:
        return <Badge variant="secondary">En cours</Badge>;
    }
  };

  // Filter functions
  const filteredAdminSections = useMemo(() => {
    return performanceIndicators.administration
      .filter(section => selectedObjectifAdmin === "tous" || section.objectif === selectedObjectifAdmin)
      .map(section => ({
        ...section,
        indicateurs: section.indicateurs.filter(ind => {
          if (selectedStatutAdmin === "tous") return true;
          const statut = calculateStatut(ind.reference, ind.cible2024, "2024");
          return statut === selectedStatutAdmin;
        })
      }))
      .filter(section => section.indicateurs.length > 0);
  }, [selectedObjectifAdmin, selectedStatutAdmin]);

  const filteredIntegrationSections = useMemo(() => {
    return performanceIndicators.integrationAfricaine
      .filter(section => selectedObjectifIntegration === "tous" || section.objectif === selectedObjectifIntegration)
      .map(section => ({
        ...section,
        indicateurs: section.indicateurs.filter(ind => {
          if (selectedStatutIntegration === "tous") return true;
          const statut = calculateStatut(ind.reference, ind.cible2024, "2024");
          return statut === selectedStatutIntegration;
        })
      }))
      .filter(section => section.indicateurs.length > 0);
  }, [selectedObjectifIntegration, selectedStatutIntegration]);

  const filteredDiasporaSections = useMemo(() => {
    return performanceIndicators.ivoiriensExterieur
      .filter(section => selectedObjectifDiaspora === "tous" || section.objectif === selectedObjectifDiaspora)
      .map(section => ({
        ...section,
        indicateurs: section.indicateurs.filter(ind => {
          if (selectedStatutDiaspora === "tous") return true;
          const statut = calculateStatut(ind.reference, ind.cible2024, "2024");
          return statut === selectedStatutDiaspora;
        })
      }))
      .filter(section => section.indicateurs.length > 0);
  }, [selectedObjectifDiaspora, selectedStatutDiaspora]);

  // Get unique objectifs
  const adminObjectifs = useMemo(() => 
    performanceIndicators.administration.map(s => s.objectif), 
    []
  );
  const integrationObjectifs = useMemo(() => 
    performanceIndicators.integrationAfricaine.map(s => s.objectif), 
    []
  );
  const diasporaObjectifs = useMemo(() => 
    performanceIndicators.ivoiriensExterieur.map(s => s.objectif), 
    []
  );

  // Prepare export data
  const exportData = useMemo(() => {
    const allIndicators: any[] = [];
    
    performanceIndicators.administration.forEach(section => {
      section.indicateurs.forEach(ind => {
        allIndicators.push({
          section: "Administration",
          objectif: section.objectif,
          nom: ind.nom,
          reference: ind.reference,
          cible2022: ind.cible2022,
          cible2023: ind.cible2023,
          cible2024: ind.cible2024,
          statut: calculateStatut(ind.reference, ind.cible2024, "2024")
        });
      });
    });
    
    performanceIndicators.integrationAfricaine.forEach(section => {
      section.indicateurs.forEach(ind => {
        allIndicators.push({
          section: "Intégration Africaine",
          objectif: section.objectif,
          nom: ind.nom,
          reference: ind.reference,
          cible2022: ind.cible2022,
          cible2023: ind.cible2023,
          cible2024: ind.cible2024,
          statut: calculateStatut(ind.reference, ind.cible2024, "2024")
        });
      });
    });
    
    performanceIndicators.ivoiriensExterieur.forEach(section => {
      section.indicateurs.forEach(ind => {
        allIndicators.push({
          section: "Ivoiriens Extérieur",
          objectif: section.objectif,
          nom: ind.nom,
          reference: ind.reference,
          cible2022: ind.cible2022,
          cible2023: ind.cible2023,
          cible2024: ind.cible2024,
          statut: calculateStatut(ind.reference, ind.cible2024, "2024")
        });
      });
    });
    
    return allIndicators;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Tableaux de Performance</h1>
          <p className="text-lg text-white/90">
            Suivi des objectifs et indicateurs de performance du ministère
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <MultiYearSelector 
              selectedYears={selectedYears} 
              onYearsChange={setSelectedYears} 
              availableYears={availableYears}
            />
          </div>
          <ExportMenu
            data={exportData}
            columns={[
              { header: "Section", accessor: "section" },
              { header: "Objectif", accessor: "objectif" },
              { header: "Indicateur", accessor: "nom" },
              { header: "Référence", accessor: "reference" },
              { header: "Cible 2022", accessor: "cible2022" },
              { header: "Cible 2023", accessor: "cible2023" },
              { header: "Cible 2024", accessor: "cible2024" },
              { header: "Statut", accessor: "statut" }
            ]}
            filename="indicateurs-performance"
            title="Indicateurs de Performance"
          />
        </div>

        {/* Timeline Chart - Administration */}
        <section className="space-y-4">
          <IndicatorSelector
            selectedIndicators={selectedAdminIndicators}
            onIndicatorsChange={setSelectedAdminIndicators}
            availableIndicators={adminIndicatorsOptions}
          />
          <TimelineChart
            title="Évolution des Indicateurs d'Administration"
            data={timelineData}
            lines={adminLines}
          />
        </section>

        {/* Timeline Chart - Integration */}
        <section className="space-y-4">
          <IndicatorSelector
            selectedIndicators={selectedIntegrationIndicators}
            onIndicatorsChange={setSelectedIntegrationIndicators}
            availableIndicators={integrationIndicatorsOptions}
          />
          <TimelineChart
            title="Évolution des Indicateurs d'Intégration Africaine"
            data={integrationTimelineData}
            lines={integrationLines}
          />
        </section>

        {/* Projets en cours */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Projets en Cours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-foreground">{project.titre}</h3>
                    <Badge variant="secondary">{project.statut}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.dateDebut).toLocaleDateString('fr-FR')} - {new Date(project.dateFin).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{project.leader}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-bold text-primary">{project.niveau}%</span>
                    </div>
                    <Progress value={project.niveau} className="h-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Performance Indicators */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Indicateurs de Performance
          </h2>

          <Tabs defaultValue="administration" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
              <TabsTrigger value="administration">Administration Générale</TabsTrigger>
              <TabsTrigger value="integration">Intégration Africaine</TabsTrigger>
              <TabsTrigger value="diaspora">Ivoiriens de l'Extérieur</TabsTrigger>
            </TabsList>

            <TabsContent value="administration" className="space-y-6">
              <AdvancedFilters
                selectedObjectif={selectedObjectifAdmin}
                selectedStatut={selectedStatutAdmin}
                onObjectifChange={setSelectedObjectifAdmin}
                onStatutChange={setSelectedStatutAdmin}
                onReset={() => {
                  setSelectedObjectifAdmin("tous");
                  setSelectedStatutAdmin("tous");
                }}
                objectifsOptions={adminObjectifs}
              />
              
              {filteredAdminSections.map((section, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">{section.objectif}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Indicateur</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Référence</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2022") ? "text-primary" : "text-muted-foreground"}`}>2022</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2023") ? "text-primary" : "text-muted-foreground"}`}>2023</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2024") ? "text-primary" : "text-muted-foreground"}`}>2024</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.indicateurs.map((ind, i) => (
                          <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 text-sm text-foreground">{ind.nom}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium">{ind.reference}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2022") ? "text-primary font-bold" : ""}`}>{ind.cible2022}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2023") ? "text-primary font-bold" : ""}`}>{ind.cible2023}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2024") ? "text-secondary font-bold" : ""}`}>{ind.cible2024}</td>
                            <td className="text-center py-3 px-4">{getStatutBadge(ind.reference, ind.cible2024, "2024")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <AdvancedFilters
                selectedObjectif={selectedObjectifIntegration}
                selectedStatut={selectedStatutIntegration}
                onObjectifChange={setSelectedObjectifIntegration}
                onStatutChange={setSelectedStatutIntegration}
                onReset={() => {
                  setSelectedObjectifIntegration("tous");
                  setSelectedStatutIntegration("tous");
                }}
                objectifsOptions={integrationObjectifs}
              />
              
              {filteredIntegrationSections.map((section, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">{section.objectif}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Indicateur</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Référence</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2022") ? "text-primary" : "text-muted-foreground"}`}>2022</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2023") ? "text-primary" : "text-muted-foreground"}`}>2023</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2024") ? "text-primary" : "text-muted-foreground"}`}>2024</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.indicateurs.map((ind, i) => (
                          <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 text-sm text-foreground">{ind.nom}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium">{ind.reference}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2022") ? "text-primary font-bold" : ""}`}>{ind.cible2022}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2023") ? "text-primary font-bold" : ""}`}>{ind.cible2023}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2024") ? "text-secondary font-bold" : ""}`}>{ind.cible2024}</td>
                            <td className="text-center py-3 px-4">{getStatutBadge(ind.reference, ind.cible2024, "2024")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="diaspora" className="space-y-6">
              <AdvancedFilters
                selectedObjectif={selectedObjectifDiaspora}
                selectedStatut={selectedStatutDiaspora}
                onObjectifChange={setSelectedObjectifDiaspora}
                onStatutChange={setSelectedStatutDiaspora}
                onReset={() => {
                  setSelectedObjectifDiaspora("tous");
                  setSelectedStatutDiaspora("tous");
                }}
                objectifsOptions={diasporaObjectifs}
              />
              
              {filteredDiasporaSections.map((section, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">{section.objectif}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Indicateur</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Référence</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2022") ? "text-primary" : "text-muted-foreground"}`}>2022</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2023") ? "text-primary" : "text-muted-foreground"}`}>2023</th>
                          <th className={`text-center py-3 px-4 text-sm font-semibold ${selectedYears.includes("2024") ? "text-primary" : "text-muted-foreground"}`}>2024</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.indicateurs.map((ind, i) => (
                          <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 text-sm text-foreground">{ind.nom}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium">{ind.reference}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2022") ? "text-primary font-bold" : ""}`}>{ind.cible2022}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2023") ? "text-primary font-bold" : ""}`}>{ind.cible2023}</td>
                            <td className={`text-center py-3 px-4 text-sm font-medium ${selectedYears.includes("2024") ? "text-secondary font-bold" : ""}`}>{ind.cible2024}</td>
                            <td className="text-center py-3 px-4">{getStatutBadge(ind.reference, ind.cible2024, "2024")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>

        {/* Méthodologie */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <h3 className="text-lg font-bold text-foreground mb-3">À Propos d'ECOBASE</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ECOBASE est une base de données socio-économique et technique de l'Intégration Régionale 
              développée selon la méthode MERISE. Elle permet un suivi dynamique des projets, actions et 
              programmes du ministère, facilitant la prise de décision à travers l'intégration des données 
              produites par les différentes directions et services en lien avec l'Intégration Régionale.
            </p>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Performance;
