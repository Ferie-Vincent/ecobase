import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import YearSelectorAdmin from "@/components/admin/YearSelectorAdmin";

interface IntegrationIndicator {
  id: string;
  nom: string;
  categorie: "Commerce" | "Social" | "CILSS";
  unite: string;
  valeurs: Record<string, string>; // { "2022": "64.1", "2023": "67.5", "2024": "70.8" }
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
  const [selectedYear, setSelectedYear] = useState("2024");
  
  // Indicateurs d'intégration avec valeurs par année
  const [indicators, setIndicators] = useState<IntegrationIndicator[]>([
    { id: "1", nom: "Résilience climatique", categorie: "CILSS", unite: "%", valeurs: { "2022": "64.1", "2023": "67.5", "2024": "70.8" } },
    { id: "2", nom: "Développement Capital Humain", categorie: "Social", unite: "indice", valeurs: { "2022": "0.65", "2023": "0.68", "2024": "0.71" } },
    { id: "3", nom: "Entreprises SLEC agréées", categorie: "Commerce", unite: "entreprises", valeurs: { "2022": "227", "2023": "245", "2024": "268" } },
    { id: "4", nom: "Produits SLEC agréés", categorie: "Commerce", unite: "produits", valeurs: { "2022": "1707", "2023": "1834", "2024": "1978" } },
    { id: "5", nom: "Exportations SLEC", categorie: "Commerce", unite: "Mds FCFA", valeurs: { "2022": "41.3", "2023": "45.6", "2024": "51.2" } },
    { id: "6", nom: "Part exportations SLE", categorie: "Commerce", unite: "%", valeurs: { "2022": "31.1", "2023": "34.2", "2024": "37.6" } }
  ]);

  // Détails SLEC par année
  const [slecDetailsByYear, setSlecDetailsByYear] = useState<Record<string, SlecDetails>>({
    "2022": { entreprisesAgreees: "227", entreprisesActives: "175", tauxActivite: "77.1", produitsAgrees: "1707", volumeExports: "41.3", partSleIntraRegional: "31.1" },
    "2023": { entreprisesAgreees: "245", entreprisesActives: "189", tauxActivite: "77.1", produitsAgrees: "1834", volumeExports: "45.6", partSleIntraRegional: "34.2" },
    "2024": { entreprisesAgreees: "268", entreprisesActives: "207", tauxActivite: "77.2", produitsAgrees: "1978", volumeExports: "51.2", partSleIntraRegional: "37.6" }
  });

  const slecDetails = useMemo(() => slecDetailsByYear[selectedYear] || slecDetailsByYear["2024"], [slecDetailsByYear, selectedYear]);

