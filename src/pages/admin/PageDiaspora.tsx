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

interface ActionData {
  id: number;
  action: string;
  description: string;
  cible: string;
  statut: string;
}

interface ImpactData {
  id: number;
  indicateur: string;
  valeur2022: string;
  valeur2023: string;
  valeur2024: string;
}

interface ProgrammeData {
  id: number;
  programme: string;
  beneficiaires: string;
  budget: string;
  responsable: string;
}

export default function PageDiaspora() {
  const { toast } = useToast();
  
  const [actions, setActions] = useState<ActionData[]>([
    { id: 1, action: "Sensibilisation à l'immigration clandestine", description: "Campagnes de sensibilisation dans les zones à risque", cible: "15000 personnes", statut: "En cours" },
    { id: 2, action: "Réinsertion professionnelle", description: "Programme d'accompagnement au retour", cible: "5000 personnes", statut: "Actif" },
    { id: 3, action: "Intégration fonction publique", description: "Faciliter l'accès à la fonction publique", cible: "700 personnes", statut: "Actif" },
  ]);

  const [impacts, setImpacts] = useState<ImpactData[]>([
    { id: 1, indicateur: "Transferts d'argent (% PIB)", valeur2022: "7.9%", valeur2023: "8.4%", valeur2024: "9.1%" },
    { id: 2, indicateur: "Enregistrés CNPS", valeur2022: "8120", valeur2023: "8920", valeur2024: "9870" },
    { id: 3, indicateur: "Assistés à l'étranger", valeur2022: "4050", valeur2023: "4560", valeur2024: "5120" },
  ]);

  const [programmes, setProgrammes] = useState<ProgrammeData[]>([
    { id: 1, programme: "Programme de sensibilisation jeunesse", beneficiaires: "12000 jeunes", budget: "850 millions FCFA", responsable: "Direction Diaspora" },
    { id: 2, programme: "Assistance sociale aux ivoiriens de l'extérieur", beneficiaires: "5000 familles", budget: "1.2 milliards FCFA", responsable: "Service Social" },
    { id: 3, programme: "Formation et réinsertion économique", beneficiaires: "3500 personnes", budget: "950 millions FCFA", responsable: "Direction Emploi" },
  ]);

  const [contentSections, setContentSections] = useState([
    {
      id: 1,
      titre: "Services aux Ivoiriens de l'Extérieur",
      contenu: "Accompagnement et coordination des initiatives visant le regroupement et l'organisation des Ivoiriens de l'extérieur."
    },
    {
      id: 2,
      titre: "Programmes de réinsertion",
      contenu: "Faciliter la réinsertion économique, sociale et culturelle lors du retour en Côte d'Ivoire."
    }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Le contenu de la page Ivoiriens de l'Extérieur a été mis à jour.",
    });
  };

  const addAction = () => {
    setActions([...actions, {
      id: Date.now(),
      action: "Nouvelle action",
      description: "",
      cible: "",
      statut: "À définir"
    }]);
  };

  const removeAction = (index: number) => {
    const newData = [...actions];
    newData.splice(index, 1);
    setActions(newData);
  };

  const updateAction = (index: number, field: keyof ActionData, value: string) => {
    const newData = [...actions];
    (newData[index] as any)[field] = value;
    setActions(newData);
  };

  const addImpact = () => {
    setImpacts([...impacts, {
      id: Date.now(),
      indicateur: "Nouvel indicateur",
      valeur2022: "",
      valeur2023: "",
      valeur2024: ""
    }]);
  };

  const removeImpact = (index: number) => {
    const newData = [...impacts];
    newData.splice(index, 1);
    setImpacts(newData);
  };

  const updateImpact = (index: number, field: keyof ImpactData, value: string) => {
    const newData = [...impacts];
    (newData[index] as any)[field] = value;
    setImpacts(newData);
  };

  const addProgramme = () => {
    setProgrammes([...programmes, {
      id: Date.now(),
      programme: "Nouveau programme",
      beneficiaires: "",
      budget: "",
      responsable: ""
    }]);
  };

  const removeProgramme = (index: number) => {
    const newData = [...programmes];
    newData.splice(index, 1);
    setProgrammes(newData);
  };

  const updateProgramme = (index: number, field: keyof ProgrammeData, value: string) => {
    const newData = [...programmes];
    (newData[index] as any)[field] = value;
    setProgrammes(newData);
  };

  const addContentSection = () => {
    setContentSections([...contentSections, {
      id: Date.now(),
      titre: "Nouvelle section",
      contenu: ""
    }]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion - Ivoiriens de l'Extérieur</h1>
        <p className="text-muted-foreground">Gérez les données de la diaspora ivoirienne</p>
      </div>

      <Tabs defaultValue="actions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="actions">Répartition des Actions</TabsTrigger>
          <TabsTrigger value="impact">Impact Économique</TabsTrigger>
          <TabsTrigger value="programmes">Programmes</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Répartition des Actions</span>
                <Button onClick={addAction} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une action
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Cible</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actions.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Input
                          value={row.action}
                          onChange={(e) => updateAction(index, 'action', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.description}
                          onChange={(e) => updateAction(index, 'description', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.cible}
                          onChange={(e) => updateAction(index, 'cible', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.statut}
                          onChange={(e) => updateAction(index, 'statut', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAction(index)}
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

        <TabsContent value="impact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Impact Économique</span>
                <Button onClick={addImpact} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un indicateur
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicateur</TableHead>
                    <TableHead>2022</TableHead>
                    <TableHead>2023</TableHead>
                    <TableHead>2024</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impacts.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Input
                          value={row.indicateur}
                          onChange={(e) => updateImpact(index, 'indicateur', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.valeur2022}
                          onChange={(e) => updateImpact(index, 'valeur2022', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.valeur2023}
                          onChange={(e) => updateImpact(index, 'valeur2023', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.valeur2024}
                          onChange={(e) => updateImpact(index, 'valeur2024', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImpact(index)}
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

        <TabsContent value="programmes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Programmes de Sensibilisation et Réinsertion</span>
                <Button onClick={addProgramme} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un programme
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Programme</TableHead>
                    <TableHead>Bénéficiaires</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programmes.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Input
                          value={row.programme}
                          onChange={(e) => updateProgramme(index, 'programme', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.beneficiaires}
                          onChange={(e) => updateProgramme(index, 'beneficiaires', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.budget}
                          onChange={(e) => updateProgramme(index, 'budget', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.responsable}
                          onChange={(e) => updateProgramme(index, 'responsable', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProgramme(index)}
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

        <TabsContent value="content" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sections de contenu</h2>
              <Button onClick={addContentSection} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une section
              </Button>
            </div>

            {contentSections.map((section, index) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle>Section {index + 1}</CardTitle>
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
          </div>
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
