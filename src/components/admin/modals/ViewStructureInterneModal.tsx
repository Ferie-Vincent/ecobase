import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StructureInterne } from "@/data/seedData";

interface ViewStructureInterneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  structure: StructureInterne | null;
  onEdit: () => void;
}

export function ViewStructureInterneModal({ open, onOpenChange, structure, onEdit }: ViewStructureInterneModalProps) {
  if (!structure) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Détails de la structure</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground text-sm">ID</Label>
              <p className="font-medium">{structure.id}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Type</Label>
              <p className="font-medium capitalize">{structure.type}</p>
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Nom complet</Label>
            <p className="font-medium">{structure.nom}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground text-sm">Domaine</Label>
              <p className="font-medium">{structure.domaine}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Point focal</Label>
              <p className="font-medium">{structure.point_focal}</p>
            </div>
          </div>

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
