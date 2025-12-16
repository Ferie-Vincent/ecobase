import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreatePartenaireModal } from "@/components/admin/modals/CreatePartenaireModal";
import { EditOrganisationModal } from "@/components/admin/modals/EditOrganisationModal";
import { ViewOrganisationModal } from "@/components/admin/modals/ViewOrganisationModal";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Search, Plus, Eye, FileEdit, Trash2, CheckCircle, Globe, MapPin } from "lucide-react";
import { Organisation } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useData, Partner } from "@/contexts/DataContext";

export default function Partenaires() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; org: Organisation | null }>({ open: false, org: null });
  const { hasRole } = useAuth();
  const { toast } = useToast();
  const { partners, updatePartner, removePartner } = useData();

  // Convert Partner to Organisation for compatibility with existing modals
  const partenaires = partners.filter(p => 
    p.type === "International" || p.type === "Internationale" || p.type === "PTF" || p.type === "Régional"
  ).map(p => ({
    id: p.id,
    nom: p.nom,
    sigle: p.sigle,
    type: p.type as Organisation["type"],
    siege: "",
    statut: p.statut,
    convention: false
  }));
  
  const filteredPartenaires = partenaires.filter(org =>
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
    const partner: Partner = {
      id: updatedOrg.id,
      nom: updatedOrg.nom,
      sigle: updatedOrg.sigle,
      type: updatedOrg.type as Partner["type"],
      statut: updatedOrg.statut
    };
    updatePartner(partner);
    toast({
      title: "Partenaire mis à jour",
      description: "Le partenaire a été mis à jour avec succès.",
    });
  };

  const confirmDelete = (org: Organisation) => {
    setDeleteDialog({ open: true, org });
  };

  const handleDelete = () => {
    if (deleteDialog.org) {
      removePartner(deleteDialog.org.id);
      toast({
        title: "Partenaire supprimé",
        description: `${deleteDialog.org.nom} a été supprimé avec succès.`,
      });
      setDeleteDialog({ open: false, org: null });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Internationale":
      case "International": return "bg-blue-500/10 text-blue-600";
      case "Régionale":
      case "Régional": return "bg-primary/10 text-primary";
      case "PTF": return "bg-accent/10 text-accent-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Partenaires Techniques & Financiers</h1>
          <p className="text-muted-foreground">Organisations internationales et partenaires au développement</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau partenaire
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un partenaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">{filteredPartenaires.length} résultats</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartenaires.map((partenaire) => (
          <Card key={partenaire.id} className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{partenaire.type}</Badge>
                  {partenaire.convention && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Conv.
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg mt-3">{partenaire.nom}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mt-1">{partenaire.sigle}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3 space-y-2">
              {partenaire.siege && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{partenaire.siege}</span>
                </div>
              )}
              <Badge variant={partenaire.statut === "Actif" ? "default" : "outline"}>
                {partenaire.statut}
              </Badge>
            </CardContent>
            <CardFooter className="pt-3 border-t border-border/50">
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm" onClick={() => handleView(partenaire)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </Button>
                {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(partenaire)}>
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(partenaire)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreatePartenaireModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
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
        title="Supprimer le partenaire"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteDialog.org?.nom}" ? Cette action est irréversible.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}