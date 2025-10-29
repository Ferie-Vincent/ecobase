import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface SlecData {
  id: number;
  pays: string;
  annee2022: string;
  annee2023: string;
  annee2024: string;
}

export default function PageIntegration() {
  const { toast } = useToast();
  
  const [slecData, setSlecData] = useState<SlecData[]>([
    { id: 1, pays: "Bénin", annee2022: "125", annee2023: "150", annee2024: "180" },
    { id: 2, pays: "Burkina Faso", annee2022: "98", annee2023: "120", annee2024: "145" },
    { id: 3, pays: "Ghana", annee2022: "210", annee2023: "245", annee2024: "280" },
    { id: 4, pays: "Mali", annee2022: "87", annee2023: "105", annee2024: "125" },
  ]);

  const [contentSections, setContentSections] = useState([
    {
      id: 1,
      titre: "Objectifs de l'intégration africaine",
      contenu: "Promouvoir l'intégration régionale et continentale à travers le renforcement de la coopération économique, politique et sociale."
    },
    {
      id: 2,
      titre: "Programmes en cours",
      contenu: "Description des programmes et initiatives en matière d'intégration africaine."
    }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Le contenu de la page Intégration Africaine a été mis à jour.",
    });
  };

  const addSlecRow = () => {
    const newRow: SlecData = {
      id: Date.now(),
      pays: "Nouveau pays",
      annee2022: "",
      annee2023: "",
      annee2024: ""
    };
    setSlecData([...slecData, newRow]);
  };

  const removeSlecRow = (index: number) => {
    const newData = [...slecData];
    newData.splice(index, 1);
    setSlecData(newData);
  };

  const updateSlecData = (index: number, field: keyof SlecData, value: string) => {
    const newData = [...slecData];
    (newData[index] as any)[field] = value;
    setSlecData(newData);
  };

  const addContentSection = () => {
    const newSection = {
      id: Date.now(),
      titre: "Nouvelle section",
      contenu: ""
    };
    setContentSections([...contentSections, newSection]);
  };

  const removeContentSection = (index: number) => {
    const newSections = [...contentSections];
    newSections.splice(index, 1);
    setContentSections(newSections);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion - Intégration Africaine</h1>
        <p className="text-muted-foreground">Gérez les données d'intégration africaine et le SLEC</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Schéma de Libéralisation des Échanges CEDEAO (SLEC)</span>
            <Button onClick={addSlecRow} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un pays
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pays</TableHead>
                <TableHead>2022</TableHead>
                <TableHead>2023</TableHead>
                <TableHead>2024</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slecData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Input
                      value={row.pays}
                      onChange={(e) => updateSlecData(index, 'pays', e.target.value)}
                      placeholder="Nom du pays"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.annee2022}
                      onChange={(e) => updateSlecData(index, 'annee2022', e.target.value)}
                      placeholder="Valeur 2022"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.annee2023}
                      onChange={(e) => updateSlecData(index, 'annee2023', e.target.value)}
                      placeholder="Valeur 2023"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.annee2024}
                      onChange={(e) => updateSlecData(index, 'annee2024', e.target.value)}
                      placeholder="Valeur 2024"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSlecRow(index)}
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

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sections de contenu</h2>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeContentSection(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Titre de la section</Label>
              <Input
                value={section.titre}
                onChange={(e) => {
                  const newSections = [...contentSections];
                  newSections[index].titre = e.target.value;
                  setContentSections(newSections);
                }}
              />
            </div>
            <div>
              <Label>Contenu</Label>
              <Textarea
                rows={5}
                value={section.contenu}
                onChange={(e) => {
                  const newSections = [...contentSections];
                  newSections[index].contenu = e.target.value;
                  setContentSections(newSections);
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
