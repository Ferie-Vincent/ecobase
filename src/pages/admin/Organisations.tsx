import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Eye, FileEdit, Globe } from "lucide-react";
import { organisations } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";

export default function Organisations() {
  const [searchTerm, setSearchTerm] = useState("");
  const { hasRole } = useAuth();

  const filteredOrganisations = organisations.filter(org =>
    org.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.sigle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "Régionale": "default",
      "Internationale": "secondary",
      "Nationale": "outline"
    };
    return <Badge variant={variants[type] || "outline"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organisations régionales & internationales</h1>
          <p className="text-muted-foreground">Gestion des organisations partenaires</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle organisation
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une organisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline">{filteredOrganisations.length} résultats</Badge>
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
                <TableHead>Statut</TableHead>
                <TableHead>Pays membres</TableHead>
                <TableHead>Représentant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganisations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.nom}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.sigle}</Badge>
                  </TableCell>
                  <TableCell>{getTypeBadge(org.type)}</TableCell>
                  <TableCell>{org.siege || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={org.statut === "Actif" ? "default" : "outline"}>
                      {org.statut}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {org.pays_membres_ids ? (
                      <Badge variant="secondary" className="gap-1">
                        <Globe className="h-3 w-3" />
                        {org.pays_membres_ids.length}
                      </Badge>
                    ) : "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {org.representant_national || "-"}
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
    </div>
  );
}
