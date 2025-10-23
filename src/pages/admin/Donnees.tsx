import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Plus, CheckCircle, XCircle, Clock } from "lucide-react";
import { donnees, indicateurs } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";

export default function Donnees() {
  const [searchTerm, setSearchTerm] = useState("");
  const { hasRole } = useAuth();

  const filteredDonnees = donnees.filter(d => {
    const ind = indicateurs.find(i => i.id === d.indicateur_id);
    return ind?.nom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "Brouillon":
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Brouillon</Badge>;
      case "En validation":
        return <Badge className="gap-1 bg-amber-500"><Clock className="h-3 w-3" />En validation</Badge>;
      case "Validé SPSE":
        return <Badge variant="secondary" className="gap-1"><CheckCircle className="h-3 w-3" />Validé SPSE</Badge>;
      case "Publié":
        return <Badge className="gap-1 bg-secondary"><CheckCircle className="h-3 w-3" />Publié</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Données</h1>
          <p className="text-muted-foreground">Saisie, imports et gestion des valeurs</p>
        </div>
        {hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Saisir des données
          </Button>
        )}
      </div>

      {/* Stats rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donnees.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Brouillon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donnees.filter(d => d.statut === "Brouillon").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En validation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {donnees.filter(d => d.statut === "En validation").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Publiées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {donnees.filter(d => d.statut === "Publié").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par indicateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicateur</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonnees.map((donnee) => {
                const ind = indicateurs.find(i => i.id === donnee.indicateur_id);
                return (
                  <TableRow key={donnee.id}>
                    <TableCell className="font-medium">{ind?.nom}</TableCell>
                    <TableCell>{donnee.year}</TableCell>
                    <TableCell>{donnee.geo_region || "-"}</TableCell>
                    <TableCell className="font-mono">
                      {donnee.value.toLocaleString()} {donnee.unit}
                    </TableCell>
                    <TableCell>{getStatutBadge(donnee.statut)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{donnee.source_note}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {donnee.statut === "En validation" && hasRole(["SPSE_ADMIN", "DIRECTION"]) && (
                          <>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Valider
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <XCircle className="h-4 w-4" />
                              Rejeter
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
    </div>
  );
}
