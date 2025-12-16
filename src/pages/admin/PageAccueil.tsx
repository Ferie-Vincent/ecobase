import { useState, useEffect } from "react";
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
import { useData, PilierStrategique, DashboardStat } from "@/contexts/DataContext";
import { indicators } from "@/data/indicators";

interface DonneeCommerce {
  annee: string;
  exportations: string;
  importations: string;
  intraAfrique: string;
}

interface PoidsRegional {
  id: string;
  nom: string;
  pibUEMOA: string;
  pibCEDEAO: string;
  pibAfrica: string;
  exportsCEDEAO: string;
  popCEDEAO: string;
}

interface DocumentTelecharge {
  id: string;
  nom: string;
  description: string;
  lien: string;
}

export default function PageAccueil() {
  const { toast } = useToast();
  const { 
    piliers: contextPiliers, 
    updatePiliers, 
    dashboardStatsByYear, 
    updateDashboardStats,
    availableYears: contextYears,
    addYear,
    removeYear
  } = useData();
  const [availableYears, setAvailableYears] = useState(contextYears);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [localPiliers, setLocalPiliers] = useState<PilierStrategique[]>(contextPiliers);
  const [statsData, setStatsData] = useState<DashboardStat[]>(dashboardStatsByYear[selectedYear] || []);
  
  // Sync with context
  useEffect(() => {
    setLocalPiliers(contextPiliers);
  }, [contextPiliers]);
  
  useEffect(() => {
    setStatsData(dashboardStatsByYear[selectedYear] || []);
  }, [selectedYear, dashboardStatsByYear]);
  
  useEffect(() => {
    setAvailableYears(contextYears);
  }, [contextYears]);
  
  const [formData, setFormData] = useState({
    titre: "ECOBASE",
    sousTitre: "Plateforme de données pour le suivi et l'évaluation des politiques publiques",
    description: "ECOBASE est la base de données officielle du Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur.",
    missionIntegration: "Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA",
    missionDiaspora: "Accompagner et coordonner les initiatives visant le regroupement et l'organisation des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences"
  });

  const [commerceData, setCommerceData] = useState<DonneeCommerce[]>([
    { annee: "2020", exportations: "28.4", importations: "31.2", intraAfrique: "15.2" },
    { annee: "2021", exportations: "32.1", importations: "34.8", intraAfrique: "17.8" },
    { annee: "2022", exportations: "38.5", importations: "39.2", intraAfrique: "21.4" },
    { annee: "2023", exportations: "42.3", importations: "41.6", intraAfrique: "24.7" },
    { annee: "2024", exportations: "48.9", importations: "45.3", intraAfrique: "28.3" }
  ]);

  const [documentsTelecharge, setDocumentsTelecharge] = useState<DocumentTelecharge[]>([
    { id: "1", nom: "Le Décret", description: "Fichier PDF", lien: "#" },
    { id: "2", nom: "Organigramme", description: "À télécharger", lien: "#" },
    { id: "3", nom: "Structure organisationnelle", description: "Cabinet, DGPI, DGIE, SPSE", lien: "#" }
  ]);

  const [poidsRegionaux, setPoidsRegionaux] = useState<PoidsRegional>({
    id: "1",
    nom: "Poids de la Côte d'Ivoire",
    pibUEMOA: "40.2",
    pibCEDEAO: "15.8",
    pibAfrica: "2.1",
    exportsCEDEAO: "28.5",
    popCEDEAO: "8.2"
  });

  const handleSave = () => {
    updatePiliers(localPiliers);
    updateDashboardStats(selectedYear, statsData);
    toast({ title: "Modifications enregistrées", description: `Les données pour ${selectedYear} ont été mises à jour.` });
  };

  const addStat = () => {
    const newStat: DashboardStat = {
      id: Date.now().toString(),
      nom: "Nouvelle statistique",
      valeur: "",
      unite: "",
      tendance: "",
      categorie: "Intégration"
    };
    setStatsData([...statsData, newStat]);
  };

  const removeStat = (id: string) => setStatsData(statsData.filter(stat => stat.id !== id));

  const updateStat = (id: string, field: string, value: string) => {
    setStatsData(statsData.map(stat => {
      if (stat.id !== id) return stat;
      return { ...stat, [field]: value };
    }));
  };

  const addCommerceYear = () => {
    const newYear: DonneeCommerce = { annee: new Date().getFullYear().toString(), exportations: "", importations: "", intraAfrique: "" };
    setCommerceData([...commerceData, newYear]);
  };

  const removeCommerceYear = (index: number) => setCommerceData(commerceData.filter((_, i) => i !== index));

  const updateCommerceData = (index: number, field: keyof DonneeCommerce, value: string) => {
    const newData = [...commerceData];
    (newData[index] as any)[field] = value;
    setCommerceData(newData);
  };

  const addDocument = () => {
    const newDoc: DocumentTelecharge = { id: Date.now().toString(), nom: "Nouveau document", description: "Description", lien: "#" };
    setDocumentsTelecharge([...documentsTelecharge, newDoc]);
  };

  const removeDocument = (id: string) => setDocumentsTelecharge(documentsTelecharge.filter(doc => doc.id !== id));

  const updateDocument = (id: string, field: keyof DocumentTelecharge, value: string) => {
    setDocumentsTelecharge(documentsTelecharge.map(doc => doc.id === id ? { ...doc, [field]: value } : doc));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion Page d'Accueil & Dashboard</h1>
          <p className="text-muted-foreground">Gérez le contenu de la page d'accueil et les données du tableau de bord</p>
        </div>
        <YearSelectorAdmin selectedYear={selectedYear} onYearChange={setSelectedYear} years={availableYears} onYearsChange={setAvailableYears} />
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="hero">Contenu Hero</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="piliers">Piliers Stratégiques</TabsTrigger>
          <TabsTrigger value="poids">Poids Régionaux</TabsTrigger>
          <TabsTrigger value="commerce">Commerce</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Section Hero</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="titre">Titre principal</Label>
                <Input id="titre" value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="sousTitre">Sous-titre</Label>
                <Input id="sousTitre" value={formData.sousTitre} onChange={(e) => setFormData({ ...formData, sousTitre: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Section Missions</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="missionIntegration">Mission Intégration Africaine</Label>
                <Textarea id="missionIntegration" rows={3} value={formData.missionIntegration} onChange={(e) => setFormData({ ...formData, missionIntegration: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="missionDiaspora">Mission Ivoiriens de l'Extérieur</Label>
                <Textarea id="missionDiaspora" rows={3} value={formData.missionDiaspora} onChange={(e) => setFormData({ ...formData, missionDiaspora: e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents à télécharger</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Liens affichés dans l'accordéon de la page d'accueil</p>
              </div>
              <Button onClick={addDocument} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du document</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Lien</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentsTelecharge.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell><Input value={doc.nom} onChange={(e) => updateDocument(doc.id, "nom", e.target.value)} /></TableCell>
                      <TableCell><Input value={doc.description} onChange={(e) => updateDocument(doc.id, "description", e.target.value)} /></TableCell>
                      <TableCell><Input value={doc.lien} onChange={(e) => updateDocument(doc.id, "lien", e.target.value)} placeholder="/documents/fichier.pdf" /></TableCell>
                      <TableCell><Button onClick={() => removeDocument(doc.id)} variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Statistiques Clés du Dashboard - {selectedYear}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Modifiez les valeurs pour l'année {selectedYear}</p>
              </div>
              <Button onClick={addStat} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Valeur ({selectedYear})</TableHead>
                    <TableHead>Unité</TableHead>
                    <TableHead>Tendance</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statsData.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell><Input value={stat.nom} onChange={(e) => updateStat(stat.id, "nom", e.target.value)} /></TableCell>
                      <TableCell><Input value={stat.valeur} onChange={(e) => updateStat(stat.id, "valeur", e.target.value)} className="w-24" /></TableCell>
                      <TableCell><Input value={stat.unite} onChange={(e) => updateStat(stat.id, "unite", e.target.value)} placeholder="%, personnes..." className="w-28" /></TableCell>
                      <TableCell><Input value={stat.tendance} onChange={(e) => updateStat(stat.id, "tendance", e.target.value)} placeholder="+18, -5..." className="w-24" /></TableCell>
                      <TableCell>
                        <select value={stat.categorie} onChange={(e) => updateStat(stat.id, "categorie", e.target.value)} className="w-full px-3 py-2 border rounded-md bg-background">
                          <option value="Intégration">Intégration</option>
                          <option value="Ivoiriens Extérieur">Ivoiriens Extérieur</option>
                          <option value="Circulation">Circulation</option>
                        </select>
                      </TableCell>
                      <TableCell><Button onClick={() => removeStat(stat.id)} variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commerce" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Évolution du Commerce (Milliards FCFA)</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Données utilisées dans les graphiques de commerce</p>
              </div>
              <Button onClick={addCommerceYear} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter Année</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Année</TableHead>
                    <TableHead>Exportations</TableHead>
                    <TableHead>Importations</TableHead>
                    <TableHead>Intra-Afrique</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commerceData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell><Input value={data.annee} onChange={(e) => updateCommerceData(index, "annee", e.target.value)} type="number" className="w-24" /></TableCell>
                      <TableCell><Input value={data.exportations} onChange={(e) => updateCommerceData(index, "exportations", e.target.value)} className="w-24" /></TableCell>
                      <TableCell><Input value={data.importations} onChange={(e) => updateCommerceData(index, "importations", e.target.value)} className="w-24" /></TableCell>
                      <TableCell><Input value={data.intraAfrique} onChange={(e) => updateCommerceData(index, "intraAfrique", e.target.value)} className="w-24" /></TableCell>
                      <TableCell><Button onClick={() => removeCommerceYear(index)} variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="piliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Piliers Stratégiques</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Les trois piliers affichés sur la page d'accueil. Le nombre d'indicateurs est calculé automatiquement.</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Indicateurs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localPiliers.map((pilier) => {
                    const indicatorCount = indicators.filter(i => i.pillar === pilier.code).length;
                    return (
                      <TableRow key={pilier.id}>
                        <TableCell><Input value={pilier.code} onChange={(e) => setLocalPiliers(localPiliers.map(p => p.id === pilier.id ? { ...p, code: e.target.value } : p))} className="w-20" /></TableCell>
                        <TableCell><Input value={pilier.titre} onChange={(e) => setLocalPiliers(localPiliers.map(p => p.id === pilier.id ? { ...p, titre: e.target.value } : p))} /></TableCell>
                        <TableCell><Input value={pilier.description} onChange={(e) => setLocalPiliers(localPiliers.map(p => p.id === pilier.id ? { ...p, description: e.target.value } : p))} /></TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {indicatorCount} indicateurs
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="poids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Poids de la Côte d'Ivoire dans les Régions</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Pourcentages affichés dans les graphiques de la page d'accueil</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">PIB Régional (%)</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>UEMOA</Label>
                      <Input value={poidsRegionaux.pibUEMOA} onChange={(e) => setPoidsRegionaux({ ...poidsRegionaux, pibUEMOA: e.target.value })} />
                    </div>
                    <div>
                      <Label>CEDEAO</Label>
                      <Input value={poidsRegionaux.pibCEDEAO} onChange={(e) => setPoidsRegionaux({ ...poidsRegionaux, pibCEDEAO: e.target.value })} />
                    </div>
                    <div>
                      <Label>Afrique</Label>
                      <Input value={poidsRegionaux.pibAfrica} onChange={(e) => setPoidsRegionaux({ ...poidsRegionaux, pibAfrica: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Autres indicateurs (%)</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Exportations CEDEAO</Label>
                      <Input value={poidsRegionaux.exportsCEDEAO} onChange={(e) => setPoidsRegionaux({ ...poidsRegionaux, exportsCEDEAO: e.target.value })} />
                    </div>
                    <div>
                      <Label>Population CEDEAO</Label>
                      <Input value={poidsRegionaux.popCEDEAO} onChange={(e) => setPoidsRegionaux({ ...poidsRegionaux, popCEDEAO: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Enregistrer les modifications</Button>
      </div>
    </div>
  );
}
