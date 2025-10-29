import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface Indicator {
  id: number;
  nom: string;
  reference: string;
  annee2022: string;
  annee2023: string;
  annee2024: string;
}

interface Section {
  id: number;
  titre: string;
  indicateurs: Indicator[];
}

export default function PagePerformance() {
  const { toast } = useToast();
  
  const [adminSections, setAdminSections] = useState<Section[]>([
    {
      id: 1,
      titre: "Promouvoir une administration moderne et performante",
      indicateurs: [
        { id: 1, nom: "Taux de réalisation des activités planifiées", reference: "68%", annee2022: "69%", annee2023: "70%", annee2024: "72%" },
        { id: 2, nom: "Taux de digitalisation des services du Ministère", reference: "20%", annee2022: "25%", annee2023: "28%", annee2024: "32%" },
        { id: 3, nom: "Nombre de partenaires mobilisés", reference: "5", annee2022: "5", annee2023: "6", annee2024: "7" },
        { id: 4, nom: "Taux de participation aux réunions régionales", reference: "33%", annee2022: "40%", annee2023: "45%", annee2024: "50%" },
      ]
    },
    {
      id: 2,
      titre: "Système performant de planification et suivi-évaluation",
      indicateurs: [
        { id: 1, nom: "Proportion des Directions avec plans d'actions", reference: "26%", annee2022: "30%", annee2023: "35%", annee2024: "40%" },
        { id: 2, nom: "Proportion des services rédigeant des rapports trimestriels", reference: "13%", annee2022: "20%", annee2023: "25%", annee2024: "30%" },
        { id: 3, nom: "Taux d'exécution des dépenses en biens et services", reference: "89%", annee2022: "90%", annee2023: "95%", annee2024: "95%" },
      ]
    }
  ]);

  const [integrationSections, setIntegrationSections] = useState<Section[]>([
    {
      id: 1,
      titre: "Promouvoir une meilleure intégration africaine",
      indicateurs: [
        { id: 1, nom: "Indice d'Intégration Régionale en Afrique (IIRA)", reference: "0.55", annee2022: "0.6", annee2023: "0.64", annee2024: "0.67" },
      ]
    },
    {
      id: 2,
      titre: "Renforcer le rôle de la CI en matière d'intégration",
      indicateurs: [
        { id: 1, nom: "Taux de pénétration des produits ivoiriens sur marchés africains", reference: "3%", annee2022: "3.5%", annee2023: "4.2%", annee2024: "5%" },
        { id: 2, nom: "Nombre d'entreprises ivoiriennes assistées sur marchés africains", reference: "5", annee2022: "8", annee2023: "12", annee2024: "15" },
      ]
    },
    {
      id: 3,
      titre: "Contribution de l'intégration au développement économique",
      indicateurs: [
        { id: 1, nom: "Nombre d'agréments d'entreprises au SLE CEDEAO", reference: "20", annee2022: "25", annee2023: "30", annee2024: "35" },
        { id: 2, nom: "Taux de mise en oeuvre de la stratégie APE intérimaires", reference: "45%", annee2022: "55%", annee2023: "65%", annee2024: "75%" },
      ]
    }
  ]);

  const [diasporaSections, setDiasporaSections] = useState<Section[]>([
    {
      id: 1,
      titre: "Mobiliser et valoriser les compétences de la diaspora",
      indicateurs: [
        { id: 1, nom: "Nombre d'ivoiriens sensibilisés à l'immigration clandestine", reference: "8920", annee2022: "11340", annee2023: "12450", annee2024: "13780" },
        { id: 2, nom: "Nombre d'ivoiriens réinsérés", reference: "2780", annee2022: "3520", annee2023: "3890", annee2024: "4320" },
        { id: 3, nom: "Intégrés dans la fonction publique", reference: "389", annee2022: "512", annee2023: "567", annee2024: "634" },
      ]
    },
    {
      id: 2,
      titre: "Renforcer la protection sociale des ivoiriens de l'extérieur",
      indicateurs: [
        { id: 1, nom: "Taux des transferts d'argent par rapport au PIB", reference: "6.8%", annee2022: "7.9%", annee2023: "8.4%", annee2024: "9.1%" },
        { id: 2, nom: "Nombre d'ivoiriens enregistrés à la CNPS", reference: "6340", annee2022: "8120", annee2023: "8920", annee2024: "9870" },
        { id: 3, nom: "Nombre d'ivoiriens assistés à l'étranger", reference: "3120", annee2022: "4050", annee2023: "4560", annee2024: "5120" },
      ]
    }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Les indicateurs de performance ont été mis à jour.",
    });
  };

  const addIndicator = (sections: Section[], setSections: Function, sectionIndex: number) => {
    const newSections = [...sections];
    const newIndicator: Indicator = {
      id: Date.now(),
      nom: "Nouvel indicateur",
      reference: "",
      annee2022: "",
      annee2023: "",
      annee2024: ""
    };
    newSections[sectionIndex].indicateurs.push(newIndicator);
    setSections(newSections);
  };

  const removeIndicator = (sections: Section[], setSections: Function, sectionIndex: number, indicatorIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].indicateurs.splice(indicatorIndex, 1);
    setSections(newSections);
  };

  const updateIndicator = (sections: Section[], setSections: Function, sectionIndex: number, indicatorIndex: number, field: keyof Indicator, value: string) => {
    const newSections = [...sections];
    (newSections[sectionIndex].indicateurs[indicatorIndex] as any)[field] = value;
    setSections(newSections);
  };

  const renderSectionForm = (sections: Section[], setSections: Function, category: string) => (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Input
                value={section.titre}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[sectionIndex].titre = e.target.value;
                  setSections(newSections);
                }}
                className="text-lg font-semibold"
              />
              <Button
                onClick={() => addIndicator(sections, setSections, sectionIndex)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter indicateur
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indicateur</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead>2022</TableHead>
                  <TableHead>2023</TableHead>
                  <TableHead>2024</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.indicateurs.map((indicator, indicatorIndex) => (
                  <TableRow key={indicator.id}>
                    <TableCell>
                      <Input
                        value={indicator.nom}
                        onChange={(e) => updateIndicator(sections, setSections, sectionIndex, indicatorIndex, 'nom', e.target.value)}
                        placeholder="Nom de l'indicateur"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={indicator.reference}
                        onChange={(e) => updateIndicator(sections, setSections, sectionIndex, indicatorIndex, 'reference', e.target.value)}
                        placeholder="Référence"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={indicator.annee2022}
                        onChange={(e) => updateIndicator(sections, setSections, sectionIndex, indicatorIndex, 'annee2022', e.target.value)}
                        placeholder="2022"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={indicator.annee2023}
                        onChange={(e) => updateIndicator(sections, setSections, sectionIndex, indicatorIndex, 'annee2023', e.target.value)}
                        placeholder="2023"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={indicator.annee2024}
                        onChange={(e) => updateIndicator(sections, setSections, sectionIndex, indicatorIndex, 'annee2024', e.target.value)}
                        placeholder="2024"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIndicator(sections, setSections, sectionIndex, indicatorIndex)}
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
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion - Indicateurs de Performance</h1>
        <p className="text-muted-foreground">Gérez les indicateurs de performance par catégorie</p>
      </div>

      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admin">Administration Générale</TabsTrigger>
          <TabsTrigger value="integration">Intégration Africaine</TabsTrigger>
          <TabsTrigger value="diaspora">Ivoiriens de l'Extérieur</TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="mt-6">
          {renderSectionForm(adminSections, setAdminSections, "Administration Générale")}
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          {renderSectionForm(integrationSections, setIntegrationSections, "Intégration Africaine")}
        </TabsContent>

        <TabsContent value="diaspora" className="mt-6">
          {renderSectionForm(diasporaSections, setDiasporaSections, "Ivoiriens de l'Extérieur")}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer toutes les modifications
        </Button>
      </div>
    </div>
  );
}
