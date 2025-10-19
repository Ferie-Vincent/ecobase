import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { performanceIndicators, projectsData } from "@/data/mockData";
import { TrendingUp, Calendar, User, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Performance = () => {
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
            <TabsList className="grid w-full md:w-auto grid-cols-2 mb-6">
              <TabsTrigger value="administration">Administration Générale</TabsTrigger>
              <TabsTrigger value="integration">Intégration Africaine</TabsTrigger>
            </TabsList>

            <TabsContent value="administration" className="space-y-6">
              {performanceIndicators.administration.map((section, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">{section.objectif}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Indicateur</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Référence</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">2022</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">2023</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">2024</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.indicateurs.map((ind, i) => (
                          <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 text-sm text-foreground">{ind.nom}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium">{ind.reference}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium text-primary">{ind.cible2022}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium text-primary">{ind.cible2023}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium text-secondary">{ind.cible2024}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              {performanceIndicators.integrationAfricaine.map((section, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">{section.objectif}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Indicateur</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Référence</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">2022</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">2023</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">2024</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.indicateurs.map((ind, i) => (
                          <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 text-sm text-foreground">{ind.nom}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium">{ind.reference}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium text-primary">{ind.cible2022}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium text-primary">{ind.cible2023}</td>
                            <td className="text-center py-3 px-4 text-sm font-medium text-secondary">{ind.cible2024}</td>
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
    </div>
  );
};

export default Performance;
