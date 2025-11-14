import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface StudentData {
  pays: string;
  etudiants2022: string;
  etudiants2023: string;
  etudiants2024: string;
}

export default function PageCirculation() {
  const { toast } = useToast();
  
  const [indicators, setIndicators] = useState<CirculationIndicator[]>([
    {
      id: "1",
      nom: "Ressortissants africains en CI",
      categorie: "Population",
      unite: "%",
      annee2022: "24.2",
      annee2023: "24.8",
      annee2024: "25.4"
    },
    {
      id: "2",
      nom: "Voyageurs aériens CEDEAO",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "1250000",
      annee2023: "1345000",
      annee2024: "1420000"
    },
    {
      id: "3",
      nom: "Trafic routier CEDEAO",
      categorie: "Transport",
      unite: "voyageurs",
      annee2022: "3200000",
      annee2023: "3580000",
      annee2024: "3920000"
    }
  ]);

  const [studentData, setStudentData] = useState<StudentData[]>([
    { pays: "Mali", etudiants2022: "1200", etudiants2023: "1350", etudiants2024: "1480" },
    { pays: "Burkina Faso", etudiants2022: "980", etudiants2023: "1120", etudiants2024: "1250" },
    { pays: "Niger", etudiants2022: "450", etudiants2023: "520", etudiants2024: "580" },
    { pays: "Sénégal", etudiants2022: "320", etudiants2023: "380", etudiants2024: "420" }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Les données de circulation ont été mises à jour.",
    });
  };

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

  const addStudentData = () => {
    const newData: StudentData = {
      pays: "Nouveau pays",
      etudiants2022: "",
      etudiants2023: "",
      etudiants2024: ""
    };
    setStudentData([...studentData, newData]);
  };

  const removeStudentData = (index: number) => {
    setStudentData(studentData.filter((_, i) => i !== index));
  };

  const updateStudentData = (index: number, field: keyof StudentData, value: string) => {
    const newData = [...studentData];
    (newData[index] as any)[field] = value;
    setStudentData(newData);
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
          <TabsTrigger value="etudiants">Étudiants par Pays</TabsTrigger>
        </TabsList>

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
                    <TableHead className="w-[100px]">Actions</TableHead>
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
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="Population">Population</option>
                          <option value="Transport">Transport</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.unite}
                          onChange={(e) => updateIndicator(indicator.id, "unite", e.target.value)}
                          placeholder="%, nombre..."
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.annee2022}
                          onChange={(e) => updateIndicator(indicator.id, "annee2022", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.annee2023}
                          onChange={(e) => updateIndicator(indicator.id, "annee2023", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={indicator.annee2024}
                          onChange={(e) => updateIndicator(indicator.id, "annee2024", e.target.value)}
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

        <TabsContent value="etudiants" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Étudiants CEDEAO en Côte d'Ivoire</CardTitle>
              <Button onClick={addStudentData} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pays d'origine</TableHead>
                    <TableHead>Étudiants 2022</TableHead>
                    <TableHead>Étudiants 2023</TableHead>
                    <TableHead>Étudiants 2024</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          value={data.pays}
                          onChange={(e) => updateStudentData(index, "pays", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.etudiants2022}
                          onChange={(e) => updateStudentData(index, "etudiants2022", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.etudiants2023}
                          onChange={(e) => updateStudentData(index, "etudiants2023", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={data.etudiants2024}
                          onChange={(e) => updateStudentData(index, "etudiants2024", e.target.value)}
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => removeStudentData(index)}
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
