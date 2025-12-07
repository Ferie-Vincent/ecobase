import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Organisation } from "@/data/seedData";

interface EditOrganisationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organisation: Organisation | null;
  onSave: (organisation: Organisation) => void;
}

export function EditOrganisationModal({ open, onOpenChange, organisation, onSave }: EditOrganisationModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Organisation>({
    id: "",
    nom: "",
    sigle: "",
    type: "Nationale",
    statut: "Actif",
    responsable: "",
    contact: "",
    siege: "",
    site_web: "",
    convention: false
  });

  useEffect(() => {
    if (organisation) {
      setFormData(organisation);
    }
  }, [organisation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Organisation modifiée",
      description: `L'organisation "${formData.nom}" a été mise à jour.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Modifier l'organisation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sigle">Sigle *</Label>
              <Input
                id="sigle"
                value={formData.sigle}
                onChange={(e) => setFormData({ ...formData, sigle: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Nationale">Nationale</SelectItem>
                  <SelectItem value="Régionale">Régionale</SelectItem>
                  <SelectItem value="Internationale">Internationale</SelectItem>
                  <SelectItem value="PTF">PTF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select value={formData.statut} onValueChange={(value: "Actif" | "Inactif") => setFormData({ ...formData, statut: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsable">Responsable</Label>
              <Input
                id="responsable"
                value={formData.responsable || ""}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                type="email"
                value={formData.contact || ""}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siege">Siège</Label>
              <Input
                id="siege"
                value={formData.siege || ""}
                onChange={(e) => setFormData({ ...formData, siege: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_web">Site Web</Label>
              <Input
                id="site_web"
                value={formData.site_web || ""}
                onChange={(e) => setFormData({ ...formData, site_web: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="convention"
              checked={formData.convention || false}
              onChange={(e) => setFormData({ ...formData, convention: e.target.checked })}
              className="h-4 w-4"
            />
            <Label htmlFor="convention">Convention signée</Label>
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
