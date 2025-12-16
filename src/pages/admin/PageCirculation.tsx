import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import YearSelectorAdmin from "@/components/admin/YearSelectorAdmin";
import { useData, Indicator, StudentData } from "@/contexts/DataContext";

export default function PageCirculation() {
  const { toast } = useToast();
  const { 
    circulationIndicatorsByYear, 
    studentsDataByYear,
    updateCirculationIndicators, 
    updateStudentsData,
    availableYears, 
    addYear, 
    removeYear 
  } = useData();
  
  const [localYears, setLocalYears] = useState(availableYears);
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);

  // Synchronize with context when year changes
  useEffect(() => {
    setIndicators(circulationIndicatorsByYear[selectedYear] || []);
    setStudentsData(studentsDataByYear[selectedYear] || []);
  }, [selectedYear, circulationIndicatorsByYear, studentsDataByYear]);

  const handleSave = () => {
    updateCirculationIndicators(selectedYear, indicators);
    updateStudentsData(selectedYear, studentsData);
    toast({ title: "Modifications enregistrées", description: `Les données de l'année ${selectedYear} ont été mises à jour.` });
  };

  const handleYearsChange = (newYears: string[]) => {
    setLocalYears(newYears);
    newYears.forEach(year => {
      if (!availableYears.includes(year)) {
        addYear(year);
      }
    });
    availableYears.forEach(year => {
      if (!newYears.includes(year)) {
        removeYear(year);
      }
    });
  };

  const addIndicator = () => {
    setIndicators([...indicators, {
      name: "Nouvel indicateur",
      value: 0,
      unit: "",
      trend: "",
      category: "Population"
    }]);
  };

  const removeIndicator = (index: number) => {
    const newData = [...indicators];
    newData.splice(index, 1);
    setIndicators(newData);
  };

  const updateIndicator = (index: number, field: keyof Indicator, value: string | number) => {
    const newData = [...indicators];
    (newData[index] as any)[field] = field === "value" ? Number(value) : value;
    setIndicators(newData);
  };

  const addStudentRegion = () => {
    setStudentsData([...studentsData, {
      region: "Nouvelle région",
      total: 0,
      economie: 0,
      droit: 0,
      culture: 0,
      autres: 0
    }]);
  };

  const removeStudentRegion = (index: number) => {
    const newData = [...studentsData];
    newData.splice(index, 1);
    setStudentsData(newData);
  };

  const updateStudentRegion = (index: number, field: keyof StudentData, value: string | number) => {
    const newData = [...studentsData];
    (newData[index] as any)[field] = field === "region" ? value : Number(value);
    setStudentsData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Libre Circulation</h1>
          <p className="text-muted-foreground">Gérez les indicateurs de circulation et mobilité régionale</p>
        </div>
        <YearSelectorAdmin 
          selectedYear={selectedYear} 
          onYearChange={setSelectedYear} 
          years={localYears} 
          onYearsChange={handleYearsChange} 
        />
      </div>

      <Tabs defaultValue="indicateurs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="indicateurs">Indicateurs de Circulation</TabsTrigger>
          <TabsTrigger value="etudiants">Étudiants par Région</TabsTrigger>
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
                    <TableHead>Valeur</TableHead>
                    <TableHead>Unité</TableHead>
                    <TableHead>Tendance</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicators.map((indicator, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={indicator.name} 
                          onChange={(e) => updateIndicator(index, "name", e.target.value)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={indicator.value} 
                          onChange={(e) => updateIndicator(index, "value", e.target.value)} 
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={indicator.unit} 
                          onChange={(e) => updateIndicator(index, "unit", e.target.value)} 
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={indicator.trend} 
                          onChange={(e) => updateIndicator(index, "trend", e.target.value)} 
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <select 
                          value={indicator.category} 
                          onChange={(e) => updateIndicator(index, "category", e.target.value)} 
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="Population">Population</option>
                          <option value="Transport">Transport</option>
                        </select>
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

        <TabsContent value="etudiants" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Étudiants Étrangers par Région - {selectedYear}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Données pour l'année {selectedYear}</p>
              </div>
              <Button onClick={addStudentRegion} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />Ajouter
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
                  {studentsData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={data.region} 
                          onChange={(e) => updateStudentRegion(index, "region", e.target.value)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={data.total} 
                          onChange={(e) => updateStudentRegion(index, "total", e.target.value)} 
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={data.economie} 
                          onChange={(e) => updateStudentRegion(index, "economie", e.target.value)} 
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={data.droit} 
                          onChange={(e) => updateStudentRegion(index, "droit", e.target.value)} 
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={data.culture} 
                          onChange={(e) => updateStudentRegion(index, "culture", e.target.value)} 
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={data.autres} 
                          onChange={(e) => updateStudentRegion(index, "autres", e.target.value)} 
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => removeStudentRegion(index)} variant="ghost" size="sm">
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
          <Save className="h-4 w-4 mr-2" />Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}