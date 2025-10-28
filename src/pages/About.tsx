import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Network, Users2, Target, FileText } from "lucide-react";
import integrationPolicyImage from "@/assets/integration-policy.jpg";
import diasporaPolicyImage from "@/assets/diaspora-policy.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            À propos du Ministère
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Ministère Délégué auprès du Ministère des Affaires Étrangères, de l'Intégration Africaine 
            et des Ivoiriens de l'Extérieur, chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur
          </p>
        </div>

        {/* Missions principales */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Target className="w-8 h-8 text-primary" />
              Nos Missions
            </CardTitle>
            <CardDescription className="text-base">
              Le ministère assure deux missions stratégiques complémentaires
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mission 1 - Intégration */}
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={integrationPolicyImage} 
                  alt="Politique d'Intégration Africaine" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Intégration Africaine</h3>
                    <p className="text-sm text-white/90">
                      Promouvoir l'intégration régionale, harmoniser les politiques sectorielles, 
                      et renforcer la coopération économique et commerciale au sein de la CEDEAO et de l'UEMOA
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission 2 - Diaspora */}
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={diasporaPolicyImage} 
                  alt="Gestion des Ivoiriens de l'Extérieur" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Ivoiriens de l'Extérieur</h3>
                    <p className="text-sm text-white/90">
                      Accompagner et coordonner les initiatives visant le regroupement et l'organisation 
                      des Ivoiriens de l'extérieur, faciliter leur réinsertion et mobiliser leurs compétences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Structure organisationnelle */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            Structure Organisationnelle
          </h2>

          <div className="grid gap-6">
            {/* DGPI */}
            <Card className="card-hover border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Network className="w-6 h-6 text-primary" />
                  Direction Générale des Politiques d'Intégration (DGPI)
                </CardTitle>
                <CardDescription>
                  Coordinatrice des politiques d'intégration régionale et africaine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Attributions principales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Participation et harmonisation des instruments techniques et économiques d'intégration</li>
                      <li>Coordination des politiques sectorielles en matière d'intégration africaine</li>
                      <li>Mise en œuvre et suivi des programmes communautaires</li>
                      <li>Promotion de la paix et de la sécurité régionale</li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction des Politiques Communautaires Macroéconomiques et Financières</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction des Politiques Communautaires du Commerce et de la Libre Circulation</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction des Politiques de la Promotion Humaine et du Développement Durable</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DGIE */}
            <Card className="card-hover border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users2 className="w-6 h-6 text-primary" />
                  Direction Générale des Ivoiriens de l'Extérieur (DGIE)
                </CardTitle>
                <CardDescription>
                  Gestion et accompagnement de la diaspora ivoirienne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Attributions principales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Encourager et coordonner les initiatives de regroupement des Ivoiriens de l'extérieur</li>
                      <li>Appuyer la réinsertion économique, sociale et culturelle lors du retour en Côte d'Ivoire</li>
                      <li>Faciliter l'accès au logement et coordonner la participation au développement</li>
                      <li>Mobiliser les compétences des Ivoiriens de l'extérieur</li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction de l'Accueil, de l'Orientation et du Suivi des Actions de Réinsertion</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction de la Mobilisation des Compétences et des Ressources</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-sm">Direction de l'Action Sociale</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SPSE */}
            <Card className="card-hover border-l-4 border-l-accent bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  Service Planification & Suivi-Évaluation (SPSE)
                </CardTitle>
                <CardDescription>
                  Gestionnaire de la plateforme ECOBASE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Rôle vis-à-vis d'ECOBASE :</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Le SPSE est le service responsable de la gestion et du maintien de la plateforme ECOBASE. 
                      Il assure la collecte, la validation et la diffusion des données et indicateurs stratégiques.
                    </p>
                    <h4 className="font-semibold mb-2">Attributions principales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Participation à l'élaboration des Plans Nationaux de Développement</li>
                      <li>Production des statistiques et indicateurs sectoriels</li>
                      <li>Accompagnement des structures du ministère en matière de planification et de suivi-évaluation</li>
                      <li>Élaboration des bilans semestriels et annuels des activités du ministère</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cadre juridique */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              Cadre Juridique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-4">
                L'organisation et les attributions du ministère sont définies par le{" "}
                <strong>Décret N° 2023-973 du 06 décembre 2023</strong> portant organisation du Ministère Délégué 
                auprès du Ministère des Affaires Étrangères, de l'Intégration Africaine et des Ivoiriens de l'Extérieur, 
                chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur.
              </p>
              <p className="text-sm text-muted-foreground">
                Ce décret abroge le décret n° 2022-987 du 21 décembre 2022 et définit la structure complète 
                du ministère incluant le Cabinet, les Directions Générales, les Services et Directions rattachés.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
