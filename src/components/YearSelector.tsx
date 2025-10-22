import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface YearSelectorProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  availableYears: string[];
}

export const YearSelector = ({ selectedYear, onYearChange, availableYears }: YearSelectorProps) => {
  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-sm">
      <Calendar className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-foreground">Année :</span>
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Sélectionner" />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {availableYears.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
