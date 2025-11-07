import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";

interface IndicatorSelectorProps {
  selectedIndicators: string[];
  onIndicatorsChange: (indicators: string[]) => void;
  availableIndicators: Array<{ value: string; label: string }>;
  multiple?: boolean;
}

export const IndicatorSelector = ({ 
  selectedIndicators, 
  onIndicatorsChange, 
  availableIndicators,
  multiple = true 
}: IndicatorSelectorProps) => {
  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-sm">
      <BarChart3 className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-foreground">Indicateurs :</span>
      <Select 
        value={selectedIndicators[0] || ""} 
        onValueChange={(value) => {
          if (multiple) {
            if (selectedIndicators.includes(value)) {
              onIndicatorsChange(selectedIndicators.filter(ind => ind !== value));
            } else {
              onIndicatorsChange([...selectedIndicators, value]);
            }
          } else {
            onIndicatorsChange([value]);
          }
        }}
      >
        <SelectTrigger className="min-w-[300px]">
          <SelectValue placeholder="Sélectionner les indicateurs" />
        </SelectTrigger>
        <SelectContent className="bg-card max-h-[300px]">
          {availableIndicators.map((indicator) => (
            <SelectItem key={indicator.value} value={indicator.value}>
              <div className="flex items-center gap-2">
                {selectedIndicators.includes(indicator.value) && (
                  <span className="text-primary">✓</span>
                )}
                {indicator.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedIndicators.length > 0 && (
        <span className="text-sm text-muted-foreground">
          {selectedIndicators.length} sélectionné(s)
        </span>
      )}
    </div>
  );
};
