import { IndicatorCard } from "@/components/IndicatorCard";
import { diasporaIndicatorsByYear } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { YearSelector } from "@/components/YearSelector";
import { TimelineChart } from "@/components/TimelineChart";
import { Footer } from "@/components/Footer";
import { useState, useMemo } from "react";

const Diaspora = () => {
  const categories = ["Sensibilisation", "Réinsertion", "Emploi", "Économie", "Social", "Assistance"];
  const availableYears = Object.keys(diasporaIndicatorsByYear).sort().reverse();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const diasporaIndicators = diasporaIndicatorsByYear[selectedYear];
  
  const categoryData = useMemo(() => {
    const sensibilisation = diasporaIndicators.filter(i => i.category === "Sensibilisation").reduce((sum, i) => sum + i.value, 0);
    const reinsertion = diasporaIndicators.find(i => i.category === "Réinsertion")?.value || 0;
    const emploi = diasporaIndicators.find(i => i.category === "Emploi")?.value || 0;
    const social = diasporaIndicators.find(i => i.category === "Social")?.value || 0;
    const assistance = diasporaIndicators.find(i => i.category === "Assistance")?.value || 0;
    
    return [
      { name: "Sensibilisation", value: sensibilisation, color: "hsl(var(--primary))" },
      { name: "Réinsertion", value: reinsertion, color: "hsl(var(--secondary))" },
      { name: "Emploi", value: emploi, color: "hsl(var(--accent))" },
      { name: "Social", value: social, color: "hsl(27 80% 60%)" },
      { name: "Assistance", value: assistance, color: "hsl(142 60% 50%)" }
    ];
  }, [diasporaIndicators]);

  const timelineData = useMemo(() => {
    return Object.keys(diasporaIndicatorsByYear).sort().map(year => {
      const yearData = diasporaIndicatorsByYear[year];
      return {
        year,
        sensibilises: yearData.find(i => i.name === "Sensibilisés immigration clandestine")?.value || 0,
        reinseres: yearData.find(i => i.name === "Ivoiriens réinsérés")?.value || 0,
        transfertsPIB: yearData.find(i => i.name === "Transferts d'argent / PIB")?.value || 0,
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Ivoiriens de l'Extérieur</h1>
          <p className="text-lg text-white/90">
            Gestion et suivi des actions en faveur de la diaspora ivoirienne
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
            title="Évolution des Indicateurs de la Diaspora"
            data={timelineData}
            lines={[
              { dataKey: "sensibilises", name: "Sensibilisés", color: "hsl(var(--primary))" },
              { dataKey: "reinseres", name: "Réinsérés", color: "hsl(var(--secondary))" },
              { dataKey: "transfertsPIB", name: "Transferts/PIB (%)", color: "hsl(var(--accent))" }
            ]}
          />
        </section>

        {/* Indicators Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diasporaIndicators.map((indicator, index) => (
              <IndicatorCard key={index} {...indicator} />
            ))}
          </div>
        </section>

        {/* Distribution Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Répartition des Actions
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Impact Économique
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Transferts d'argent / PIB</span>
                  <span className="text-2xl font-bold text-primary">{diasporaIndicators.find(i => i.name === "Transferts d'argent / PIB")?.value}%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Les transferts de la diaspora représentent une part significative du PIB national
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Enregistrés CNPS</span>
                  <span className="text-2xl font-bold text-secondary">{diasporaIndicators.find(i => i.name === "Enregistrés CNPS")?.value.toLocaleString('fr-FR')}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ivoiriens de l'extérieur cotisant au régime social
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Intégrés Fonction Publique</span>
                  <span className="text-2xl font-bold text-accent">{diasporaIndicators.find(i => i.name === "Intégrés Fonction Publique")?.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Membres de la diaspora ayant rejoint la fonction publique
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Programs */}
        <section>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Programmes de Sensibilisation et Réinsertion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Immigration Clandestine</h4>
                <p className="text-3xl font-bold text-primary mb-1">{diasporaIndicators.find(i => i.name === "Sensibilisés immigration clandestine")?.value.toLocaleString('fr-FR')}</p>
                <p className="text-sm text-muted-foreground">Personnes sensibilisées</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Insertion en CI</h4>
                <p className="text-3xl font-bold text-secondary mb-1">{diasporaIndicators.find(i => i.name === "Sensibilisés insertion CI")?.value.toLocaleString('fr-FR')}</p>
                <p className="text-sm text-muted-foreground">Personnes informées</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Réinsertion Réussie</h4>
                <p className="text-3xl font-bold text-accent mb-1">{diasporaIndicators.find(i => i.name === "Ivoiriens réinsérés")?.value.toLocaleString('fr-FR')}</p>
                <p className="text-sm text-muted-foreground">Ivoiriens réinsérés</p>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Diaspora;
