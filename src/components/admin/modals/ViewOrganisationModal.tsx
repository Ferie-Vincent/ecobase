import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Organisation } from "@/data/seedData";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";

interface ViewOrganisationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organisation: Organisation | null;
  onEdit: () => void;
}

export function ViewOrganisationModal({ open, onOpenChange, organisation, onEdit }: ViewOrganisationModalProps) {
  if (!organisation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Détails de l'organisation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-3 py-1">{organisation.sigle}</Badge>
            <Badge variant={organisation.statut === "Actif" ? "default" : "secondary"}>
              {organisation.statut}
            </Badge>
            <Badge variant="secondary">{organisation.type}</Badge>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Nom complet</Label>
            <p className="font-medium text-lg">{organisation.nom}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {organisation.responsable && (
              <div>
                <Label className="text-muted-foreground text-sm">Responsable</Label>
                <p className="font-medium">{organisation.responsable}</p>
              </div>
            )}
            {organisation.contact && (
              <div>
                <Label className="text-muted-foreground text-sm">Contact</Label>
                <p className="font-medium">{organisation.contact}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {organisation.siege && (
              <div>
                <Label className="text-muted-foreground text-sm">Siège</Label>
                <p className="font-medium">{organisation.siege}</p>
              </div>
            )}
            {organisation.representant_national && (
              <div>
                <Label className="text-muted-foreground text-sm">Représentant national</Label>
                <p className="font-medium">{organisation.representant_national}</p>
              </div>
            )}
          </div>

          {organisation.date_adhesion && (
            <div>
              <Label className="text-muted-foreground text-sm">Date d'adhésion</Label>
              <p className="font-medium">{new Date(organisation.date_adhesion).toLocaleDateString('fr-FR')}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {organisation.convention ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-muted-foreground" />
              )}
              <span>Convention {organisation.convention ? "signée" : "non signée"}</span>
            </div>
          </div>

          {organisation.site_web && (
            <div>
              <Label className="text-muted-foreground text-sm">Site Web</Label>
              <a 
                href={organisation.site_web} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                {organisation.site_web}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button onClick={onEdit}>
              Modifier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
