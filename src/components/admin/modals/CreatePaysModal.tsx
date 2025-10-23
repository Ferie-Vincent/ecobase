import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreatePaysModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePaysModal({ open, onOpenChange }: CreatePaysModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    code: "",
    organisation: "",
    dateAdhesion: "",
    statut: "Membre",
    representant: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Pays membre ajouté",
      description: `Le pays "${formData.nom}" a été ajouté avec succès.`,
    });
    
    onOpenChange(false);
    setFormData({
      nom: "",
      code: "",
      organisation: "",
      dateAdhesion: "",
      statut: "Membre",
      representant: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Associer un pays membre</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom du pays *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Ex: Ghana"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Code ISO *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="Ex: GH"
                maxLength={2}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organisation">Organisation *</Label>
            <Select value={formData.organisation} onValueChange={(value) => setFormData({ ...formData, organisation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une organisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CEDEAO">CEDEAO</SelectItem>
                <SelectItem value="UEMOA">UEMOA</SelectItem>
                <SelectItem value="UA">Union Africaine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateAdhesion">Date d'adhésion</Label>
              <Input
                id="dateAdhesion"
                type="date"
                value={formData.dateAdhesion}
                onChange={(e) => setFormData({ ...formData, dateAdhesion: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statut">Statut *</Label>
              <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fondateur">Fondateur</SelectItem>
                  <SelectItem value="Membre">Membre</SelectItem>
                  <SelectItem value="Observateur">Observateur</SelectItem>
                  <SelectItem value="Suspendu">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="representant">Représentant national</Label>
            <Input
              id="representant"
              value={formData.representant}
              onChange={(e) => setFormData({ ...formData, representant: e.target.value })}
              placeholder="Nom du représentant"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Associer le pays
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
