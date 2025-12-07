import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateStructureModal } from "@/components/admin/modals/CreateStructureModal";
import { EditOrganisationModal } from "@/components/admin/modals/EditOrganisationModal";
import { ViewOrganisationModal } from "@/components/admin/modals/ViewOrganisationModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, FileEdit, Trash2 } from "lucide-react";
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

  const handleDelete = (id: string) => {
    setOrganisations(organisations.filter(o => o.id !== id));
    toast({
      title: "Structure supprimée",
      description: "La structure a été supprimée avec succès.",
    });
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
                <TableHead>Sigle</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStructures.map((structure) => (
                <TableRow key={structure.id}>
                  <TableCell className="font-medium">{structure.nom}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{structure.sigle}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{structure.responsable || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{structure.contact || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={structure.statut === "Actif" ? "default" : "outline"}>
                      {structure.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(structure)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
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
    </div>
  );
}
