import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText, FileType } from "lucide-react";
import { exportData, ExportColumn, ExportFormat } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ExportMenuProps {
  data: any[];
  columns: ExportColumn[];
  filename: string;
  title?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export function ExportMenu({ 
  data, 
  columns, 
  filename, 
  title,
  variant = "outline",
  size = "sm",
  disabled = false
}: ExportMenuProps) {
  const { toast } = useToast();

  const handleExport = (format: ExportFormat) => {
    try {
      exportData(format, {
        filename,
        title,
        columns,
        data
      });
      
      const formatLabels: Record<ExportFormat, string> = {
        csv: "CSV",
        excel: "Excel",
        pdf: "PDF"
      };
      
      toast({
        title: "Export réussi",
        description: `Les données ont été exportées en ${formatLabels[format]}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export.",
        variant: "destructive"
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={disabled || data.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")} className="gap-2">
          <FileText className="h-4 w-4" />
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")} className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")} className="gap-2">
          <FileType className="h-4 w-4" />
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
