import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Shield, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Parametres() {
  const { hasRole } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">Configuration générale du système ECOBASE</p>
      </div>

      {/* Informations générales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Informations générales
          </CardTitle>
          <CardDescription>Configuration de base de l'application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="app-title">Titre de l'application</Label>
              <Input id="app-title" defaultValue="ECOBASE" disabled={!hasRole("SPSE_ADMIN")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input id="version" defaultValue="1.0" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Organisme propriétaire</Label>
              <Input id="owner" defaultValue="SPSE / Ministère délégué" disabled={!hasRole("SPSE_ADMIN")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">Licence</Label>
              <Input id="license" defaultValue="CC-BY 4.0" disabled />
            </div>
          </div>
          {hasRole("SPSE_ADMIN") && (
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité
          </CardTitle>
          <CardDescription>Paramètres de sécurité et authentification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Durée de session</Label>
              <p className="text-sm text-muted-foreground">Temps avant déconnexion automatique</p>
            </div>
            <Input type="number" defaultValue="30" className="w-24" disabled={!hasRole("SPSE_ADMIN")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Double authentification</Label>
              <p className="text-sm text-muted-foreground">Activer la 2FA pour tous les utilisateurs</p>
            </div>
            <Switch disabled={!hasRole("SPSE_ADMIN")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Logs d'audit</Label>
              <p className="text-sm text-muted-foreground">Enregistrer toutes les actions</p>
            </div>
            <Switch defaultChecked disabled={!hasRole("SPSE_ADMIN")} />
          </div>
        </CardContent>
      </Card>

      {/* Listes de valeurs */}
      <Card>
        <CardHeader>
          <CardTitle>Listes de valeurs</CardTitle>
          <CardDescription>Référentiels et valeurs paramétrables</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Statuts disponibles</Label>
            <div className="flex flex-wrap gap-2">
              <Badge>Brouillon</Badge>
              <Badge className="bg-amber-500">En validation</Badge>
              <Badge variant="secondary">Validé SPSE</Badge>
              <Badge className="bg-secondary">Publié</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Types d'organisation</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Régionale</Badge>
              <Badge variant="outline">Internationale</Badge>
              <Badge variant="outline">Nationale</Badge>
              <Badge variant="outline">Interne</Badge>
              <Badge variant="outline">PTF</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Fréquences</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Mensuelle</Badge>
              <Badge variant="outline">Trimestrielle</Badge>
              <Badge variant="outline">Annuelle</Badge>
            </div>
          </div>
          {hasRole("SPSE_ADMIN") && (
            <Button variant="outline">
              Gérer les listes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Langue */}
      <Card>
        <CardHeader>
          <CardTitle>Langue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Langue par défaut</Label>
              <p className="text-sm text-muted-foreground">Français (FR)</p>
            </div>
            <Badge variant="outline">FR</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
