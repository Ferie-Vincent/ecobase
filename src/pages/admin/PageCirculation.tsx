import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus } from "lucide-react";

export default function PageCirculation() {
  const { toast } = useToast();
  const [sections, setSections] = useState([
    {
      id: 1,
      titre: "Politique de libre circulation",
      contenu: "Faciliter la mobilité des personnes, des biens et des services dans l'espace CEDEAO et UEMOA."
    },
    {
      id: 2,
      titre: "Initiatives régionales",
      contenu: "Description des programmes favorisant la libre circulation dans la région."
    }
  ]);

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Le contenu de la page Libre Circulation a été mis à jour.",
    });
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      titre: "Nouvelle section",
      contenu: ""
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Libre Circulation</h1>
          <p className="text-muted-foreground">Modifiez le contenu de la page Libre Circulation</p>
        </div>
        <Button onClick={addSection} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une section
        </Button>
      </div>

      {sections.map((section, index) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>Section {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Titre de la section</Label>
              <Textarea
                rows={1}
                value={section.titre}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[index].titre = e.target.value;
                  setSections(newSections);
                }}
              />
            </div>
            <div>
              <Label>Contenu</Label>
              <Textarea
                rows={5}
                value={section.contenu}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[index].contenu = e.target.value;
                  setSections(newSections);
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
