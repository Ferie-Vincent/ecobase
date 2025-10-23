import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreateUtilisateurModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUtilisateurModal({ open, onOpenChange }: CreateUtilisateurModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    structure: "",
    role: "",
    statut: "Actif"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Utilisateur créé",
      description: `L'utilisateur "${formData.nom}" a été créé avec succès.`,
    });
    
    onOpenChange(false);
    setFormData({
      nom: "",
      email: "",
      structure: "",
      role: "",
      statut: "Actif"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer un utilisateur</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Ex: Jean Kouassi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jean.kouassi@exemple.ci"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="structure">Structure *</Label>
            <Select value={formData.structure} onValueChange={(value) => setFormData({ ...formData, structure: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INT-SPSE">SPSE</SelectItem>
                <SelectItem value="INT-DGPI">DGPI</SelectItem>
                <SelectItem value="INT-DGIE">DGIE</SelectItem>
                <SelectItem value="DBDES">DBDES</SelectItem>
                <SelectItem value="DAFER">DAFER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rôle *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SPSE_ADMIN">Admin SPSE</SelectItem>
                  <SelectItem value="DIRECTION">Direction</SelectItem>
                  <SelectItem value="POINT_FOCAL">Point Focal</SelectItem>
                  <SelectItem value="LECTEUR">Lecteur</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer l'utilisateur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
