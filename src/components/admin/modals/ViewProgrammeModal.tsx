import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Programme } from "@/data/seedData";
import { Calendar, DollarSign } from "lucide-react";

interface ViewProgrammeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programme: Programme | null;
  onEdit: () => void;
}

export function ViewProgrammeModal({ open, onOpenChange, programme, onEdit }: ViewProgrammeModalProps) {
  if (!programme) return null;

  const getStatutBadge = (statut: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "En cours": "default",
      "Planifié": "secondary",
      "Clôturé": "outline"
    };
    return <Badge variant={variants[statut] || "outline"}>{statut}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Détails du programme</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge>{programme.domaine}</Badge>
            {getStatutBadge(programme.statut)}
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Titre</Label>
            <p className="font-medium text-lg">{programme.titre}</p>
          </div>

          {programme.description && (
            <div>
              <Label className="text-muted-foreground text-sm">Description</Label>
              <p className="text-foreground">{programme.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-muted-foreground text-sm">Période</Label>
                <p className="font-medium">
                  {new Date(programme.debut).toLocaleDateString('fr-FR')} - {new Date(programme.fin).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            {programme.budget && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-muted-foreground text-sm">Budget</Label>
                  <p className="font-medium font-mono">
                    {(programme.budget / 1000000000).toFixed(1)} Mds FCFA
                  </p>
                </div>
              </div>
            )}
          </div>

          {programme.acteurs_ids && programme.acteurs_ids.length > 0 && (
            <div>
              <Label className="text-muted-foreground text-sm">Acteurs impliqués</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {programme.acteurs_ids.map(id => (
                  <Badge key={id} variant="outline">{id}</Badge>
                ))}
              </div>
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
