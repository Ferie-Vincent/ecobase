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

interface ActionData {
  id: number;
  action: string;
  description: string;
  valeurs: Record<string, { cible: string; statut: string }>;
}

interface ImpactData {
  id: number;
  indicateur: string;
  valeurs: Record<string, string>;
}

interface ProgrammeData {
  id: number;
  programme: string;
  valeurs: Record<string, { beneficiaires: string; budget: string; responsable: string }>;
}

export default function PageDiaspora() {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState("2024");
  
  const [actions, setActions] = useState<ActionData[]>([
    { id: 1, action: "Sensibilisation à l'immigration clandestine", description: "Campagnes de sensibilisation dans les zones à risque", valeurs: { "2022": { cible: "10000 personnes", statut: "Terminé" }, "2023": { cible: "12000 personnes", statut: "Terminé" }, "2024": { cible: "15000 personnes", statut: "En cours" } } },
    { id: 2, action: "Réinsertion professionnelle", description: "Programme d'accompagnement au retour", valeurs: { "2022": { cible: "3500 personnes", statut: "Terminé" }, "2023": { cible: "4200 personnes", statut: "Terminé" }, "2024": { cible: "5000 personnes", statut: "Actif" } } },
    { id: 3, action: "Intégration fonction publique", description: "Faciliter l'accès à la fonction publique", valeurs: { "2022": { cible: "500 personnes", statut: "Terminé" }, "2023": { cible: "600 personnes", statut: "Terminé" }, "2024": { cible: "700 personnes", statut: "Actif" } } },
  ]);

  const [impacts, setImpacts] = useState<ImpactData[]>([
    { id: 1, indicateur: "Transferts d'argent (% PIB)", valeurs: { "2022": "7.9%", "2023": "8.4%", "2024": "9.1%" } },
    { id: 2, indicateur: "Enregistrés CNPS", valeurs: { "2022": "8120", "2023": "8920", "2024": "9870" } },
    { id: 3, indicateur: "Assistés à l'étranger", valeurs: { "2022": "4050", "2023": "4560", "2024": "5120" } },
  ]);

  const [programmes, setProgrammes] = useState<ProgrammeData[]>([
    { id: 1, programme: "Programme de sensibilisation jeunesse", valeurs: { "2022": { beneficiaires: "10000 jeunes", budget: "750 millions FCFA", responsable: "Direction Diaspora" }, "2023": { beneficiaires: "11000 jeunes", budget: "800 millions FCFA", responsable: "Direction Diaspora" }, "2024": { beneficiaires: "12000 jeunes", budget: "850 millions FCFA", responsable: "Direction Diaspora" } } },
    { id: 2, programme: "Assistance sociale aux ivoiriens de l'extérieur", valeurs: { "2022": { beneficiaires: "4000 familles", budget: "1 milliard FCFA", responsable: "Service Social" }, "2023": { beneficiaires: "4500 familles", budget: "1.1 milliards FCFA", responsable: "Service Social" }, "2024": { beneficiaires: "5000 familles", budget: "1.2 milliards FCFA", responsable: "Service Social" } } },
    { id: 3, programme: "Formation et réinsertion économique", valeurs: { "2022": { beneficiaires: "3000 personnes", budget: "850 millions FCFA", responsable: "Direction Emploi" }, "2023": { beneficiaires: "3200 personnes", budget: "900 millions FCFA", responsable: "Direction Emploi" }, "2024": { beneficiaires: "3500 personnes", budget: "950 millions FCFA", responsable: "Direction Emploi" } } },
  ]);

  const [contentSections, setContentSections] = useState([
    { id: 1, titre: "Services aux Ivoiriens de l'Extérieur", contenu: "Accompagnement et coordination des initiatives visant le regroupement et l'organisation des Ivoiriens de l'extérieur." },
    { id: 2, titre: "Programmes de réinsertion", contenu: "Faciliter la réinsertion économique, sociale et culturelle lors du retour en Côte d'Ivoire." }
  ]);

  const handleSave = () => {
    toast({ title: "Modifications enregistrées", description: `Les données de l'année ${selectedYear} ont été mises à jour.` });
  };

  const addAction = () => {
    setActions([...actions, {
      id: Date.now(),
      action: "Nouvelle action",
      description: "",
      valeurs: { "2022": { cible: "", statut: "À définir" }, "2023": { cible: "", statut: "À définir" }, "2024": { cible: "", statut: "À définir" } }
    }]);
  };

  const removeAction = (index: number) => { const newData = [...actions]; newData.splice(index, 1); setActions(newData); };

  const updateAction = (index: number, field: string, value: string) => {
    const newData = [...actions];
    if (field === "action" || field === "description") {
      (newData[index] as any)[field] = value;
    } else {
      const currentValues = newData[index].valeurs[selectedYear] || { cible: "", statut: "" };
      newData[index].valeurs[selectedYear] = { ...currentValues, [field]: value };
    }
    setActions(newData);
  };

  const addImpact = () => {
    setImpacts([...impacts, { id: Date.now(), indicateur: "Nouvel indicateur", valeurs: { "2022": "", "2023": "", "2024": "" } }]);
  };

  const removeImpact = (index: number) => { const newData = [...impacts]; newData.splice(index, 1); setImpacts(newData); };

  const updateImpact = (index: number, field: string, value: string) => {
    const newData = [...impacts];
    if (field === "indicateur") {
      newData[index].indicateur = value;
    } else {
      newData[index].valeurs[selectedYear] = value;
    }
    setImpacts(newData);
  };

  const addProgramme = () => {
    setProgrammes([...programmes, {
      id: Date.now(),
      programme: "Nouveau programme",
      valeurs: { "2022": { beneficiaires: "", budget: "", responsable: "" }, "2023": { beneficiaires: "", budget: "", responsable: "" }, "2024": { beneficiaires: "", budget: "", responsable: "" } }
    }]);
  };

  const removeProgramme = (index: number) => { const newData = [...programmes]; newData.splice(index, 1); setProgrammes(newData); };

  const updateProgramme = (index: number, field: string, value: string) => {
    const newData = [...programmes];
    if (field === "programme") {
      newData[index].programme = value;
    } else {
      const currentValues = newData[index].valeurs[selectedYear] || { beneficiaires: "", budget: "", responsable: "" };
      newData[index].valeurs[selectedYear] = { ...currentValues, [field]: value };
    }
    setProgrammes(newData);
  };

  const addContentSection = () => {
    setContentSections([...contentSections, { id: Date.now(), titre: "Nouvelle section", contenu: "" }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Ivoiriens de l'Extérieur</h1>
          <p className="text-muted-foreground">Gérez les données de la diaspora ivoirienne</p>
        </div>
        <YearSelectorAdmin selectedYear={selectedYear} onYearChange={setSelectedYear} />
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
                <div>
                  <span>Répartition des Actions - {selectedYear}</span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">Données pour l'année {selectedYear}</p>
                </div>
                <Button onClick={addAction} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter une action</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Cible ({selectedYear})</TableHead>
                    <TableHead>Statut ({selectedYear})</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actions.map((row, index) => {
                    const yearData = row.valeurs[selectedYear] || { cible: "", statut: "" };
                    return (
                      <TableRow key={row.id}>
                        <TableCell><Input value={row.action} onChange={(e) => updateAction(index, 'action', e.target.value)} /></TableCell>
                        <TableCell><Input value={row.description} onChange={(e) => updateAction(index, 'description', e.target.value)} /></TableCell>
                        <TableCell><Input value={yearData.cible} onChange={(e) => updateAction(index, 'cible', e.target.value)} /></TableCell>
                        <TableCell><Input value={yearData.statut} onChange={(e) => updateAction(index, 'statut', e.target.value)} /></TableCell>
                        <TableCell><Button variant="ghost" size="sm" onClick={() => removeAction(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span>Impact Économique - {selectedYear}</span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">Données pour l'année {selectedYear}</p>
                </div>
                <Button onClick={addImpact} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter un indicateur</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicateur</TableHead>
                    <TableHead>Valeur ({selectedYear})</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impacts.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell><Input value={row.indicateur} onChange={(e) => updateImpact(index, 'indicateur', e.target.value)} /></TableCell>
                      <TableCell><Input value={row.valeurs[selectedYear] || ""} onChange={(e) => updateImpact(index, 'valeur', e.target.value)} /></TableCell>
                      <TableCell><Button variant="ghost" size="sm" onClick={() => removeImpact(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
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
                <div>
                  <span>Programmes - {selectedYear}</span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">Données pour l'année {selectedYear}</p>
                </div>
                <Button onClick={addProgramme} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Ajouter un programme</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Programme</TableHead>
                    <TableHead>Bénéficiaires ({selectedYear})</TableHead>
                    <TableHead>Budget ({selectedYear})</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programmes.map((row, index) => {
                    const yearData = row.valeurs[selectedYear] || { beneficiaires: "", budget: "", responsable: "" };
                    return (
                      <TableRow key={row.id}>
                        <TableCell><Input value={row.programme} onChange={(e) => updateProgramme(index, 'programme', e.target.value)} /></TableCell>
                        <TableCell><Input value={yearData.beneficiaires} onChange={(e) => updateProgramme(index, 'beneficiaires', e.target.value)} /></TableCell>
                        <TableCell><Input value={yearData.budget} onChange={(e) => updateProgramme(index, 'budget', e.target.value)} /></TableCell>
                        <TableCell><Input value={yearData.responsable} onChange={(e) => updateProgramme(index, 'responsable', e.target.value)} /></TableCell>
                        <TableCell><Button variant="ghost" size="sm" onClick={() => removeProgramme(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sections de contenu</h2>
              <Button onClick={addContentSection} variant="outline"><Plus className="h-4 w-4 mr-2" />Ajouter une section</Button>
            </div>
            {contentSections.map((section, index) => (
              <Card key={section.id}>
                <CardHeader><CardTitle>Section {index + 1}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Titre de la section</Label>
                    <Input value={section.titre} onChange={(e) => {
                      const newSections = [...contentSections];
                      newSections[index].titre = e.target.value;
                      setContentSections(newSections);
                    }} />
                  </div>
                  <div>
                    <Label>Contenu</Label>
                    <Textarea rows={5} value={section.contenu} onChange={(e) => {
                      const newSections = [...contentSections];
                      newSections[index].contenu = e.target.value;
                      setContentSections(newSections);
                    }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Enregistrer toutes les modifications</Button>
      </div>
    </div>
  );
}
