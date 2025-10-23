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
import { indicateurs } from "@/data/seedData";

interface CreateDonneeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDonneeModal({ open, onOpenChange }: CreateDonneeModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    indicateur_id: "",
    year: new Date().getFullYear(),
    geo_region: "",
    value: "",
    commentaire: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donnée enregistrée",
      description: "La donnée a été enregistrée en brouillon avec succès.",
    });
    onOpenChange(false);
    setFormData({
      indicateur_id: "",
      year: new Date().getFullYear(),
      geo_region: "",
      value: "",
      commentaire: ""
    });
  };

  const selectedIndicateur = indicateurs.find(i => i.id === formData.indicateur_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Saisir une donnée</DialogTitle>
          <DialogDescription>
            Ajouter une nouvelle valeur pour un indicateur
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="indicateur">Indicateur *</Label>
            <Select value={formData.indicateur_id} onValueChange={(value) => setFormData({ ...formData, indicateur_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un indicateur" />
              </SelectTrigger>
              <SelectContent>
                {indicateurs.map((ind) => (
                  <SelectItem key={ind.id} value={ind.id}>
                    {ind.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="year">Année *</Label>
              <Input
                id="year"
                type="number"
                min="2000"
                max="2100"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="geo_region">Région</Label>
              <Select value={formData.geo_region} onValueChange={(value) => setFormData({ ...formData, geo_region: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CI">Côte d'Ivoire</SelectItem>
                  <SelectItem value="UEMOA">UEMOA</SelectItem>
                  <SelectItem value="CEDEAO">CEDEAO</SelectItem>
                  <SelectItem value="Afrique">Afrique</SelectItem>
                  <SelectItem value="Hors_CEDEAO">Hors CEDEAO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valeur *</Label>
            <div className="flex gap-2">
              <Input
                id="value"
                type="number"
                step="any"
                placeholder="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
                className="flex-1"
              />
              {selectedIndicateur && (
                <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground">
                  {selectedIndicateur.unite}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="commentaire">Commentaire</Label>
            <Textarea
              id="commentaire"
              placeholder="Notes ou précisions sur cette valeur..."
              value={formData.commentaire}
              onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="button" variant="outline">
              Enregistrer brouillon
            </Button>
            <Button type="submit">Soumettre pour validation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
