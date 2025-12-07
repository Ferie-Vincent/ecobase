import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateStructureModal } from "@/components/admin/modals/CreateStructureModal";
import { EditStructureInterneModal } from "@/components/admin/modals/EditStructureInterneModal";
import { ViewStructureInterneModal } from "@/components/admin/modals/ViewStructureInterneModal";
import { structures_internes as initialStructures, StructureInterne } from "@/data/seedData";
import { Plus, Users, Search, Eye, FileEdit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function StructuresInternes() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState<StructureInterne | null>(null);
  const [structures, setStructures] = useState<StructureInterne[]>(initialStructures);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleDelete = (id: string) => {
    setStructures(structures.filter(s => s.id !== id));
    toast({
      title: "Structure supprimée",
      description: "La structure a été supprimée avec succès.",
    });
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

      <Card>
        <CardHeader>
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Domaine</TableHead>
                <TableHead>Point focal</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStructures.map((structure) => (
                <TableRow key={structure.id}>
                  <TableCell className="font-medium">{structure.nom}</TableCell>
                  <TableCell>{getTypeBadge(structure.type)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{structure.domaine}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{structure.point_focal}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(structure)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasRole("SPSE_ADMIN") && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(structure)}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(structure.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
    </div>
  );
}
