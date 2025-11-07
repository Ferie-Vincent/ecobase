import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";

interface MultiYearSelectorProps {
  selectedYears: string[];
  onYearsChange: (years: string[]) => void;
  availableYears: string[];
}

export const MultiYearSelector = ({ selectedYears, onYearsChange, availableYears }: MultiYearSelectorProps) => {
  const toggleYear = (year: string) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter(y => y !== year));
    } else {
      onYearsChange([...selectedYears, year]);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-sm">
      <Calendar className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-foreground">Années :</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[200px] justify-between">
            {selectedYears.length > 0 
              ? `${selectedYears.length} année(s) sélectionnée(s)`
              : "Sélectionner les années"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-card">
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Sélectionnez les années</p>
            {availableYears.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => toggleYear(year)}
                />
                <Label
                  htmlFor={`year-${year}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {year}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
