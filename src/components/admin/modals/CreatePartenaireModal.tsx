import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreatePartenaireModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePartenaireModal({ open, onOpenChange }: CreatePartenaireModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    sigle: "",
    domaine: "",
    convention: false,
    contact: "",
    statut: "Actif"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Partenaire créé",
      description: `Le partenaire "${formData.nom}" a été créé avec succès.`,
    });
    
    onOpenChange(false);
    setFormData({
      nom: "",
      sigle: "",
      domaine: "",
      convention: false,
      contact: "",
      statut: "Actif"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer un partenaire technique & financier</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Ex: Organisation Internationale pour les Migrations"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sigle">Sigle *</Label>
              <Input
                id="sigle"
                value={formData.sigle}
                onChange={(e) => setFormData({ ...formData, sigle: e.target.value })}
                placeholder="Ex: OIM"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domaine">Domaine d'appui *</Label>
            <Select value={formData.domaine} onValueChange={(value) => setFormData({ ...formData, domaine: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Migration">Migration</SelectItem>
                <SelectItem value="Intégration">Intégration</SelectItem>
                <SelectItem value="Développement">Développement</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Technique">Technique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="convention">Convention signée</Label>
              <p className="text-sm text-muted-foreground">
                Une convention de partenariat a été signée
              </p>
            </div>
            <Switch
              id="convention"
              checked={formData.convention}
              onCheckedChange={(checked) => setFormData({ ...formData, convention: checked })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                type="email"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="contact@partenaire.org"
              />
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
              Créer le partenaire
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
