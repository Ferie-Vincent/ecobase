import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function PageAccueil() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titre: "ECOBASE",
    sousTitre: "Plateforme de données pour le suivi et l'évaluation des politiques publiques",
    description: "ECOBASE est la base de données officielle du Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur.",
    missionIntegration: "Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA",
    missionDiaspora: "Accompagner et coordonner les initiatives visant le regroupement et l'organisation des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences"
  });

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Le contenu de la page d'accueil a été mis à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion de la page d'accueil</h1>
        <p className="text-muted-foreground">Modifiez le contenu de la page d'accueil</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="titre">Titre principal</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="sousTitre">Sous-titre</Label>
            <Input
              id="sousTitre"
              value={formData.sousTitre}
              onChange={(e) => setFormData({ ...formData, sousTitre: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Section Missions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="missionIntegration">Mission Intégration Africaine</Label>
            <Textarea
              id="missionIntegration"
              rows={3}
              value={formData.missionIntegration}
              onChange={(e) => setFormData({ ...formData, missionIntegration: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="missionDiaspora">Mission Ivoiriens de l'Extérieur</Label>
            <Textarea
              id="missionDiaspora"
              rows={3}
              value={formData.missionDiaspora}
              onChange={(e) => setFormData({ ...formData, missionDiaspora: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
