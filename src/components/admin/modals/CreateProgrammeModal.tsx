import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreateProgrammeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProgrammeModal({ open, onOpenChange }: CreateProgrammeModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    domaine: "",
    debut: "",
    fin: "",
    budget: "",
    statut: "Planifié"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Programme créé",
      description: `Le programme "${formData.titre}" a été créé avec succès.`,
    });
    
    onOpenChange(false);
    setFormData({
      titre: "",
      description: "",
      domaine: "",
      debut: "",
      fin: "",
      budget: "",
      statut: "Planifié"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau programme</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre du programme *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              placeholder="Ex: Intégration Économique Régionale 2025–2027"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée du programme..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domaine">Domaine *</Label>
              <Select value={formData.domaine} onValueChange={(value) => setFormData({ ...formData, domaine: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intégration">Intégration</SelectItem>
                  <SelectItem value="Diaspora">Diaspora</SelectItem>
                  <SelectItem value="Économie">Économie</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="statut">Statut *</Label>
              <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planifié">Planifié</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Clôturé">Clôturé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debut">Date de début *</Label>
              <Input
                id="debut"
                type="date"
                value={formData.debut}
                onChange={(e) => setFormData({ ...formData, debut: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fin">Date de fin *</Label>
              <Input
                id="fin"
                type="date"
                value={formData.fin}
                onChange={(e) => setFormData({ ...formData, fin: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (optionnel)</Label>
            <Input
              id="budget"
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="Ex: 5 000 000 000 FCFA"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le programme
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
