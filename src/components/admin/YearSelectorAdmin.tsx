import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface YearSelectorAdminProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  years?: string[];
}

const defaultYears = ["2024", "2023", "2022", "2021", "2020"];

export default function YearSelectorAdmin({ 
  selectedYear, 
  onYearChange, 
  years = defaultYears 
}: YearSelectorAdminProps) {
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
    </div>
  );
}
