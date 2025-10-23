import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreateStructureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "nationale" | "interne";
}

export function CreateStructureModal({ open, onOpenChange, type }: CreateStructureModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    sigle: "",
    type: "",
    responsable: "",
    contact: "",
    statut: "Actif"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Structure créée",
      description: `La structure "${formData.nom}" a été créée avec succès.`,
    });
    
    onOpenChange(false);
    setFormData({
      nom: "",
      sigle: "",
      type: "",
      responsable: "",
      contact: "",
      statut: "Actif"
    });
  };

  const typeOptions = type === "nationale" 
    ? ["Productrice", "Détentrice", "Utilisatrice"]
    : ["Service", "Générale", "Technique"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Créer une structure {type === "nationale" ? "nationale" : "interne"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder={type === "nationale" ? "Ex: DBDES" : "Ex: SPSE"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sigle">Sigle</Label>
              <Input
                id="sigle"
                value={formData.sigle}
                onChange={(e) => setFormData({ ...formData, sigle: e.target.value })}
                placeholder="Ex: DBDES"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsable">Responsable *</Label>
              <Input
                id="responsable"
                value={formData.responsable}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                placeholder="Nom du responsable"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                type="email"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="email@exemple.ci"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer la structure
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
