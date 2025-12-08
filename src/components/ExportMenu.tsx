import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText, FileType, Eye } from "lucide-react";
import { exportData, ExportColumn, ExportFormat } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { ExportPreviewDialog } from "./ExportPreviewDialog";

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
  const [previewOpen, setPreviewOpen] = useState(false);

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} disabled={disabled || data.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover">
          <DropdownMenuItem onClick={() => setPreviewOpen(true)} className="gap-2">
            <Eye className="h-4 w-4" />
            Aperçu et personnalisation
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport("csv")} className="gap-2">
            <FileText className="h-4 w-4" />
            Export CSV rapide
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("excel")} className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel rapide
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("pdf")} className="gap-2">
            <FileType className="h-4 w-4" />
            Export PDF rapide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ExportPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        data={data}
        columns={columns}
        filename={filename}
        title={title}
      />
    </>
  );
}
