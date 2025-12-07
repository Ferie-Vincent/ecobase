import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreatePaysModal } from "@/components/admin/modals/CreatePaysModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pays as initialPays, organisations, Pays as PaysType } from "@/data/seedData";
import { Plus, Globe, Search, FileEdit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Pays() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPays, setSelectedPays] = useState<PaysType | null>(null);
  const [paysList, setPaysList] = useState<PaysType[]>(initialPays);
  const [searchTerm, setSearchTerm] = useState("");
  const { hasRole } = useAuth();
  const { toast } = useToast();

  const filteredPays = paysList.filter(p =>
    p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaysOrganisations = (code: string) => {
    return organisations.filter(org => 
      org.pays_membres_ids?.includes(code)
    );
  };

  const handleEdit = (pays: PaysType) => {
    setSelectedPays(pays);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (selectedPays) {
      setPaysList(paysList.map(p => p.code === selectedPays.code ? selectedPays : p));
      toast({
        title: "Pays modifié",
        description: `Le pays "${selectedPays.nom}" a été mis à jour.`,
      });
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = (code: string) => {
    setPaysList(paysList.filter(p => p.code !== code));
    toast({
      title: "Pays supprimé",
      description: "Le pays a été supprimé avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pays membres</h1>
          <p className="text-muted-foreground">Pays membres des organisations régionales</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Associer un pays
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline">{filteredPays.length} résultats</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pays</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Organisations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPays.map((p) => {
                const orgs = getPaysOrganisations(p.code);
                return (
                  <TableRow key={p.code}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        {p.nom}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {orgs.map(org => (
                          <Badge key={org.id} variant="secondary" className="text-xs">
                            {org.sigle}
                          </Badge>
                        ))}
                        {orgs.length === 0 && <span className="text-muted-foreground text-sm">Aucune</span>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {hasRole("SPSE_ADMIN") && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(p.code)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreatePaysModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Modifier le pays</DialogTitle>
          </DialogHeader>
          {selectedPays && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={selectedPays.code}
                  onChange={(e) => setSelectedPays({ ...selectedPays, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={selectedPays.nom}
                  onChange={(e) => setSelectedPays({ ...selectedPays, nom: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  Enregistrer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