  const [contentSections, setContentSections] = useState<ContentSection[]>([
    { id: 1, titre: "Objectifs de l'intégration africaine", contenu: "Promouvoir l'intégration régionale et continentale à travers le renforcement de la coopération économique, politique et sociale." },
    { id: 2, titre: "Programmes en cours", contenu: "Description des programmes et initiatives en matière d'intégration africaine." }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: `Les données de l'année ${selectedYear} ont été mises à jour.`,
    });
  };

  const updateSlecDetails = (field: keyof SlecDetails, value: string) => {
    setSlecDetailsByYear({
      ...slecDetailsByYear,
      [selectedYear]: { ...slecDetails, [field]: value }
    });
  };

  const addIndicator = () => {
    const newIndicator: IntegrationIndicator = {
      id: Date.now().toString(),
      nom: "Nouvel indicateur",
      categorie: "Commerce",
      unite: "",
      valeurs: { "2022": "", "2023": "", "2024": "" }
    };
    setIndicators([...indicators, newIndicator]);
  };

  const removeIndicator = (id: string) => {
    setIndicators(indicators.filter(ind => ind.id !== id));
  };

  const updateIndicator = (id: string, field: keyof IntegrationIndicator | "valeur", value: string) => {
    setIndicators(indicators.map(ind => {
      if (ind.id !== id) return ind;
      if (field === "valeur") {
        return { ...ind, valeurs: { ...ind.valeurs, [selectedYear]: value } };
      }
      return { ...ind, [field]: value };
    }));
  };

  const addContentSection = () => {
    const newSection: ContentSection = { id: Date.now(), titre: "Nouvelle section", contenu: "" };
    setContentSections([...contentSections, newSection]);
  };

  const removeContentSection = (index: number) => {
    const newSections = [...contentSections];
    newSections.splice(index, 1);
    setContentSections(newSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Intégration Africaine</h1>
          <p className="text-muted-foreground">Gérez les indicateurs d'intégration et les données SLEC</p>
        </div>
        <YearSelectorAdmin selectedYear={selectedYear} onYearChange={setSelectedYear} />
      </div>

      <Tabs defaultValue="indicateurs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="indicateurs">Indicateurs</TabsTrigger>
          <TabsTrigger value="slec">Détails SLEC</TabsTrigger>
          <TabsTrigger value="contenu">Sections de Contenu</TabsTrigger>
        </TabsList>

        <TabsContent value="indicateurs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Indicateurs d'Intégration - {selectedYear}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Modifiez les valeurs pour l'année {selectedYear}</p>
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
                    <TableHead>Valeur {selectedYear}</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicators.map((indicator) => (
                    <TableRow key={indicator.id}>
                      <TableCell>
                        <Input value={indicator.nom} onChange={(e) => updateIndicator(indicator.id, "nom", e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <select
                          value={indicator.categorie}
                          onChange={(e) => updateIndicator(indicator.id, "categorie", e.target.value)}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="Commerce">Commerce</option>
                          <option value="Social">Social</option>
                          <option value="CILSS">CILSS</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input value={indicator.unite} onChange={(e) => updateIndicator(indicator.id, "unite", e.target.value)} placeholder="%, Mds FCFA..." className="w-28" />
                      </TableCell>
                      <TableCell>
                        <Input value={indicator.valeurs[selectedYear] || ""} onChange={(e) => updateIndicator(indicator.id, "valeur", e.target.value)} className="w-28" />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => removeIndicator(indicator.id)} variant="ghost" size="sm">
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

        <TabsContent value="slec" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schéma de Libéralisation des Échanges (SLEC) - {selectedYear}</CardTitle>
              <p className="text-sm text-muted-foreground">Données pour l'année {selectedYear}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Entreprises Agréées</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Total agréées</Label>
                      <Input value={slecDetails.entreprisesAgreees} onChange={(e) => updateSlecDetails("entreprisesAgreees", e.target.value)} type="number" />
                    </div>
                    <div>
                      <Label>Actives</Label>
                      <Input value={slecDetails.entreprisesActives} onChange={(e) => updateSlecDetails("entreprisesActives", e.target.value)} type="number" />
                    </div>
                    <div>
                      <Label>Taux d'activité (%)</Label>
                      <Input value={slecDetails.tauxActivite} onChange={(e) => updateSlecDetails("tauxActivite", e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Performance Commerciale</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Produits agréés</Label>
                      <Input value={slecDetails.produitsAgrees} onChange={(e) => updateSlecDetails("produitsAgrees", e.target.value)} type="number" />
                    </div>
                    <div>
                      <Label>Volume exports (Mds FCFA)</Label>
                      <Input value={slecDetails.volumeExports} onChange={(e) => updateSlecDetails("volumeExports", e.target.value)} />
                    </div>
                    <div>
                      <Label>Part SLE/Intra-régional (%)</Label>
                      <Input value={slecDetails.partSleIntraRegional} onChange={(e) => updateSlecDetails("partSleIntraRegional", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                  <Button variant="ghost" size="sm" onClick={() => removeContentSection(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Titre de la section</Label>
                  <Input value={section.titre} onChange={(e) => {
                    const newSections = [...contentSections];
                    newSections[index].titre = e.target.value;
                    setContentSections(newSections);
                  }} />
                </div>
                <div>
                  <Label>Contenu</Label>
                  <Textarea rows={5} value={section.contenu} onChange={(e) => {
                    const newSections = [...contentSections];
                    newSections[index].contenu = e.target.value;
                    setContentSections(newSections);
                  }} />
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
