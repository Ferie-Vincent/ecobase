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
import { Search, Plus, Eye, FileEdit, CheckCircle } from "lucide-react";
import { organisations } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";

export default function Partenaires() {
  const [searchTerm, setSearchTerm] = useState("");
  const { hasRole } = useAuth();

  const partenaires = organisations.filter(org => 
    org.type === "Internationale" || org.type === "PTF"
  );
  
  const filteredPartenaires = partenaires.filter(org =>
    org.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.sigle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Partenaires Techniques & Financiers</h1>
          <p className="text-muted-foreground">Organisations internationales et partenaires au développement</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button>
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
