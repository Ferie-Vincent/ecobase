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
import { useData, Indicator, SlecDetails, ContentSection } from "@/contexts/DataContext";

export default function PageIntegration() {
  const { toast } = useToast();
  const { 
    integrationIndicatorsByYear, 
    slecDetailsByYear, 
    availableYears,
    updateIntegrationIndicators,
    updateSlecDetails,
    addYear,
    removeYear
  } = useData();
  
  const [localYears, setLocalYears] = useState(availableYears);
  const [selectedYear, setSelectedYear] = useState(localYears[0] || "2024");
  
  // État local pour édition
  const currentIndicators = integrationIndicatorsByYear[selectedYear] || [];
  const [editingIndicators, setEditingIndicators] = useState<Indicator[]>(currentIndicators);
  
  const currentSlec = slecDetailsByYear[selectedYear] || {
    entreprisesAgreees: 0,
    entreprisesActives: 0,
    tauxActivite: 0,
    produitsAgrees: 0,
    volumeExports: 0,
    partSleIntraRegional: 0
  };
  const [editingSlec, setEditingSlec] = useState<SlecDetails>(currentSlec);
  
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    { id: "1", titre: "Objectifs de l'intégration africaine", contenu: "Promouvoir l'intégration régionale et continentale à travers le renforcement de la coopération économique, politique et sociale." },
    { id: "2", titre: "Programmes en cours", contenu: "Description des programmes et initiatives en matière d'intégration africaine." }
  ]);

  // Synchroniser quand l'année change
  useMemo(() => {
    setEditingIndicators(integrationIndicatorsByYear[selectedYear] || []);
    setEditingSlec(slecDetailsByYear[selectedYear] || currentSlec);
  }, [selectedYear, integrationIndicatorsByYear, slecDetailsByYear]);

  const handleSave = () => {
    // Sauvegarder les indicateurs dans le contexte partagé
    updateIntegrationIndicators(selectedYear, editingIndicators);
    updateSlecDetails(selectedYear, editingSlec);
    
    toast({
      title: "Modifications enregistrées",
      description: `Les données de l'année ${selectedYear} ont été mises à jour et sont maintenant visibles dans le frontoffice.`,
    });
  };

  const handleYearsChange = (newYears: string[]) => {
    setLocalYears(newYears);
    // Synchroniser avec le contexte
    newYears.forEach(y => {
      if (!availableYears.includes(y)) addYear(y);
    });
    availableYears.forEach(y => {
      if (!newYears.includes(y)) removeYear(y);
    });
  };

  const updateSlecField = (field: keyof SlecDetails, value: string) => {
    setEditingSlec(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const addIndicator = () => {
    const newIndicator: Indicator = {
      name: "Nouvel indicateur",
      value: 0,
      unit: "",
      trend: "+0%",
      category: "Commerce"
    };
    setEditingIndicators([...editingIndicators, newIndicator]);
  };

  const removeIndicator = (index: number) => {
    setEditingIndicators(editingIndicators.filter((_, i) => i !== index));
  };

  const updateIndicator = (index: number, field: keyof Indicator, value: string | number) => {
    setEditingIndicators(editingIndicators.map((ind, i) => {
      if (i !== index) return ind;
      if (field === "value") {
        return { ...ind, [field]: parseFloat(value as string) || 0 };
      }
      return { ...ind, [field]: value };
    }));
  };

  const addContentSection = () => {
    const newSection: ContentSection = { id: Date.now().toString(), titre: "Nouvelle section", contenu: "" };
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
          <p className="text-muted-foreground">Gérez les indicateurs d'intégration et les données SLEC - Les modifications seront visibles dans le frontoffice</p>
        </div>
        <YearSelectorAdmin selectedYear={selectedYear} onYearChange={setSelectedYear} years={localYears} onYearsChange={handleYearsChange} />
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
                    <TableHead>Tendance</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editingIndicators.map((indicator, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input value={indicator.name} onChange={(e) => updateIndicator(index, "name", e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <select
                          value={indicator.category}
                          onChange={(e) => updateIndicator(index, "category", e.target.value)}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="Commerce">Commerce</option>
                          <option value="Social">Social</option>
                          <option value="CILSS">CILSS</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input value={indicator.unit} onChange={(e) => updateIndicator(index, "unit", e.target.value)} placeholder="%, Mds FCFA..." className="w-28" />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          step="0.01"
                          value={indicator.value} 
                          onChange={(e) => updateIndicator(index, "value", e.target.value)} 
                          className="w-28" 
                        />
                      </TableCell>
                      <TableCell>
                        <Input value={indicator.trend} onChange={(e) => updateIndicator(index, "trend", e.target.value)} placeholder="+3.2%" className="w-24" />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => removeIndicator(index)} variant="ghost" size="sm">
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
                      <Input value={editingSlec.entreprisesAgreees} onChange={(e) => updateSlecField("entreprisesAgreees", e.target.value)} type="number" />
                    </div>
                    <div>
                      <Label>Actives</Label>
                      <Input value={editingSlec.entreprisesActives} onChange={(e) => updateSlecField("entreprisesActives", e.target.value)} type="number" />
                    </div>
                    <div>
                      <Label>Taux d'activité (%)</Label>
                      <Input value={editingSlec.tauxActivite} onChange={(e) => updateSlecField("tauxActivite", e.target.value)} type="number" step="0.1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Performance Commerciale</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Produits agréés</Label>
                      <Input value={editingSlec.produitsAgrees} onChange={(e) => updateSlecField("produitsAgrees", e.target.value)} type="number" />
                    </div>
                    <div>
                      <Label>Volume exports (Mds FCFA)</Label>
                      <Input value={editingSlec.volumeExports} onChange={(e) => updateSlecField("volumeExports", e.target.value)} type="number" step="0.1" />
                    </div>
                    <div>
                      <Label>Part SLE/Intra-régional (%)</Label>
                      <Input value={editingSlec.partSleIntraRegional} onChange={(e) => updateSlecField("partSleIntraRegional", e.target.value)} type="number" step="0.1" />
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
