import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import YearSelectorAdmin from "@/components/admin/YearSelectorAdmin";
import { useData, Indicator } from "@/contexts/DataContext";

export default function PageDiaspora() {
  const { toast } = useToast();
  const { 
    diasporaIndicatorsByYear, 
    updateDiasporaIndicators, 
    availableYears, 
    addYear, 
    removeYear 
  } = useData();
  
  const [localYears, setLocalYears] = useState(availableYears);
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);

  // Synchronize with context when year changes
  useEffect(() => {
    setIndicators(diasporaIndicatorsByYear[selectedYear] || []);
  }, [selectedYear, diasporaIndicatorsByYear]);

  const handleSave = () => {
    updateDiasporaIndicators(selectedYear, indicators);
    toast({ title: "Modifications enregistrées", description: `Les données de l'année ${selectedYear} ont été mises à jour.` });
  };

  const handleYearsChange = (newYears: string[]) => {
    setLocalYears(newYears);
    // Add new years to context
    newYears.forEach(year => {
      if (!availableYears.includes(year)) {
        addYear(year);
      }
    });
    // Remove years from context
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
      category: "Sensibilisation"
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

  const categories = ["Sensibilisation", "Réinsertion", "Emploi", "Économie", "Social", "Assistance"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Ivoiriens de l'Extérieur</h1>
          <p className="text-muted-foreground">Gérez les données de la diaspora ivoirienne</p>
        </div>
        <YearSelectorAdmin 
          selectedYear={selectedYear} 
          onYearChange={setSelectedYear} 
          years={localYears} 
          onYearsChange={handleYearsChange} 
        />
      </div>

      <Tabs defaultValue="indicateurs" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="indicateurs">Indicateurs Diaspora</TabsTrigger>
        </TabsList>

        <TabsContent value="indicateurs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span>Indicateurs Diaspora - {selectedYear}</span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">Données pour l'année {selectedYear}</p>
                </div>
                <Button onClick={addIndicator} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />Ajouter un indicateur
                </Button>
              </CardTitle>
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
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicators.map((indicator, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={indicator.name} 
                          onChange={(e) => updateIndicator(index, 'name', e.target.value)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={indicator.value} 
                          onChange={(e) => updateIndicator(index, 'value', e.target.value)} 
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={indicator.unit} 
                          onChange={(e) => updateIndicator(index, 'unit', e.target.value)} 
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={indicator.trend} 
                          onChange={(e) => updateIndicator(index, 'trend', e.target.value)} 
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <select 
                          value={indicator.category} 
                          onChange={(e) => updateIndicator(index, 'category', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => removeIndicator(index)}>
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
          <Save className="h-4 w-4 mr-2" />Enregistrer toutes les modifications
        </Button>
      </div>
    </div>
  );
}