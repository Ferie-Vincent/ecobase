import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import YearSelectorAdmin from "@/components/admin/YearSelectorAdmin";

interface CirculationIndicator {
  id: string;
  nom: string;
  categorie: "Population" | "Transport";
  unite: string;
  valeurs: Record<string, string>;
}

interface StudentRegionData {
  id: string;
  region: string;
  valeurs: Record<string, { total: string; economie: string; droit: string; culture: string; autres: string }>;
}

interface TransportMode {
  id: string;
  mode: string;
  valeurs: Record<string, string>;
}

export default function PageCirculation() {
  const { toast } = useToast();
  const [availableYears, setAvailableYears] = useState(["2024", "2023", "2022"]);
  const [selectedYear, setSelectedYear] = useState("2024");
  
  const [indicators, setIndicators] = useState<CirculationIndicator[]>([
    { id: "1", nom: "Ressortissants africains en CI", categorie: "Population", unite: "% population", valeurs: { "2022": "27.2", "2023": "28.5", "2024": "29.7" } },
    { id: "2", nom: "Trafic ferroviaire UEMOA", categorie: "Transport", unite: "voyageurs", valeurs: { "2022": "135000", "2023": "145000", "2024": "156000" } },
    { id: "3", nom: "Voyageurs aériens UEMOA", categorie: "Transport", unite: "voyageurs", valeurs: { "2022": "318000", "2023": "342000", "2024": "368000" } },
    { id: "4", nom: "Voyageurs aériens CEDEAO", categorie: "Transport", unite: "voyageurs", valeurs: { "2022": "548000", "2023": "589000", "2024": "634000" } },
    { id: "5", nom: "Trafic routier UEMOA", categorie: "Transport", unite: "voyageurs", valeurs: { "2022": "2190000", "2023": "2340000", "2024": "2520000" } },
    { id: "6", nom: "Trafic routier CEDEAO", categorie: "Transport", unite: "voyageurs", valeurs: { "2022": "3210000", "2023": "3450000", "2024": "3720000" } }
  ]);

  const [studentRegionData, setStudentRegionData] = useState<StudentRegionData[]>([
    { id: "1", region: "UEMOA", valeurs: { "2022": { total: "42000", economie: "11000", droit: "14000", culture: "8000", autres: "9000" }, "2023": { total: "44000", economie: "11800", droit: "14800", culture: "8400", autres: "9000" }, "2024": { total: "45600", economie: "12300", droit: "15400", culture: "8900", autres: "9000" } } },
    { id: "2", region: "CEDEAO", valeurs: { "2022": { total: "62000", economie: "17000", droit: "20000", culture: "11000", autres: "14000" }, "2023": { total: "65000", economie: "18000", droit: "21200", culture: "11700", autres: "14100" }, "2024": { total: "67800", economie: "18900", droit: "22400", culture: "12300", autres: "14200" } } },
    { id: "3", region: "UFM", valeurs: { "2022": { total: "7500", economie: "2000", droit: "2900", culture: "1500", autres: "1100" }, "2023": { total: "8200", economie: "2150", droit: "3150", culture: "1650", autres: "1250" }, "2024": { total: "8900", economie: "2300", droit: "3400", culture: "1800", autres: "1400" } } }
  ]);

  const [transportModes, setTransportModes] = useState<TransportMode[]>([
    { id: "1", mode: "Routier UEMOA", valeurs: { "2022": "2190000", "2023": "2340000", "2024": "2520000" } },
    { id: "2", mode: "Routier CEDEAO", valeurs: { "2022": "3210000", "2023": "3450000", "2024": "3720000" } },
    { id: "3", mode: "Aérien UEMOA", valeurs: { "2022": "318000", "2023": "342000", "2024": "368000" } },
    { id: "4", mode: "Aérien CEDEAO", valeurs: { "2022": "548000", "2023": "589000", "2024": "634000" } },
    { id: "5", mode: "Ferroviaire", valeurs: { "2022": "135000", "2023": "145000", "2024": "156000" } }
  ]);

  const handleSave = () => {
    toast({ title: "Modifications enregistrées", description: `Les données de l'année ${selectedYear} ont été mises à jour.` });
  };

  const addIndicator = () => {
    const newIndicator: CirculationIndicator = {
      id: Date.now().toString(),
      nom: "Nouvel indicateur",
      categorie: "Population",
      unite: "",
      valeurs: { "2022": "", "2023": "", "2024": "" }
    };
    setIndicators([...indicators, newIndicator]);
  };

  const removeIndicator = (id: string) => setIndicators(indicators.filter(ind => ind.id !== id));

  const updateIndicator = (id: string, field: keyof CirculationIndicator | "valeur", value: string) => {
    setIndicators(indicators.map(ind => {
      if (ind.id !== id) return ind;
      if (field === "valeur") return { ...ind, valeurs: { ...ind.valeurs, [selectedYear]: value } };
      return { ...ind, [field]: value };
    }));
  };

  const addStudentRegion = () => {
    const newData: StudentRegionData = {
      id: Date.now().toString(),
      region: "Nouvelle région",
      valeurs: { "2022": { total: "0", economie: "0", droit: "0", culture: "0", autres: "0" }, "2023": { total: "0", economie: "0", droit: "0", culture: "0", autres: "0" }, "2024": { total: "0", economie: "0", droit: "0", culture: "0", autres: "0" } }
    };
    setStudentRegionData([...studentRegionData, newData]);
  };

  const removeStudentRegion = (id: string) => setStudentRegionData(studentRegionData.filter(d => d.id !== id));

  const updateStudentRegion = (id: string, field: string, value: string) => {
    setStudentRegionData(studentRegionData.map(d => {
      if (d.id !== id) return d;
      if (field === "region") return { ...d, region: value };
      const currentValues = d.valeurs[selectedYear] || { total: "0", economie: "0", droit: "0", culture: "0", autres: "0" };
      return { ...d, valeurs: { ...d.valeurs, [selectedYear]: { ...currentValues, [field]: value } } };
    }));
  };

  const addTransportMode = () => {
    const newData: TransportMode = { id: Date.now().toString(), mode: "Nouveau mode", valeurs: { "2022": "0", "2023": "0", "2024": "0" } };
    setTransportModes([...transportModes, newData]);
  };

  const removeTransportMode = (id: string) => setTransportModes(transportModes.filter(d => d.id !== id));

  const updateTransportMode = (id: string, field: string, value: string) => {
    setTransportModes(transportModes.map(d => {
      if (d.id !== id) return d;
      if (field === "mode") return { ...d, mode: value };
      return { ...d, valeurs: { ...d.valeurs, [selectedYear]: value } };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Libre Circulation</h1>
          <p className="text-muted-foreground">Gérez les indicateurs de circulation et mobilité régionale</p>
        </div>
        <YearSelectorAdmin selectedYear={selectedYear} onYearChange={setSelectedYear} years={availableYears} onYearsChange={setAvailableYears} />
      </div>

      <Tabs defaultValue="indicateurs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="indicateurs">Indicateurs de Circulation</TabsTrigger>
          <TabsTrigger value="etudiants">Étudiants par Région</TabsTrigger>
          <TabsTrigger value="transport">Modes de Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="indicateurs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Indicateurs de Circulation - {selectedYear}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Modifiez les valeurs pour l'année {selectedYear}</p>
              </div>
              <Button onClick={addIndicator} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />Ajouter
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
                      <TableCell><Input value={indicator.nom} onChange={(e) => updateIndicator(indicator.id, "nom", e.target.value)} /></TableCell>
                      <TableCell>
                        <select value={indicator.categorie} onChange={(e) => updateIndicator(indicator.id, "categorie", e.target.value)} className="w-full px-3 py-2 border rounded-md bg-background">
                          <option value="Population">Population</option>
                          <option value="Transport">Transport</option>
                        </select>
                      </TableCell>
                      <TableCell><Input value={indicator.unite} onChange={(e) => updateIndicator(indicator.id, "unite", e.target.value)} placeholder="%, voyageurs..." className="w-28" /></TableCell>
                      <TableCell><Input value={indicator.valeurs[selectedYear] || ""} onChange={(e) => updateIndicator(indicator.id, "valeur", e.target.value)} className="w-28" /></TableCell>
                      <TableCell><Button onClick={() => removeIndicator(indicator.id)} variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="etudiants" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Étudiants Étrangers par Région - {selectedYear}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Données pour l'année {selectedYear}</p>
              </div>
              <Button onClick={addStudentRegion} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
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
                  {studentRegionData.map((data) => {
                    const yearData = data.valeurs[selectedYear] || { total: "0", economie: "0", droit: "0", culture: "0", autres: "0" };
                    return (
                      <TableRow key={data.id}>
                        <TableCell><Input value={data.region} onChange={(e) => updateStudentRegion(data.id, "region", e.target.value)} /></TableCell>
                        <TableCell><Input value={yearData.total} onChange={(e) => updateStudentRegion(data.id, "total", e.target.value)} type="number" className="w-24" /></TableCell>
                        <TableCell><Input value={yearData.economie} onChange={(e) => updateStudentRegion(data.id, "economie", e.target.value)} type="number" className="w-20" /></TableCell>
                        <TableCell><Input value={yearData.droit} onChange={(e) => updateStudentRegion(data.id, "droit", e.target.value)} type="number" className="w-20" /></TableCell>
                        <TableCell><Input value={yearData.culture} onChange={(e) => updateStudentRegion(data.id, "culture", e.target.value)} type="number" className="w-20" /></TableCell>
                        <TableCell><Input value={yearData.autres} onChange={(e) => updateStudentRegion(data.id, "autres", e.target.value)} type="number" className="w-20" /></TableCell>
                        <TableCell><Button onClick={() => removeStudentRegion(data.id)} variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Comparaison des Modes de Transport - {selectedYear}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Données pour l'année {selectedYear}</p>
              </div>
              <Button onClick={addTransportMode} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mode de Transport</TableHead>
                    <TableHead>Nombre de Voyageurs ({selectedYear})</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transportModes.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell><Input value={data.mode} onChange={(e) => updateTransportMode(data.id, "mode", e.target.value)} /></TableCell>
                      <TableCell><Input value={data.valeurs[selectedYear] || ""} onChange={(e) => updateTransportMode(data.id, "voyageurs", e.target.value)} type="number" /></TableCell>
                      <TableCell><Button onClick={() => removeTransportMode(data.id)} variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
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
