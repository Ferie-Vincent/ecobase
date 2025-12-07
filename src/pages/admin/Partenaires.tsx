import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreatePartenaireModal } from "@/components/admin/modals/CreatePartenaireModal";
import { EditOrganisationModal } from "@/components/admin/modals/EditOrganisationModal";
import { ViewOrganisationModal } from "@/components/admin/modals/ViewOrganisationModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, FileEdit, Trash2, CheckCircle } from "lucide-react";
import { organisations as initialOrgs, Organisation } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Partenaires() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);
  const [organisations, setOrganisations] = useState<Organisation[]>(initialOrgs);
  const { hasRole } = useAuth();
  const { toast } = useToast();

  const partenaires = organisations.filter(org => 
    org.type === "Internationale" || org.type === "PTF" || org.type === "Régionale"
  );
  
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
    setOrganisations(organisations.map(o => o.id === updatedOrg.id ? updatedOrg : o));
  };

  const handleDelete = (id: string) => {
    setOrganisations(organisations.filter(o => o.id !== id));
    toast({
      title: "Partenaire supprimé",
      description: "Le partenaire a été supprimé avec succès.",
    });
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

      <Card>
        <CardHeader>
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Sigle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Siège</TableHead>
                <TableHead>Convention</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartenaires.map((partenaire) => (
                <TableRow key={partenaire.id}>
                  <TableCell className="font-medium">{partenaire.nom}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{partenaire.sigle}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{partenaire.type}</Badge>
                  </TableCell>
                  <TableCell>{partenaire.siege || "-"}</TableCell>
                  <TableCell>
                    {partenaire.convention ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Oui
                      </Badge>
                    ) : (
                      <Badge variant="outline">Non</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={partenaire.statut === "Actif" ? "default" : "outline"}>
                      {partenaire.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(partenaire)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(partenaire)}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(partenaire.id)}>
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
    </div>
  );
}
