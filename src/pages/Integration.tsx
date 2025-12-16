import { IndicatorCard } from "@/components/IndicatorCard";
import { integrationIndicatorDescriptions } from "@/data/indicatorDescriptions";
import { Card } from "@/components/ui/card";
import { YearSelector } from "@/components/YearSelector";
import { TimelineChart } from "@/components/TimelineChart";
import { Footer } from "@/components/Footer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ExportMenu } from "@/components/ExportMenu";
import { useState, useMemo } from "react";
import { useData } from "@/contexts/DataContext";

const Integration = () => {
  const { integrationIndicatorsByYear, slecDetailsByYear, availableYears } = useData();
  
  const categories = ["Commerce", "Social", "CILSS"];
  const sortedYears = [...availableYears].sort().reverse();
  const [selectedYear, setSelectedYear] = useState(sortedYears[0] || "2024");
  const [selectedCategory, setSelectedCategory] = useState<string>("tous");
  
  const integrationIndicators = integrationIndicatorsByYear[selectedYear] || [];
  const slecDetails = slecDetailsByYear[selectedYear] || {
    entreprisesAgreees: 0,
    entreprisesActives: 0,
    tauxActivite: 0,
    produitsAgrees: 0,
    volumeExports: 0,
    partSleIntraRegional: 0
  };
  
  const filteredIndicators = useMemo(() => {
    if (selectedCategory === "tous") {
      return integrationIndicators;
    }
    return integrationIndicators.filter(indicator => 
      indicator.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [integrationIndicators, selectedCategory]);
  
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
  }, [integrationIndicatorsByYear]);
  
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
        {/* Year Selector & Export */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <YearSelector 
            selectedYear={selectedYear} 
            onYearChange={setSelectedYear} 
            availableYears={sortedYears}
          />
          <ExportMenu
            data={filteredIndicators}
            columns={[
              { header: "Indicateur", accessor: "name" },
              { header: "Valeur", accessor: "value" },
              { header: "Unité", accessor: "unit" },
              { header: "Tendance", accessor: "trend" },
              { header: "Catégorie", accessor: "category" }
            ]}
            filename={`integration-${selectedYear}`}
            title={`Indicateurs d'Intégration - ${selectedYear}`}
          />
        </div>

        {/* Filter by Category */}
        <ToggleGroup 
          type="single" 
          value={selectedCategory} 
          onValueChange={(value) => value && setSelectedCategory(value)}
          className="justify-start flex-wrap"
        >
          <ToggleGroupItem value="tous" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
            Tous les indicateurs
          </ToggleGroupItem>
          {categories.map((cat) => (
            <ToggleGroupItem 
              key={cat} 
              value={cat.toLowerCase()}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {cat}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

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
            {filteredIndicators.map((indicator, index) => (
              <IndicatorCard 
                key={index} 
                {...indicator} 
                description={integrationIndicatorDescriptions[indicator.name]}
              />
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
                    <span className="text-lg font-bold text-primary">{slecDetails.entreprisesAgreees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Actives</span>
                    <span className="text-lg font-bold text-secondary">{slecDetails.entreprisesActives.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taux d'activité</span>
                    <span className="text-lg font-bold text-accent">{slecDetails.tauxActivite}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Performance Commerciale</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Produits agréés</span>
                    <span className="text-lg font-bold text-primary">{slecDetails.produitsAgrees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Volume exports</span>
                    <span className="text-lg font-bold text-secondary">{slecDetails.volumeExports} Mds FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Part SLE/Intra-régional</span>
                    <span className="text-lg font-bold text-accent">{slecDetails.partSleIntraRegional}%</span>
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
