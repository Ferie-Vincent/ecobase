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
import YearSelectorAdmin from "@/components/admin/YearSelectorAdmin";

interface StatistiqueDashboard {
  id: string;
  nom: string;
  unite: string;
  tendance: string;
  categorie: "Intégration" | "Diaspora" | "Circulation";
  valeurs: Record<string, string>;
}

interface DonneeCommerce {
  annee: string;
  exportations: string;
  importations: string;
  intraAfrique: string;
}

interface DocumentTelecharge {
  id: string;
  nom: string;
  description: string;
  lien: string;
}

export default function PageAccueil() {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState("2024");
  
  const [formData, setFormData] = useState({
    titre: "ECOBASE",
    sousTitre: "Plateforme de données pour le suivi et l'évaluation des politiques publiques",
    description: "ECOBASE est la base de données officielle du Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur.",
    missionIntegration: "Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA",
    missionDiaspora: "Accompagner et coordonner les initiatives visant le regroupement et l'organisation des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences"
  });

  const [statsData, setStatsData] = useState<StatistiqueDashboard[]>([
    { id: "1", nom: "Entreprises SLEC", unite: "entreprises", tendance: "+18", categorie: "Intégration", valeurs: { "2022": "227", "2023": "245", "2024": "342" } },
    { id: "2", nom: "Ivoiriens Réinsérés", unite: "personnes", tendance: "+456", categorie: "Diaspora", valeurs: { "2022": "890", "2023": "1024", "2024": "1247" } },
    { id: "3", nom: "Transferts d'argent / PIB", unite: "%", tendance: "+0.6%", categorie: "Diaspora", valeurs: { "2022": "7.9", "2023": "8.4", "2024": "9.2" } },
    { id: "4", nom: "Trafic Routier CEDEAO", unite: "M voyageurs", tendance: "+234K", categorie: "Circulation", valeurs: { "2022": "3.2", "2023": "3.5", "2024": "3.9" } }
  ]);

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

  const handleSave = () => {
    toast({ title: "Modifications enregistrées", description: `Les données pour ${selectedYear} ont été mises à jour.` });
  };

  const addStat = () => {
    const newStat: StatistiqueDashboard = {
      id: Date.now().toString(),
      nom: "Nouvelle statistique",
      unite: "",
      tendance: "",
      categorie: "Intégration",
      valeurs: { "2022": "", "2023": "", "2024": "" }
    };
    setStatsData([...statsData, newStat]);
  };

  const removeStat = (id: string) => setStatsData(statsData.filter(stat => stat.id !== id));

  const updateStat = (id: string, field: string, value: string) => {
    setStatsData(statsData.map(stat => {
      if (stat.id !== id) return stat;
      if (field === "valeur") return { ...stat, valeurs: { ...stat.valeurs, [selectedYear]: value } };
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
        <YearSelectorAdmin selectedYear={selectedYear} onYearChange={setSelectedYear} />
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="hero">Contenu Hero</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="documents">Documents à télécharger</TabsTrigger>
          <TabsTrigger value="stats">Statistiques Clés</TabsTrigger>
          <TabsTrigger value="commerce">Données Commerce</TabsTrigger>
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
                      <TableCell><Input value={stat.valeurs[selectedYear] || ""} onChange={(e) => updateStat(stat.id, "valeur", e.target.value)} className="w-24" /></TableCell>
                      <TableCell><Input value={stat.unite} onChange={(e) => updateStat(stat.id, "unite", e.target.value)} placeholder="%, personnes..." className="w-28" /></TableCell>
                      <TableCell><Input value={stat.tendance} onChange={(e) => updateStat(stat.id, "tendance", e.target.value)} placeholder="+18, -5..." className="w-24" /></TableCell>
                      <TableCell>
                        <select value={stat.categorie} onChange={(e) => updateStat(stat.id, "categorie", e.target.value)} className="w-full px-3 py-2 border rounded-md bg-background">
                          <option value="Intégration">Intégration</option>
                          <option value="Diaspora">Diaspora</option>
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
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Enregistrer les modifications</Button>
      </div>
    </div>
  );
}
