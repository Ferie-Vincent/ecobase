import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
}

export const StatCard = ({ title, value, unit, trend, icon, variant = "default" }: StatCardProps) => {
  const isPositiveTrend = trend?.startsWith("+");
  
  const variantStyles = {
    default: "border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/60 backdrop-blur-sm",
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm",
    secondary: "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
  };

  return (
    <Card className={`p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
            </h3>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositiveTrend ? 'text-secondary' : 'text-destructive'}`}>
              {isPositiveTrend ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              <span>{trend}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-background rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
