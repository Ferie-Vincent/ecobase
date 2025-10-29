import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface IndicatorCardProps {
  name: string;
  value: number;
  unit: string;
  trend: string;
  category: string;
  description?: string;
}

export const IndicatorCard = ({ name, value, unit, trend, category, description }: IndicatorCardProps) => {
  const isPositiveTrend = trend.startsWith("+");
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="p-5 hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20 cursor-pointer hover:scale-[1.02]">
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
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-2xl">{name}</DialogTitle>
              <Badge variant="outline" className="text-xs">{category}</Badge>
            </div>
            <div className="flex items-baseline gap-3 py-4">
              <span className="text-4xl font-bold text-primary">
                {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
              </span>
              <span className="text-lg text-muted-foreground">{unit}</span>
              <div className={`flex items-center gap-1.5 ml-4 text-base font-medium ${isPositiveTrend ? 'text-secondary' : 'text-muted-foreground'}`}>
                {isPositiveTrend && <TrendingUp className="h-4 w-4" />}
                <span>{trend}</span>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-base leading-relaxed text-foreground">
            {description || "Aucune description disponible pour cet indicateur."}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
