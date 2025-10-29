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
          <Card className="relative overflow-hidden p-6 hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30 cursor-pointer group bg-gradient-to-br from-card via-card to-card/80">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative space-y-4">
              {/* Category badge at top */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{category}</Badge>
              </div>
              
              {/* Main value with trend */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-foreground bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text">
                  {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
                </span>
                <div className="flex flex-col gap-0.5">
                  <div className={`flex items-center gap-1 text-sm font-semibold ${isPositiveTrend ? 'text-secondary' : 'text-muted-foreground'}`}>
                    {isPositiveTrend && <TrendingUp className="h-3.5 w-3.5" />}
                    <span>{trend}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{unit}</span>
                </div>
              </div>
              
              {/* Title at bottom */}
              <h4 className="text-sm font-medium text-muted-foreground leading-snug">{name}</h4>
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
