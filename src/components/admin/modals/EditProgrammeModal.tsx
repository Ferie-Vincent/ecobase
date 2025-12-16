import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Programme } from "@/data/seedData";

interface EditProgrammeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programme: Programme | null;
  onSave: (programme: Programme) => void;
}

export function EditProgrammeModal({ open, onOpenChange, programme, onSave }: EditProgrammeModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Programme>({
    id: "",
    titre: "",
    description: "",
    domaine: "Intégration",
    debut: "",
    fin: "",
    budget: 0,
    statut: "Planifié"
  });

  useEffect(() => {
    if (programme) {
      setFormData(programme);
    }
  }, [programme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Programme modifié",
      description: `Le programme "${formData.titre}" a été mis à jour.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Modifier le programme</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domaine">Domaine</Label>
              <Select value={formData.domaine} onValueChange={(value: any) => setFormData({ ...formData, domaine: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Intégration">Intégration</SelectItem>
                  <SelectItem value="Ivoiriens Extérieur">Ivoiriens Extérieur</SelectItem>
                  <SelectItem value="Économie">Économie</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select value={formData.statut} onValueChange={(value: any) => setFormData({ ...formData, statut: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Planifié">Planifié</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Clôturé">Clôturé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debut">Date de début</Label>
              <Input
                id="debut"
                type="date"
                value={formData.debut}
                onChange={(e) => setFormData({ ...formData, debut: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fin">Date de fin</Label>
              <Input
                id="fin"
                type="date"
                value={formData.fin}
                onChange={(e) => setFormData({ ...formData, fin: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (FCFA)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
