import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateIndicateurModal } from "@/components/admin/modals/CreateIndicateurModal";
import { ExportMenu } from "@/components/ExportMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, FileEdit, Eye } from "lucide-react";
import { indicateurs } from "@/data/seedData";

export default function Indicateurs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredIndicateurs = indicateurs.filter(ind =>
    ind.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ind.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMethodeBadge = (methode: string) => {
    switch (methode) {
      case "Saisie":
        return <Badge variant="outline">Saisie</Badge>;
      case "API":
        return <Badge variant="default">API</Badge>;
      case "Calcul":
        return <Badge variant="secondary">Calcul</Badge>;
      default:
        return <Badge>{methode}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Indicateurs</h1>
          <p className="text-muted-foreground">Gestion des indicateurs ECOBASE</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel indicateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un indicateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline">{filteredIndicateurs.length} résultats</Badge>
            <ExportMenu
              data={filteredIndicateurs}
              columns={[
                { header: "ID", accessor: "id" },
                { header: "Nom", accessor: "nom" },
                { header: "Type", accessor: "type" },
                { header: "Unité", accessor: "unite" },
                { header: "Fréquence", accessor: "frequence" },
                { header: "Source", accessor: "source" },
                { header: "Méthode", accessor: "methode" }
              ]}
              filename="indicateurs-ecobase"
              title="Indicateurs ECOBASE"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead>Fréquence</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIndicateurs.map((indicateur) => (
                <TableRow key={indicateur.id}>
                  <TableCell className="font-mono text-xs max-w-[120px] truncate" title={indicateur.id}>
                    {indicateur.id}
                  </TableCell>
                  <TableCell className="font-medium max-w-[250px]">
                    <span className="block whitespace-normal leading-tight" title={indicateur.nom}>
                      {indicateur.nom}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{indicateur.type}</Badge>
                  </TableCell>
                  <TableCell>{indicateur.unite}</TableCell>
                  <TableCell>{indicateur.frequence}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[120px] truncate" title={indicateur.source}>
                    {indicateur.source}
                  </TableCell>
                  <TableCell>{getMethodeBadge(indicateur.methode)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateIndicateurModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  );
}
