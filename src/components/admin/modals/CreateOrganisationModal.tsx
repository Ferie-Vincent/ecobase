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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface CreateOrganisationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrganisationModal({ open, onOpenChange }: CreateOrganisationModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    sigle: "",
    type: "",
    siege: "",
    site_web: "",
    convention: false,
    representant_national: "",
    responsable: "",
    contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Organisation créée",
      description: `L'organisation "${formData.nom}" a été créée avec succès.`,
    });
    onOpenChange(false);
    setFormData({
      nom: "",
      sigle: "",
      type: "",
      siege: "",
      site_web: "",
      convention: false,
      representant_national: "",
      responsable: "",
      contact: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle organisation</DialogTitle>
          <DialogDescription>
            Ajouter une nouvelle organisation partenaire
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                placeholder="ex: Communauté Économique des États de l'Afrique de l'Ouest"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sigle">Sigle *</Label>
              <Input
                id="sigle"
                placeholder="ex: CEDEAO"
                value={formData.sigle}
                onChange={(e) => setFormData({ ...formData, sigle: e.target.value })}
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
                  <SelectItem value="Régionale">Régionale</SelectItem>
                  <SelectItem value="Internationale">Internationale</SelectItem>
                  <SelectItem value="Nationale">Nationale</SelectItem>
                  <SelectItem value="Interne">Interne</SelectItem>
                  <SelectItem value="PTF">Partenaire (PTF)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siege">Siège</Label>
              <Input
                id="siege"
                placeholder="ex: Abuja"
                value={formData.siege}
                onChange={(e) => setFormData({ ...formData, siege: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_web">Site web</Label>
              <Input
                id="site_web"
                type="url"
                placeholder="https://..."
                value={formData.site_web}
                onChange={(e) => setFormData({ ...formData, site_web: e.target.value })}
              />
            </div>

            {(formData.type === "Régionale" || formData.type === "Internationale" || formData.type === "PTF") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="representant">Représentant national</Label>
                  <Input
                    id="representant"
                    placeholder="ex: Ambassadeur N'Guessan"
                    value={formData.representant_national}
                    onChange={(e) => setFormData({ ...formData, representant_national: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="convention">Convention signée</Label>
                    <Switch
                      id="convention"
                      checked={formData.convention}
                      onCheckedChange={(checked) => setFormData({ ...formData, convention: checked })}
                    />
                  </div>
                </div>
              </>
            )}

            {formData.type === "Nationale" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input
                    id="responsable"
                    placeholder="ex: Direction DBDES"
                    value={formData.responsable}
                    onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="contact@exemple.ci"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer l'organisation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
