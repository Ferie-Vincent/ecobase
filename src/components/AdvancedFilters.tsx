import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdvancedFiltersProps {
  selectedObjectif: string;
  selectedStatut: string;
  onObjectifChange: (value: string) => void;
  onStatutChange: (value: string) => void;
  onReset: () => void;
  objectifsOptions: string[];
}

export const AdvancedFilters = ({
  selectedObjectif,
  selectedStatut,
  onObjectifChange,
  onStatutChange,
  onReset,
  objectifsOptions
}: AdvancedFiltersProps) => {
  const hasActiveFilters = selectedObjectif !== "tous" || selectedStatut !== "tous";

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Filtres Avancés</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="objectif-filter" className="text-sm">Type d'Objectif</Label>
          <Select value={selectedObjectif} onValueChange={onObjectifChange}>
            <SelectTrigger id="objectif-filter" className="bg-background">
              <SelectValue placeholder="Tous les objectifs" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="tous">Tous les objectifs</SelectItem>
              {objectifsOptions.map((objectif) => (
                <SelectItem key={objectif} value={objectif}>
                  {objectif}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="statut-filter" className="text-sm">Statut</Label>
          <Select value={selectedStatut} onValueChange={onStatutChange}>
            <SelectTrigger id="statut-filter" className="bg-background">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="tous">Tous les statuts</SelectItem>
              <SelectItem value="atteint">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-500">Atteint</Badge>
                </div>
              </SelectItem>
              <SelectItem value="en_cours">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">En cours</Badge>
                </div>
              </SelectItem>
              <SelectItem value="risque">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="bg-orange-500">À risque</Badge>
                </div>
              </SelectItem>
              <SelectItem value="non_atteint">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Non atteint</Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedObjectif !== "tous" && (
            <Badge variant="secondary" className="gap-1">
              Objectif: {selectedObjectif.substring(0, 30)}...
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onObjectifChange("tous")}
              />
            </Badge>
          )}
          {selectedStatut !== "tous" && (
            <Badge variant="secondary" className="gap-1">
              Statut: {selectedStatut === "atteint" ? "Atteint" : 
                       selectedStatut === "en_cours" ? "En cours" : 
                       selectedStatut === "risque" ? "À risque" : "Non atteint"}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onStatutChange("tous")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
