import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateProgrammeModal } from "@/components/admin/modals/CreateProgrammeModal";
import { EditProgrammeModal } from "@/components/admin/modals/EditProgrammeModal";
import { ViewProgrammeModal } from "@/components/admin/modals/ViewProgrammeModal";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { programmes as initialProgrammes, Programme } from "@/data/seedData";
import { Plus, Calendar, DollarSign, Search, Eye, FileEdit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Programmes() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [programmes, setProgrammes] = useState<Programme[]>(initialProgrammes);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; programme: Programme | null }>({ open: false, programme: null });
  const { hasRole } = useAuth();
  const { toast } = useToast();

  const filteredProgrammes = programmes.filter(p =>
    p.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.domaine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatutBadge = (statut: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "En cours": "default",
      "Planifié": "secondary",
      "Clôturé": "outline"
    };
    return <Badge variant={variants[statut] || "outline"}>{statut}</Badge>;
  };

  const handleView = (programme: Programme) => {
    setSelectedProgramme(programme);
    setIsViewModalOpen(true);
  };

  const handleEdit = (programme: Programme) => {
    setSelectedProgramme(programme);
    setIsEditModalOpen(true);
    setIsViewModalOpen(false);
  };

  const handleSave = (updatedProgramme: Programme) => {
    setProgrammes(programmes.map(p => p.id === updatedProgramme.id ? updatedProgramme : p));
  };

  const confirmDelete = (programme: Programme) => {
    setDeleteDialog({ open: true, programme });
  };

  const handleDelete = () => {
    if (deleteDialog.programme) {
      setProgrammes(programmes.filter(p => p.id !== deleteDialog.programme!.id));
      toast({
        title: "Programme supprimé",
        description: `${deleteDialog.programme.titre} a été supprimé avec succès.`,
      });
      setDeleteDialog({ open: false, programme: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Programmes & Projets</h1>
          <p className="text-muted-foreground">Gestion des programmes de développement</p>
        </div>
        {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau programme
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un programme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline">{filteredProgrammes.length} résultats</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Domaine</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProgrammes.map((programme) => (
                <TableRow key={programme.id}>
                  <TableCell className="font-medium max-w-xs truncate">{programme.titre}</TableCell>
                  <TableCell>
                    <Badge>{programme.domaine}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(programme.debut).toLocaleDateString('fr-FR', { year: 'numeric' })} - {new Date(programme.fin).toLocaleDateString('fr-FR', { year: 'numeric' })}
                  </TableCell>
                  <TableCell className="font-mono">
                    {programme.budget ? `${(programme.budget / 1000000000).toFixed(1)} Mds` : "-"}
                  </TableCell>
                  <TableCell>{getStatutBadge(programme.statut)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(programme)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(programme)}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDelete(programme)}>
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

      <CreateProgrammeModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      <EditProgrammeModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
        programme={selectedProgramme} 
        onSave={handleSave} 
      />
      <ViewProgrammeModal 
        open={isViewModalOpen} 
        onOpenChange={setIsViewModalOpen} 
        programme={selectedProgramme} 
        onEdit={() => handleEdit(selectedProgramme!)}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, programme: null })}
        title="Supprimer le programme"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteDialog.programme?.titre}" ? Cette action est irréversible.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
