import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateStructureModal } from "@/components/admin/modals/CreateStructureModal";
import { structures_internes } from "@/data/seedData";
import { Plus, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function StructuresInternes() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { hasRole } = useAuth();

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "service": "outline",
      "générale": "default",
      "technique": "secondary"
    };
    return <Badge variant={variants[type] || "outline"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Structures internes</h1>
          <p className="text-muted-foreground">SPSE, DGPI, DGIE et directions techniques</p>
        </div>
        {hasRole("SPSE_ADMIN") && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle structure
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {structures_internes.map((structure) => (
          <Card key={structure.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{structure.nom}</h3>
                  <div className="flex gap-2">
                    {getTypeBadge(structure.type)}
                    <Badge variant="secondary">{structure.domaine}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Point focal:</span>
                  <span className="font-medium">{structure.point_focal}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  Voir détails
                </Button>
                {hasRole("SPSE_ADMIN") && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateStructureModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} type="interne" />
    </div>
  );
}
