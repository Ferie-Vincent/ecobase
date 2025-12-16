import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateStructureModal } from "@/components/admin/modals/CreateStructureModal";
import { EditStructureInterneModal } from "@/components/admin/modals/EditStructureInterneModal";
import { ViewStructureInterneModal } from "@/components/admin/modals/ViewStructureInterneModal";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { structures_internes as initialStructures, StructureInterne } from "@/data/seedData";
import { Plus, Search, Eye, FileEdit, Trash2, Building2, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function StructuresInternes() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState<StructureInterne | null>(null);
  const [structures, setStructures] = useState<StructureInterne[]>(initialStructures);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; structure: StructureInterne | null }>({ open: false, structure: null });
  const { hasRole } = useAuth();
  const { toast } = useToast();

  const filteredStructures = structures.filter(s =>
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.domaine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.point_focal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "service": "outline",
      "générale": "default",
      "technique": "secondary"
    };
    return <Badge variant={variants[type] || "outline"}>{type}</Badge>;
  };

  const handleView = (structure: StructureInterne) => {
    setSelectedStructure(structure);
    setIsViewModalOpen(true);
  };

  const handleEdit = (structure: StructureInterne) => {
    setSelectedStructure(structure);
    setIsEditModalOpen(true);
    setIsViewModalOpen(false);
  };

  const handleSave = (updatedStructure: StructureInterne) => {
    setStructures(structures.map(s => s.id === updatedStructure.id ? updatedStructure : s));
  };

  const confirmDelete = (structure: StructureInterne) => {
    setDeleteDialog({ open: true, structure });
  };

  const handleDelete = () => {
    if (deleteDialog.structure) {
      setStructures(structures.filter(s => s.id !== deleteDialog.structure!.id));
      toast({
        title: "Structure supprimée",
        description: `${deleteDialog.structure.nom} a été supprimée avec succès.`,
      });
      setDeleteDialog({ open: false, structure: null });
    }
  };

  const handleCreate = (newStructure: StructureInterne) => {
    const structure: StructureInterne = {
      ...newStructure,
      id: `INT-${Date.now()}`
    };
    setStructures([...structures, structure]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Structures internes</h1>
          <p className="text-muted-foreground">SPSE, DGPI, DGIE et directions techniques</p>
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
                <div className="p-3 rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                {getTypeBadge(structure.type)}
              </div>
              <CardTitle className="text-lg mt-3">{structure.nom}</CardTitle>
              <CardDescription className="line-clamp-2">
                Domaine: {structure.domaine}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Point focal: {structure.point_focal}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-3 border-t border-border/50">
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm" onClick={() => handleView(structure)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </Button>
                {hasRole("SPSE_ADMIN") && (
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

      <CreateStructureModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} type="interne" />
      <EditStructureInterneModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
        structure={selectedStructure} 
        onSave={handleSave} 
      />
      <ViewStructureInterneModal 
        open={isViewModalOpen} 
        onOpenChange={setIsViewModalOpen} 
        structure={selectedStructure} 
        onEdit={() => handleEdit(selectedStructure!)}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, structure: null })}
        title="Supprimer la structure"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteDialog.structure?.nom}" ? Cette action est irréversible.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
