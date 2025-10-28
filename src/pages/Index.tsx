import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Users, TrendingUp, FileText, BookOpen } from "lucide-react";
import { metadata, organizations, pillars } from "@/data/metadata";
import { indicators } from "@/data/indicators";

const Index = () => {
  const indicatorsByPillar = {
    INT: indicators.filter(i => i.pillar === "INT").length,
    DIA: indicators.filter(i => i.pillar === "DIA").length,
    MACRO: indicators.filter(i => i.pillar === "MACRO").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ECOBASE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plateforme de données pour le suivi et l'évaluation des politiques publiques
          </p>
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-base text-foreground/90 leading-relaxed">
              ECOBASE est la base de données officielle du{" "}
              <strong>Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur</strong>.
              Elle centralise les indicateurs socio-économiques et techniques permettant le suivi et l'évaluation 
              de deux politiques majeures : <strong>l'Intégration Africaine</strong> et la{" "}
              <strong>Gestion des Ivoiriens de l'Extérieur</strong>.
            </p>
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            <Badge variant="outline" className="text-sm">
              Version {metadata.version}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {metadata.license}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Mis à jour: {metadata.updated_at}
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-hover">
            <CardHeader>
              <Database className="w-8 h-8 text-primary mb-2" />
              <CardTitle>{indicators.length}</CardTitle>
              <CardDescription>Indicateurs catalogués</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>{organizations.length}</CardTitle>
              <CardDescription>Organisations partenaires</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <CardTitle>{pillars.length}</CardTitle>
              <CardDescription>Piliers stratégiques</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-2" />
              <CardTitle>MERISE</CardTitle>
              <CardDescription>Méthodologie de conception</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pillars Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Piliers Stratégiques
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.id} className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pillar.label}
                    <Badge variant="secondary">
                      {indicatorsByPillar[pillar.id as keyof typeof indicatorsByPillar]} indicateurs
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {pillar.id === "INT" && "Mesure de l'intégration régionale et du commerce intra-africain"}
                    {pillar.id === "DIA" && "Suivi des Ivoiriens de l'extérieur et de la diaspora"}
                    {pillar.id === "MACRO" && "Indicateurs macroéconomiques et transversaux"}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Organizations Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Organisations Contributeurs
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizations.map((org) => (
                  <div key={org.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <p className="font-semibold text-sm">{org.id}</p>
                    <p className="text-xs text-muted-foreground">{org.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="mt-12 bg-gradient-subtle">
          <CardHeader>
            <CardTitle>À propos d'ECOBASE</CardTitle>
            <CardDescription>
              ECOBASE est conçue selon la méthodologie MERISE pour assurer une gestion rigoureuse des données 
              socio-économiques liées à l'intégration africaine. Cette base centralise les indicateurs clés 
              permettant le suivi et l'évaluation des politiques d'intégration régionale et de gestion de la diaspora.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold mb-1">Propriétaire</p>
              <p className="text-sm text-muted-foreground">
                {metadata.owner_org}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Gestionnaire de la plateforme</p>
              <p className="text-sm text-muted-foreground">
                Service Planification & Suivi-Evaluation (SPSE)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Le SPSE assure la collecte, la validation et la diffusion des statistiques et indicateurs 
                sectoriels en lien avec les missions du ministère.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
