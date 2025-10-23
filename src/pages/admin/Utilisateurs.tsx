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
import { Search, Plus, UserCog, Trash2 } from "lucide-react";
import { utilisateurs, structures_internes } from "@/data/seedData";
import { useAuth } from "@/contexts/AuthContext";

export default function Utilisateurs() {
  const [searchTerm, setSearchTerm] = useState("");
  const { hasRole } = useAuth();

  const filteredUtilisateurs = utilisateurs.filter(u =>
    u.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "SPSE_ADMIN": "default",
      "DIRECTION": "secondary",
      "POINT_FOCAL": "outline",
      "LECTEUR": "outline"
    };
    return <Badge variant={variants[role] || "outline"}>{role}</Badge>;
  };

  const getStructureName = (structureId: string) => {
    const structure = structures_internes.find(s => s.id === structureId);
    return structure?.nom || structureId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Utilisateurs & Rôles</h1>
          <p className="text-muted-foreground">Gestion des accès au backoffice</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel utilisateur
          </Button>
        )}
      </div>

      {/* Stats rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{utilisateurs.length}</div>
            <p className="text-sm text-muted-foreground">Total utilisateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{utilisateurs.filter(u => u.role === "SPSE_ADMIN").length}</div>
            <p className="text-sm text-muted-foreground">Administrateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{utilisateurs.filter(u => u.role === "DIRECTION").length}</div>
            <p className="text-sm text-muted-foreground">Directions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{utilisateurs.filter(u => u.statut === "Actif").length}</div>
            <p className="text-sm text-muted-foreground">Actifs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline">{filteredUtilisateurs.length} résultats</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Structure</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUtilisateurs.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nom}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="text-sm">{getStructureName(user.structure_id)}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant={user.statut === "Actif" ? "default" : "outline"}>
                      {user.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.derniere_activite ? new Date(user.derniere_activite).toLocaleDateString('fr-FR') : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {hasRole("SPSE_ADMIN") && (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
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
