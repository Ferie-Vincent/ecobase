import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface IndicatorCardProps {
  name: string;
  value: number;
  unit: string;
  trend: string;
  category: string;
}

export const IndicatorCard = ({ name, value, unit, trend, category }: IndicatorCardProps) => {
  const isPositiveTrend = trend.startsWith("+");
  
  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="text-sm font-semibold text-foreground leading-snug pr-2">{name}</h4>
          <Badge variant="outline" className="text-xs shrink-0">{category}</Badge>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        <div className={`flex items-center gap-1.5 text-sm font-medium ${isPositiveTrend ? 'text-secondary' : 'text-muted-foreground'}`}>
          {isPositiveTrend && <TrendingUp className="h-3.5 w-3.5" />}
          <span>{trend}</span>
          <span className="text-xs text-muted-foreground">vs année précédente</span>
        </div>
      </div>
    </Card>
  );
};
