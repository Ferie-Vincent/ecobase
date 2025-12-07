import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface CirculationIndicator {
  id: string;
  nom: string;
  categorie: "Population" | "Transport";
  unite: string;
  annee2022: string;
  annee2023: string;
  annee2024: string;
}

interface StudentRegionData {
  id: string;
  region: string;
  total: string;
  economie: string;
  droit: string;
  culture: string;
  autres: string;
}

interface TransportMode {
  id: string;
  mode: string;
  voyageurs: string;
}

export default function PageCirculation() {
  const { toast } = useToast();
  
  // Indicateurs de circulation (alignés avec mockData)
  const [indicators, setIndicators] = useState<CirculationIndicator[]>([
    {
      id: "1",
      nom: "Ressortissants africains en CI",
      categorie: "Population",
      unite: "% population",
      annee2022: "27.2",
      annee2023: "28.5",
      annee2024: "29.7"
    },
    {
      id: "2",
      nom: "Trafic ferroviaire UEMOA",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "135000",
      annee2023: "145000",
      annee2024: "156000"
    },
    {
      id: "3",
      nom: "Voyageurs aériens UEMOA",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "318000",
      annee2023: "342000",
      annee2024: "368000"
    },
    {
      id: "4",
      nom: "Voyageurs aériens CEDEAO",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "548000",
      annee2023: "589000",
      annee2024: "634000"
    },
    {
      id: "5",
      nom: "Trafic routier UEMOA",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "2190000",
      annee2023: "2340000",
      annee2024: "2520000"
    },
    {
      id: "6",
      nom: "Trafic routier CEDEAO",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "3210000",
      annee2023: "3450000",
      annee2024: "3720000"
    }
  ]);

  // Étudiants par région (aligné avec studentsData dans mockData)
  const [studentRegionData, setStudentRegionData] = useState<StudentRegionData[]>([
    { id: "1", region: "UEMOA", total: "45600", economie: "12300", droit: "15400", culture: "8900", autres: "9000" },
    { id: "2", region: "CEDEAO", total: "67800", economie: "18900", droit: "22400", culture: "12300", autres: "14200" },
    { id: "3", region: "UFM", total: "8900", economie: "2300", droit: "3400", culture: "1800", autres: "1400" }
  ]);

  // Comparaison des modes de transport (aligné avec le graphique du front)
  const [transportModes, setTransportModes] = useState<TransportMode[]>([
    { id: "1", mode: "Routier UEMOA", voyageurs: "2340000" },
    { id: "2", mode: "Routier CEDEAO", voyageurs: "3450000" },
    { id: "3", mode: "Aérien UEMOA", voyageurs: "342000" },
    { id: "4", mode: "Aérien CEDEAO", voyageurs: "589000" },
    { id: "5", mode: "Ferroviaire", voyageurs: "145000" }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Les données de circulation ont été mises à jour.",
    });
  };

  // Fonctions pour les indicateurs
  const addIndicator = () => {
    const newIndicator: CirculationIndicator = {
      id: Date.now().toString(),
      nom: "Nouvel indicateur",
      categorie: "Population",
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

  const updateIndicator = (id: string, field: keyof CirculationIndicator, value: string) => {
    setIndicators(indicators.map(ind => 
      ind.id === id ? { ...ind, [field]: value } : ind
    ));
  };

  // Fonctions pour les étudiants par région
  const addStudentRegion = () => {
    const newData: StudentRegionData = {
      id: Date.now().toString(),
      region: "Nouvelle région",
      total: "0",
      economie: "0",
      droit: "0",
      culture: "0",
      autres: "0"
    };
    setStudentRegionData([...studentRegionData, newData]);
  };

  const removeStudentRegion = (id: string) => {
    setStudentRegionData(studentRegionData.filter(d => d.id !== id));
  };

  const updateStudentRegion = (id: string, field: keyof StudentRegionData, value: string) => {
    setStudentRegionData(studentRegionData.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  // Fonctions pour les modes de transport
  const addTransportMode = () => {
    const newData: TransportMode = {
      id: Date.now().toString(),
      mode: "Nouveau mode",
      voyageurs: "0"
    };
    setTransportModes([...transportModes, newData]);
  };

  const removeTransportMode = (id: string) => {
    setTransportModes(transportModes.filter(d => d.id !== id));
  };

  const updateTransportMode = (id: string, field: keyof TransportMode, value: string) => {
    setTransportModes(transportModes.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Libre Circulation</h1>
          <p className="text-muted-foreground">Gérez les indicateurs de circulation et mobilité régionale</p>
        </div>
      </div>

      <Tabs defaultValue="indicateurs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="indicateurs">Indicateurs de Circulation</TabsTrigger>
          <TabsTrigger value="etudiants">Étudiants par Région</TabsTrigger>
          <TabsTrigger value="transport">Modes de Transport</TabsTrigger>
        </TabsList>

        {/* Onglet Indicateurs */}
        <TabsContent value="indicateurs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Indicateurs de Circulation et Mobilité</CardTitle>
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
                          onChange={(e) => updateIndicator(indicator.id, "categorie", e.target.value as "Population" | "Transport")}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="Population">Population</option>
                          <option value="Transport">Transport</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.unite}
                          onChange={(e) => updateIndicator(indicator.id, "unite", e.target.value)}
                          placeholder="%, voyageurs..."
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

        {/* Onglet Étudiants par Région */}
        <TabsContent value="etudiants" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Étudiants Étrangers par Région</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Données affichées dans le graphique du front office
                </p>
              </div>
              <Button onClick={addStudentRegion} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Région</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Économie</TableHead>
                    <TableHead>Droit</TableHead>
                    <TableHead>Culture</TableHead>
                    <TableHead>Autres</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentRegionData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>
                        <Input
                          value={data.region}
                          onChange={(e) => updateStudentRegion(data.id, "region", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.total}
                          onChange={(e) => updateStudentRegion(data.id, "total", e.target.value)}
                          type="number"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.economie}
                          onChange={(e) => updateStudentRegion(data.id, "economie", e.target.value)}
                          type="number"
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.droit}
                          onChange={(e) => updateStudentRegion(data.id, "droit", e.target.value)}
                          type="number"
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.culture}
                          onChange={(e) => updateStudentRegion(data.id, "culture", e.target.value)}
                          type="number"
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.autres}
                          onChange={(e) => updateStudentRegion(data.id, "autres", e.target.value)}
                          type="number"
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => removeStudentRegion(data.id)}
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

        {/* Onglet Modes de Transport */}
        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Comparaison des Modes de Transport</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Données affichées dans le graphique comparatif du front office
                </p>
              </div>
              <Button onClick={addTransportMode} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mode de Transport</TableHead>
                    <TableHead>Nombre de Voyageurs</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transportModes.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>
                        <Input
                          value={data.mode}
                          onChange={(e) => updateTransportMode(data.id, "mode", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.voyageurs}
                          onChange={(e) => updateTransportMode(data.id, "voyageurs", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => removeTransportMode(data.id)}
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
