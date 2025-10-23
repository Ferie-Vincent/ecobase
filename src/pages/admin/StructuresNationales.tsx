import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateStructureModal } from "@/components/admin/modals/CreateStructureModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Eye, FileEdit } from "lucide-react";
import { organisations } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";

export default function StructuresNationales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { hasRole } = useAuth();

  const structuresNationales = organisations.filter(org => org.type === "Nationale");
  
  const filteredStructures = structuresNationales.filter(org =>
    org.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.sigle.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
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
    </div>
  );
}
