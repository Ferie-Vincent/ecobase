import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface IntegrationIndicator {
  id: string;
  nom: string;
  categorie: "Commerce" | "Social" | "CILSS";
  unite: string;
  annee2022: string;
  annee2023: string;
  annee2024: string;
}

interface SlecDetails {
  entreprisesAgreees: string;
  entreprisesActives: string;
  tauxActivite: string;
  produitsAgrees: string;
  volumeExports: string;
  partSleIntraRegional: string;
}

interface ContentSection {
  id: number;
  titre: string;
  contenu: string;
}

export default function PageIntegration() {
  const { toast } = useToast();
  
  // Indicateurs d'intégration (alignés avec mockData integrationIndicatorsByYear)
  const [indicators, setIndicators] = useState<IntegrationIndicator[]>([
    { id: "1", nom: "Résilience climatique", categorie: "CILSS", unite: "%", annee2022: "64.1", annee2023: "67.5", annee2024: "70.8" },
    { id: "2", nom: "Développement Capital Humain", categorie: "Social", unite: "indice", annee2022: "0.65", annee2023: "0.68", annee2024: "0.71" },
    { id: "3", nom: "Entreprises SLEC agréées", categorie: "Commerce", unite: "entreprises", annee2022: "227", annee2023: "245", annee2024: "268" },
    { id: "4", nom: "Produits SLEC agréés", categorie: "Commerce", unite: "produits", annee2022: "1707", annee2023: "1834", annee2024: "1978" },
    { id: "5", nom: "Exportations SLEC", categorie: "Commerce", unite: "Mds FCFA", annee2022: "41.3", annee2023: "45.6", annee2024: "51.2" },
    { id: "6", nom: "Part exportations SLE", categorie: "Commerce", unite: "%", annee2022: "31.1", annee2023: "34.2", annee2024: "37.6" }
  ]);

  // Détails SLEC (alignés avec la section détails du front Integration.tsx)
  const [slecDetails, setSlecDetails] = useState<SlecDetails>({
    entreprisesAgreees: "245",
    entreprisesActives: "189",
    tauxActivite: "77.1",
    produitsAgrees: "1834",
    volumeExports: "45.6",
    partSleIntraRegional: "34.2"
  });

  const [contentSections, setContentSections] = useState<ContentSection[]>([
    {
      id: 1,
      titre: "Objectifs de l'intégration africaine",
      contenu: "Promouvoir l'intégration régionale et continentale à travers le renforcement de la coopération économique, politique et sociale."
    },
    {
      id: 2,
      titre: "Programmes en cours",
      contenu: "Description des programmes et initiatives en matière d'intégration africaine."
    }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Le contenu de la page Intégration Africaine a été mis à jour.",
    });
  };

  // Fonctions pour les indicateurs
  const addIndicator = () => {
    const newIndicator: IntegrationIndicator = {
      id: Date.now().toString(),
      nom: "Nouvel indicateur",
      categorie: "Commerce",
      unite: "",
      annee2022: "",
      annee2023: "",
      annee2024: ""
    };
    setIndicators([...indicators, newIndicator]);
  };

  const removeIndicator = (id: string) => {
    setIndicators(indicators.filter(ind => ind.id !== id));
  };

  const updateIndicator = (id: string, field: keyof IntegrationIndicator, value: string) => {
    setIndicators(indicators.map(ind => 
      ind.id === id ? { ...ind, [field]: value } : ind
    ));
  };

  const addContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now(),
      titre: "Nouvelle section",
      contenu: ""
    };
    setContentSections([...contentSections, newSection]);
  };

  const removeContentSection = (index: number) => {
    const newSections = [...contentSections];
    newSections.splice(index, 1);
    setContentSections(newSections);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion - Intégration Africaine</h1>
        <p className="text-muted-foreground">Gérez les indicateurs d'intégration et les données SLEC</p>
      </div>

      <Tabs defaultValue="indicateurs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="indicateurs">Indicateurs</TabsTrigger>
          <TabsTrigger value="slec">Détails SLEC</TabsTrigger>
          <TabsTrigger value="contenu">Sections de Contenu</TabsTrigger>
        </TabsList>

        {/* Onglet Indicateurs */}
        <TabsContent value="indicateurs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Indicateurs d'Intégration</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Données affichées sur la page Intégration du front office
                </p>
              </div>
              <Button onClick={addIndicator} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de l'indicateur</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Unité</TableHead>
                    <TableHead>2022</TableHead>
                    <TableHead>2023</TableHead>
                    <TableHead>2024</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicators.map((indicator) => (
                    <TableRow key={indicator.id}>
                      <TableCell>
                        <Input
                          value={indicator.nom}
                          onChange={(e) => updateIndicator(indicator.id, "nom", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <select
                          value={indicator.categorie}
                          onChange={(e) => updateIndicator(indicator.id, "categorie", e.target.value as "Commerce" | "Social" | "CILSS")}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="Commerce">Commerce</option>
                          <option value="Social">Social</option>
                          <option value="CILSS">CILSS</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.unite}
                          onChange={(e) => updateIndicator(indicator.id, "unite", e.target.value)}
                          placeholder="%, Mds FCFA..."
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.annee2022}
                          onChange={(e) => updateIndicator(indicator.id, "annee2022", e.target.value)}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.annee2023}
                          onChange={(e) => updateIndicator(indicator.id, "annee2023", e.target.value)}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.annee2024}
                          onChange={(e) => updateIndicator(indicator.id, "annee2024", e.target.value)}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => removeIndicator(indicator.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Détails SLEC */}
        <TabsContent value="slec" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schéma de Libéralisation des Échanges de la CEDEAO (SLEC)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Données affichées dans la section détails du front office
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Entreprises Agréées */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Entreprises Agréées</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="entreprisesAgreees">Total agréées</Label>
                      <Input
                        id="entreprisesAgreees"
                        value={slecDetails.entreprisesAgreees}
                        onChange={(e) => setSlecDetails({ ...slecDetails, entreprisesAgreees: e.target.value })}
                        type="number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="entreprisesActives">Actives</Label>
                      <Input
                        id="entreprisesActives"
                        value={slecDetails.entreprisesActives}
                        onChange={(e) => setSlecDetails({ ...slecDetails, entreprisesActives: e.target.value })}
                        type="number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tauxActivite">Taux d'activité (%)</Label>
                      <Input
                        id="tauxActivite"
                        value={slecDetails.tauxActivite}
                        onChange={(e) => setSlecDetails({ ...slecDetails, tauxActivite: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Performance Commerciale */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Performance Commerciale</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="produitsAgrees">Produits agréés</Label>
                      <Input
                        id="produitsAgrees"
                        value={slecDetails.produitsAgrees}
                        onChange={(e) => setSlecDetails({ ...slecDetails, produitsAgrees: e.target.value })}
                        type="number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="volumeExports">Volume exports (Mds FCFA)</Label>
                      <Input
                        id="volumeExports"
                        value={slecDetails.volumeExports}
                        onChange={(e) => setSlecDetails({ ...slecDetails, volumeExports: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="partSleIntraRegional">Part SLE/Intra-régional (%)</Label>
                      <Input
                        id="partSleIntraRegional"
                        value={slecDetails.partSleIntraRegional}
                        onChange={(e) => setSlecDetails({ ...slecDetails, partSleIntraRegional: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Sections de Contenu */}
        <TabsContent value="contenu" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Sections de contenu</h2>
            <Button onClick={addContentSection} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une section
            </Button>
          </div>

          {contentSections.map((section, index) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Section {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeContentSection(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Titre de la section</Label>
                  <Input
                    value={section.titre}
                    onChange={(e) => {
                      const newSections = [...contentSections];
                      newSections[index].titre = e.target.value;
                      setContentSections(newSections);
                    }}
                  />
                </div>
                <div>
                  <Label>Contenu</Label>
                  <Textarea
                    rows={5}
                    value={section.contenu}
                    onChange={(e) => {
                      const newSections = [...contentSections];
                      newSections[index].contenu = e.target.value;
                      setContentSections(newSections);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
