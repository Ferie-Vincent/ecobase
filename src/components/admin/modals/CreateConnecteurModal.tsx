import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreateConnecteurModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateConnecteurModal({ open, onOpenChange }: CreateConnecteurModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    url: "",
    indicateurCible: "",
    frequence: "Mensuelle",
    actif: true,
    apiKey: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Connecteur créé",
      description: `Le connecteur "${formData.nom}" a été créé avec succès.`,
    });
    
    onOpenChange(false);
    setFormData({
      nom: "",
      url: "",
      indicateurCible: "",
      frequence: "Mensuelle",
      actif: true,
      apiKey: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer un connecteur API</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du connecteur *</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Ex: CEDEAO API"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL de l'API *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://api.example.com/v1/data"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="indicateurCible">Indicateur cible *</Label>
            <Select value={formData.indicateurCible} onValueChange={(value) => setFormData({ ...formData, indicateurCible: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un indicateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slec_exportations_valeur">Exportations SLEC</SelectItem>
                <SelectItem value="slec_part_exportations_intra">Part SLEC</SelectItem>
                <SelectItem value="transferts_diaspora_part_pib">Transferts diaspora</SelectItem>
                <SelectItem value="voyageurs_aeriens_cedeao_nb">Voyageurs aériens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequence">Fréquence de synchronisation *</Label>
            <Select value={formData.frequence} onValueChange={(value) => setFormData({ ...formData, frequence: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Horaire">Horaire</SelectItem>
                <SelectItem value="Quotidienne">Quotidienne</SelectItem>
                <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                <SelectItem value="Mensuelle">Mensuelle</SelectItem>
                <SelectItem value="Trimestrielle">Trimestrielle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Clé API (optionnel)</Label>
            <Input
              id="apiKey"
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              placeholder="••••••••••••••••"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="actif">Activer le connecteur</Label>
              <p className="text-sm text-muted-foreground">
                Démarrer la synchronisation automatique
              </p>
            </div>
            <Switch
              id="actif"
              checked={formData.actif}
              onCheckedChange={(checked) => setFormData({ ...formData, actif: checked })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le connecteur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
