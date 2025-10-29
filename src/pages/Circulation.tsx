import { IndicatorCard } from "@/components/IndicatorCard";
import { circulationIndicatorsByYear, studentsData } from "@/data/mockData";
import { circulationIndicatorDescriptions } from "@/data/indicatorDescriptions";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { YearSelector } from "@/components/YearSelector";
import { TimelineChart } from "@/components/TimelineChart";
import { Footer } from "@/components/Footer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useMemo } from "react";

const Circulation = () => {
  const categories = ["Population", "Transport"];
  const availableYears = Object.keys(circulationIndicatorsByYear).sort().reverse();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("tous");
  
  const circulationIndicators = circulationIndicatorsByYear[selectedYear];
  
  const filteredIndicators = useMemo(() => {
    if (selectedCategory === "tous") {
      return circulationIndicators;
    }
    return circulationIndicators.filter(indicator => 
      indicator.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [circulationIndicators, selectedCategory]);
  
  const timelineData = useMemo(() => {
    return Object.keys(circulationIndicatorsByYear).sort().map(year => {
      const yearData = circulationIndicatorsByYear[year];
      return {
        year,
        africains: yearData.find(i => i.name === "Ressortissants africains en CI")?.value || 0,
        aerienCEDEAO: (yearData.find(i => i.name === "Voyageurs aériens CEDEAO")?.value || 0) / 1000,
        routierCEDEAO: (yearData.find(i => i.name === "Trafic routier CEDEAO")?.value || 0) / 1000,
      };
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Libre Circulation des Personnes</h1>
          <p className="text-lg text-white/90">
            Suivi des flux migratoires et de la mobilité régionale
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
            title="Évolution de la Circulation et Mobilité"
            data={timelineData}
            lines={[
              { dataKey: "africains", name: "Ressortissants africains (%)", color: "hsl(var(--primary))" },
              { dataKey: "aerienCEDEAO", name: "Aérien CEDEAO (milliers)", color: "hsl(var(--secondary))" },
              { dataKey: "routierCEDEAO", name: "Routier CEDEAO (milliers)", color: "hsl(var(--accent))" }
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
                description={circulationIndicatorDescriptions[indicator.name]}
              />
            ))}
          </div>
        </section>

        {/* Transport Comparison */}
        <section>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Comparaison des Modes de Transport
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={[
                  { mode: "Routier UEMOA", voyageurs: 2340000 },
                  { mode: "Routier CEDEAO", voyageurs: 3450000 },
                  { mode: "Aérien UEMOA", voyageurs: 342000 },
                  { mode: "Aérien CEDEAO", voyageurs: 589000 },
                  { mode: "Ferroviaire", voyageurs: 145000 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mode" stroke="hsl(var(--muted-foreground))" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => value.toLocaleString('fr-FR')}
                />
                <Bar dataKey="voyageurs" fill="hsl(var(--primary))" name="Voyageurs" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Students Statistics */}
        <section>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Étudiants Étrangers en Côte d'Ivoire par Région
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={studentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => value.toLocaleString('fr-FR')}
                />
                <Legend />
                <Bar dataKey="economie" stackId="a" fill="hsl(var(--primary))" name="Économie" />
                <Bar dataKey="droit" stackId="a" fill="hsl(var(--secondary))" name="Droit" />
                <Bar dataKey="culture" stackId="a" fill="hsl(var(--accent))" name="Culture" />
                <Bar dataKey="autres" stackId="a" fill="hsl(27 80% 60%)" name="Autres" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Student Details */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentsData.map((region) => (
              <Card key={region.region} className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">{region.region}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">{region.total.toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Économie</span>
                      <span className="font-semibold">{region.economie.toLocaleString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Droit</span>
                      <span className="font-semibold">{region.droit.toLocaleString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Culture</span>
                      <span className="font-semibold">{region.culture.toLocaleString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Autres</span>
                      <span className="font-semibold">{region.autres.toLocaleString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Circulation;
