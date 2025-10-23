import { IndicatorCard } from "@/components/IndicatorCard";
import { integrationIndicatorsByYear } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { YearSelector } from "@/components/YearSelector";
import { TimelineChart } from "@/components/TimelineChart";
import { Footer } from "@/components/Footer";
import { useState, useMemo } from "react";

const Integration = () => {
  const categories = ["Commerce", "Social", "CILSS"];
  const availableYears = Object.keys(integrationIndicatorsByYear).sort().reverse();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const integrationIndicators = integrationIndicatorsByYear[selectedYear];
  
  const timelineData = useMemo(() => {
    return Object.keys(integrationIndicatorsByYear).sort().map(year => {
      const yearData = integrationIndicatorsByYear[year];
      return {
        year,
        entreprises: yearData.find(i => i.name === "Entreprises SLEC agréées")?.value || 0,
        produits: yearData.find(i => i.name === "Produits SLEC agréés")?.value || 0,
        exportations: yearData.find(i => i.name === "Exportations SLEC")?.value || 0,
      };
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Intégration Africaine</h1>
          <p className="text-lg text-white/90">
            Indicateurs de performance pour le suivi de l'intégration régionale
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Year Selector */}
        <YearSelector 
          selectedYear={selectedYear} 
          onYearChange={setSelectedYear} 
          availableYears={availableYears}
        />

        {/* Filter by Category */}
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="text-sm cursor-pointer hover:bg-muted">
            Tous les indicateurs
          </Badge>
          {categories.map((cat) => (
            <Badge key={cat} variant="outline" className="text-sm cursor-pointer hover:bg-muted">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Timeline Chart */}
        <section>
          <TimelineChart
            title="Évolution des Indicateurs d'Intégration"
            data={timelineData}
            lines={[
              { dataKey: "entreprises", name: "Entreprises SLEC", color: "hsl(var(--primary))" },
              { dataKey: "produits", name: "Produits SLEC", color: "hsl(var(--secondary))" },
              { dataKey: "exportations", name: "Exportations (Mds FCFA)", color: "hsl(var(--accent))" }
            ]}
          />
        </section>

        {/* Indicators Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationIndicators.map((indicator, index) => (
              <IndicatorCard key={index} {...indicator} />
            ))}
          </div>
        </section>

        {/* SLEC Details */}
        <section>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Schéma de Libéralisation des Échanges de la CEDEAO (SLEC)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Entreprises Agréées</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total agréées</span>
                    <span className="text-lg font-bold text-primary">245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Actives</span>
                    <span className="text-lg font-bold text-secondary">189</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taux d'activité</span>
                    <span className="text-lg font-bold text-accent">77.1%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Performance Commerciale</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Produits agréés</span>
                    <span className="text-lg font-bold text-primary">1,834</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Volume exports</span>
                    <span className="text-lg font-bold text-secondary">45.6 Mds FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Part SLE/Intra-régional</span>
                    <span className="text-lg font-bold text-accent">34.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Integration;
