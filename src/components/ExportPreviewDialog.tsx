import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileSpreadsheet, FileText, FileType, Eye } from "lucide-react";
import { exportData, ExportColumn, ExportFormat } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ExportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any[];
  columns: ExportColumn[];
  filename: string;
  title?: string;
}

// Helper to get a unique identifier for each column
const getColumnId = (col: ExportColumn): string => {
  return typeof col.accessor === "string" ? col.accessor : col.header;
};

export function ExportPreviewDialog({
  open,
  onOpenChange,
  data,
  columns,
  filename,
  title,
}: ExportPreviewDialogProps) {
  const { toast } = useToast();
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map(getColumnId)
  );

  const filteredColumns = useMemo(
    () => columns.filter((col) => selectedColumns.includes(getColumnId(col))),
    [columns, selectedColumns]
  );

  const previewData = useMemo(() => data.slice(0, 5), [data]);

  const toggleColumn = (id: string) => {
    setSelectedColumns((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const toggleAllColumns = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(columns.map(getColumnId));
    }
  };

  const handleExport = (format: ExportFormat) => {
    if (filteredColumns.length === 0) {
      toast({
        title: "Aucune colonne sélectionnée",
        description: "Veuillez sélectionner au moins une colonne à exporter.",
        variant: "destructive",
      });
      return;
    }

    try {
      exportData(format, {
        filename,
        title,
        columns: filteredColumns,
        data,
      });

      const formatLabels: Record<ExportFormat, string> = {
        csv: "CSV",
        excel: "Excel",
        pdf: "PDF",
      };

      toast({
        title: "Export réussi",
        description: `Les données ont été exportées en ${formatLabels[format]}.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export.",
        variant: "destructive",
      });
    }
  };

  const getCellValue = (item: any, column: ExportColumn): string => {
    if (typeof column.accessor === "function") {
      return String(column.accessor(item));
    }
    const keys = column.accessor.split(".");
    let value = item;
    for (const key of keys) {
      value = value?.[key];
    }
    if (value === null || value === undefined) return "-";
    return String(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Aperçu de l'export
          </DialogTitle>
          <DialogDescription>
            Sélectionnez les colonnes à inclure et prévisualisez les données avant l'export.
            {data.length > 5 && ` (Affichage des 5 premières lignes sur ${data.length})`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          {/* Column Selection */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Colonnes à exporter</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAllColumns}
                className="text-xs"
              >
                {selectedColumns.length === columns.length
                  ? "Désélectionner tout"
                  : "Sélectionner tout"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {columns.map((column) => {
                const colId = getColumnId(column);
                return (
                  <div key={colId} className="flex items-center space-x-2">
                    <Checkbox
                      id={`col-${colId}`}
                      checked={selectedColumns.includes(colId)}
                      onCheckedChange={() => toggleColumn(colId)}
                    />
                    <Label
                      htmlFor={`col-${colId}`}
                      className="text-sm cursor-pointer"
                    >
                      {column.header}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Preview */}
          <div className="flex-1 border rounded-lg overflow-hidden">
            <ScrollArea className="h-[300px]">
              {filteredColumns.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {filteredColumns.map((column) => (
                        <TableHead key={getColumnId(column)} className="whitespace-nowrap">
                          {column.header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((item, index) => (
                      <TableRow key={index}>
                        {filteredColumns.map((column) => (
                          <TableCell key={getColumnId(column)} className="whitespace-nowrap">
                            {getCellValue(item, column)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Sélectionnez au moins une colonne pour voir l'aperçu
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Stats */}
          <div className="text-sm text-muted-foreground">
            {selectedColumns.length} colonne(s) sélectionnée(s) • {data.length} ligne(s) à exporter
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("csv")}
            disabled={filteredColumns.length === 0}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("excel")}
            disabled={filteredColumns.length === 0}
            className="gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </Button>
          <Button
            onClick={() => handleExport("pdf")}
            disabled={filteredColumns.length === 0}
            className="gap-2"
          >
            <FileType className="h-4 w-4" />
            PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
