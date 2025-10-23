import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CreateIndicateurModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateIndicateurModal({ open, onOpenChange }: CreateIndicateurModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    type: "",
    unite: "",
    frequence: "",
    source: "",
    methode: "",
    formule: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Indicateur créé",
      description: `L'indicateur "${formData.nom}" a été créé avec succès.`,
    });
    onOpenChange(false);
    setFormData({
      id: "",
      nom: "",
      type: "",
      unite: "",
      frequence: "",
      source: "",
      methode: "",
      formule: "",
      description: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvel indicateur</DialogTitle>
          <DialogDescription>
            Créer un nouvel indicateur dans le système ECOBASE
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="id">ID de l'indicateur *</Label>
              <Input
                id="id"
                placeholder="ex: slec_exportations_valeur"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intégration">Intégration</SelectItem>
                  <SelectItem value="Diaspora">Diaspora</SelectItem>
                  <SelectItem value="Économie">Économie</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nom">Nom de l'indicateur *</Label>
              <Input
                id="nom"
                placeholder="ex: Valeur des exportations SLEC"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unite">Unité *</Label>
              <Select value={formData.unite} onValueChange={(value) => setFormData({ ...formData, unite: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Milliards FCFA">Milliards FCFA</SelectItem>
                  <SelectItem value="Millions FCFA">Millions FCFA</SelectItem>
                  <SelectItem value="Pourcentage">Pourcentage</SelectItem>
                  <SelectItem value="Nombre">Nombre</SelectItem>
                  <SelectItem value="Jours">Jours</SelectItem>
                  <SelectItem value="Points">Points</SelectItem>
                  <SelectItem value="Ratio">Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequence">Fréquence *</Label>
              <Select value={formData.frequence} onValueChange={(value) => setFormData({ ...formData, frequence: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mensuelle">Mensuelle</SelectItem>
                  <SelectItem value="Trimestrielle">Trimestrielle</SelectItem>
                  <SelectItem value="Annuelle">Annuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source *</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DGCE/DOUANES">DGCE/DOUANES</SelectItem>
                  <SelectItem value="SPSE">SPSE</SelectItem>
                  <SelectItem value="INS">INS (Institut National de la Statistique)</SelectItem>
                  <SelectItem value="Direction de la Diaspora">Direction de la Diaspora</SelectItem>
                  <SelectItem value="BCEAO">BCEAO</SelectItem>
                  <SelectItem value="Ministère du Commerce">Ministère du Commerce</SelectItem>
                  <SelectItem value="Ministère de l'Intégration">Ministère de l'Intégration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="methode">Méthode *</Label>
              <Select value={formData.methode} onValueChange={(value) => setFormData({ ...formData, methode: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saisie">Saisie manuelle</SelectItem>
                  <SelectItem value="API">API / Connecteur</SelectItem>
                  <SelectItem value="Calcul">Calcul automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.methode === "Calcul" && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="formule">Formule de calcul</Label>
                <Input
                  id="formule"
                  placeholder="ex: (EXPORT_SLEC / EXPORT_INTRA) * 100"
                  value={formData.formule}
                  onChange={(e) => setFormData({ ...formData, formule: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description et méthodologie de l'indicateur..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer l'indicateur</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
