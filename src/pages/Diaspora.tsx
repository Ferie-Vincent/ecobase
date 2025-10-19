import { IndicatorCard } from "@/components/IndicatorCard";
import { diasporaIndicators } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Diaspora = () => {
  const categories = ["Sensibilisation", "Réinsertion", "Emploi", "Économie", "Social", "Assistance"];
  
  const categoryData = [
    { name: "Sensibilisation", value: 22320, color: "hsl(var(--primary))" },
    { name: "Réinsertion", value: 3890, color: "hsl(var(--secondary))" },
    { name: "Emploi", value: 567, color: "hsl(var(--accent))" },
    { name: "Social", value: 8920, color: "hsl(27 80% 60%)" },
    { name: "Assistance", value: 4560, color: "hsl(142 60% 50%)" }
  ];

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
                  <span className="text-2xl font-bold text-primary">8.4%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Les transferts de la diaspora représentent une part significative du PIB national
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Enregistrés CNPS</span>
                  <span className="text-2xl font-bold text-secondary">8,920</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ivoiriens de l'extérieur cotisant au régime social
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Intégrés Fonction Publique</span>
                  <span className="text-2xl font-bold text-accent">567</span>
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
                <p className="text-3xl font-bold text-primary mb-1">12,450</p>
                <p className="text-sm text-muted-foreground">Personnes sensibilisées</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Insertion en CI</h4>
                <p className="text-3xl font-bold text-secondary mb-1">9,870</p>
                <p className="text-sm text-muted-foreground">Personnes informées</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Réinsertion Réussie</h4>
                <p className="text-3xl font-bold text-accent mb-1">3,890</p>
                <p className="text-sm text-muted-foreground">Ivoiriens réinsérés</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Diaspora;
