import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { StructureInterne } from "@/data/seedData";

interface EditStructureInterneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  structure: StructureInterne | null;
  onSave: (structure: StructureInterne) => void;
}

export function EditStructureInterneModal({ open, onOpenChange, structure, onSave }: EditStructureInterneModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StructureInterne>({
    id: "",
    nom: "",
    type: "service",
    point_focal: "",
    domaine: ""
  });

  useEffect(() => {
    if (structure) {
      setFormData(structure);
    }
  }, [structure]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Structure modifiée",
      description: `La structure "${formData.nom}" a été mise à jour.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Modifier la structure interne</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom complet *</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value: "service" | "générale" | "technique") => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="générale">Générale</SelectItem>
                  <SelectItem value="technique">Technique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="domaine">Domaine *</Label>
              <Input
                id="domaine"
                value={formData.domaine}
                onChange={(e) => setFormData({ ...formData, domaine: e.target.value })}
                placeholder="Ex: Planification, Intégration..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="point_focal">Point focal *</Label>
            <Input
              id="point_focal"
              value={formData.point_focal}
              onChange={(e) => setFormData({ ...formData, point_focal: e.target.value })}
              required
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
