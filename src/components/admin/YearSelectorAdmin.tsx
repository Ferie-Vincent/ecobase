import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Plus, Trash2, Settings } from "lucide-react";

interface YearSelectorAdminProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  years: string[];
  onYearsChange: (years: string[]) => void;
}

export default function YearSelectorAdmin({ 
  selectedYear, 
  onYearChange, 
  years,
  onYearsChange
}: YearSelectorAdminProps) {
  const [newYear, setNewYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const addYear = () => {
    const yearNum = parseInt(newYear);
    if (yearNum && yearNum >= 2000 && yearNum <= 2100 && !years.includes(newYear)) {
      const updatedYears = [...years, newYear].sort((a, b) => parseInt(b) - parseInt(a));
      onYearsChange(updatedYears);
      setNewYear("");
    }
  };

  const removeYear = (yearToRemove: string) => {
    if (years.length > 1) {
      const updatedYears = years.filter(y => y !== yearToRemove);
      onYearsChange(updatedYears);
      if (selectedYear === yearToRemove) {
        onYearChange(updatedYears[0]);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-5 w-5 text-muted-foreground" />
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[140px] bg-background">
          <SelectValue placeholder="Année" />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" title="Gérer les années">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-background z-50" align="end">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Ajouter une année</h4>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Ex: 2025"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  min={2000}
                  max={2100}
                  className="flex-1"
                />
                <Button onClick={addYear} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Années disponibles</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {years.map((year) => (
                  <div key={year} className="flex items-center justify-between py-1 px-2 rounded hover:bg-muted/50">
                    <span className="text-sm">{year}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeYear(year)}
                      disabled={years.length === 1}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
