import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateStructureModal } from "@/components/admin/modals/CreateStructureModal";
import { EditOrganisationModal } from "@/components/admin/modals/EditOrganisationModal";
import { ViewOrganisationModal } from "@/components/admin/modals/ViewOrganisationModal";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Search, Plus, Eye, FileEdit, Trash2, Landmark, User } from "lucide-react";
import { organisations as initialOrgs, Organisation } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function StructuresNationales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);
  const [organisations, setOrganisations] = useState<Organisation[]>(initialOrgs);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; org: Organisation | null }>({ open: false, org: null });
  const { hasRole } = useAuth();
  const { toast } = useToast();

  const structuresNationales = organisations.filter(org => org.type === "Nationale");
  
  const filteredStructures = structuresNationales.filter(org =>
    org.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.sigle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (org: Organisation) => {
    setSelectedOrg(org);
    setIsViewModalOpen(true);
  };

  const handleEdit = (org: Organisation) => {
    setSelectedOrg(org);
    setIsEditModalOpen(true);
    setIsViewModalOpen(false);
  };

  const handleSave = (updatedOrg: Organisation) => {
    setOrganisations(organisations.map(o => o.id === updatedOrg.id ? updatedOrg : o));
  };

  const confirmDelete = (org: Organisation) => {
    setDeleteDialog({ open: true, org });
  };

  const handleDelete = () => {
    if (deleteDialog.org) {
      setOrganisations(organisations.filter(o => o.id !== deleteDialog.org!.id));
      toast({
        title: "Structure supprimée",
        description: `${deleteDialog.org.nom} a été supprimée avec succès.`,
      });
      setDeleteDialog({ open: false, org: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Structures nationales</h1>
          <p className="text-muted-foreground">Ministères, directions et services nationaux</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle structure
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une structure..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">{filteredStructures.length} résultats</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStructures.map((structure) => (
          <Card key={structure.id} className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Landmark className="h-6 w-6 text-secondary" />
                </div>
                <Badge variant={structure.statut === "Actif" ? "default" : "outline"}>
                  {structure.statut}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{structure.nom}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mt-1">{structure.sigle}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3 space-y-2">
              {structure.responsable && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{structure.responsable}</span>
                </div>
              )}
              {structure.contact && (
                <p className="text-sm text-muted-foreground">{structure.contact}</p>
              )}
            </CardContent>
            <CardFooter className="pt-3 border-t border-border/50">
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm" onClick={() => handleView(structure)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </Button>
                {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(structure)}>
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(structure)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateStructureModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} type="nationale" />
      <EditOrganisationModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
        organisation={selectedOrg} 
        onSave={handleSave} 
      />
      <ViewOrganisationModal 
        open={isViewModalOpen} 
        onOpenChange={setIsViewModalOpen} 
        organisation={selectedOrg} 
        onEdit={() => handleEdit(selectedOrg!)}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, org: null })}
        title="Supprimer la structure"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteDialog.org?.nom}" ? Cette action est irréversible.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
