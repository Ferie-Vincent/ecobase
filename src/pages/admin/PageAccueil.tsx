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

interface StatistiqueDashboard {
  id: string;
  nom: string;
  valeur: string;
  unite: string;
  tendance: string;
  categorie: "Intégration" | "Diaspora" | "Circulation";
}

interface DonneeCommerce {
  annee: string;
  exportations: string;
  importations: string;
}

export default function PageAccueil() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titre: "ECOBASE",
    sousTitre: "Plateforme de données pour le suivi et l'évaluation des politiques publiques",
    description: "ECOBASE est la base de données officielle du Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur.",
    missionIntegration: "Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA",
    missionDiaspora: "Accompagner et coordonner les initiatives visant le regroupement et l'organisation des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences"
  });

  const [statsData, setStatsData] = useState<StatistiqueDashboard[]>([
    {
      id: "1",
      nom: "Entreprises SLEC",
      valeur: "342",
      unite: "entreprises",
      tendance: "+18",
      categorie: "Intégration"
    },
    {
      id: "2",
      nom: "Ivoiriens Réinsérés",
      valeur: "1247",
      unite: "personnes",
      tendance: "+456",
      categorie: "Diaspora"
    },
    {
      id: "3",
      nom: "Transferts d'argent / PIB",
      valeur: "9.2",
      unite: "%",
      tendance: "+0.6%",
      categorie: "Diaspora"
    },
    {
      id: "4",
      nom: "Trafic Routier CEDEAO",
      valeur: "3.9",
      unite: "M voyageurs",
      tendance: "+234K",
      categorie: "Circulation"
    }
  ]);

  const [commerceData, setCommerceData] = useState<DonneeCommerce[]>([
    { annee: "2020", exportations: "6890", importations: "8234" },
    { annee: "2021", exportations: "7350", importations: "8920" },
    { annee: "2022", exportations: "8120", importations: "9450" },
    { annee: "2023", exportations: "8890", importations: "10120" },
    { annee: "2024", exportations: "9560", importations: "10890" }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Le contenu de la page d'accueil et du dashboard a été mis à jour.",
    });
  };

  const addStat = () => {
    const newStat: StatistiqueDashboard = {
      id: Date.now().toString(),
      nom: "Nouvelle statistique",
      valeur: "",
      unite: "",
      tendance: "",
      categorie: "Intégration"
    };
    setStatsData([...statsData, newStat]);
  };

  const removeStat = (id: string) => {
    setStatsData(statsData.filter(stat => stat.id !== id));
  };

  const updateStat = (id: string, field: keyof StatistiqueDashboard, value: string) => {
    setStatsData(statsData.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const addCommerceYear = () => {
    const newYear: DonneeCommerce = {
      annee: new Date().getFullYear().toString(),
      exportations: "",
      importations: ""
    };
    setCommerceData([...commerceData, newYear]);
  };

  const removeCommerceYear = (index: number) => {
    setCommerceData(commerceData.filter((_, i) => i !== index));
  };

  const updateCommerceData = (index: number, field: keyof DonneeCommerce, value: string) => {
    const newData = [...commerceData];
    (newData[index] as any)[field] = value;
    setCommerceData(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion Page d'Accueil & Dashboard</h1>
        <p className="text-muted-foreground">Gérez le contenu de la page d'accueil et les données du tableau de bord</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Contenu Hero</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="stats">Statistiques Clés</TabsTrigger>
          <TabsTrigger value="commerce">Données Commerce</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="titre">Titre principal</Label>
                <Input
                  id="titre"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sousTitre">Sous-titre</Label>
                <Input
                  id="sousTitre"
                  value={formData.sousTitre}
                  onChange={(e) => setFormData({ ...formData, sousTitre: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Missions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="missionIntegration">Mission Intégration Africaine</Label>
                <Textarea
                  id="missionIntegration"
                  rows={3}
                  value={formData.missionIntegration}
                  onChange={(e) => setFormData({ ...formData, missionIntegration: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="missionDiaspora">Mission Ivoiriens de l'Extérieur</Label>
                <Textarea
                  id="missionDiaspora"
                  rows={3}
                  value={formData.missionDiaspora}
                  onChange={(e) => setFormData({ ...formData, missionDiaspora: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Statistiques Clés du Dashboard</CardTitle>
              <Button onClick={addStat} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Unité</TableHead>
                    <TableHead>Tendance</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statsData.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell>
                        <Input
                          value={stat.nom}
                          onChange={(e) => updateStat(stat.id, "nom", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={stat.valeur}
                          onChange={(e) => updateStat(stat.id, "valeur", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={stat.unite}
                          onChange={(e) => updateStat(stat.id, "unite", e.target.value)}
                          placeholder="%, personnes..."
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={stat.tendance}
                          onChange={(e) => updateStat(stat.id, "tendance", e.target.value)}
                          placeholder="+18, -5..."
                        />
                      </TableCell>
                      <TableCell>
                        <select
                          value={stat.categorie}
                          onChange={(e) => updateStat(stat.id, "categorie", e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="Intégration">Intégration</option>
                          <option value="Diaspora">Diaspora</option>
                          <option value="Circulation">Circulation</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => removeStat(stat.id)}
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

        <TabsContent value="commerce" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Évolution du Commerce (Milliards FCFA)</CardTitle>
              <Button onClick={addCommerceYear} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Année
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Année</TableHead>
                    <TableHead>Exportations (Mds FCFA)</TableHead>
                    <TableHead>Importations (Mds FCFA)</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commerceData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          value={data.annee}
                          onChange={(e) => updateCommerceData(index, "annee", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.exportations}
                          onChange={(e) => updateCommerceData(index, "exportations", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.importations}
                          onChange={(e) => updateCommerceData(index, "importations", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => removeCommerceYear(index)}
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
