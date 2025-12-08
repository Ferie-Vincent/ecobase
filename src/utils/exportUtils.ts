import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ExportColumn {
  header: string;
  accessor: string | ((row: any) => string | number);
}

export interface ExportOptions {
  filename: string;
  title?: string;
  columns: ExportColumn[];
  data: any[];
}

function getValue(row: any, accessor: string | ((row: any) => string | number)): string | number {
  if (typeof accessor === "function") {
    return accessor(row);
  }
  
  // Handle nested properties
  const keys = accessor.split(".");
  let value = row;
  for (const key of keys) {
    value = value?.[key];
  }
  return value ?? "";
}

export function exportToCSV({ filename, columns, data }: ExportOptions): void {
  // Create headers row
  const headers = columns.map(col => col.header);
  
  // Create data rows
  const rows = data.map(row => 
    columns.map(col => {
      const value = getValue(row, col.accessor);
      // Escape values that contain commas or quotes
      if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    })
  );
  
  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
  
  // Add BOM for Excel UTF-8 compatibility
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  
  downloadBlob(blob, `${filename}.csv`);
}

export function exportToExcel({ filename, title, columns, data }: ExportOptions): void {
  // Create headers row
  const headers = columns.map(col => col.header);
  
  // Create data rows
  const rows = data.map(row => 
    columns.map(col => getValue(row, col.accessor))
  );
  
  // Create worksheet data
  const wsData = [headers, ...rows];
  
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Set column widths
  const colWidths = columns.map((col, i) => ({
    wch: Math.max(
      col.header.length,
      ...rows.map(row => String(row[i]).length)
    ) + 2
  }));
  ws["!cols"] = colWidths;
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, title || "Données");
  
  // Generate and download file
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export function exportToPDF({ filename, title, columns, data }: ExportOptions): void {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title if provided
  if (title) {
    doc.setFontSize(16);
    doc.text(title, 14, 20);
  }
  
  // Prepare table data
  const headers = columns.map(col => col.header);
  const rows = data.map(row => 
    columns.map(col => String(getValue(row, col.accessor)))
  );
  
  // Generate table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: title ? 30 : 20,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [34, 139, 34], // Primary green color
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  // Add footer with date
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Généré le ${new Date().toLocaleDateString("fr-FR")} - Page ${i}/${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }
  
  // Download file
  doc.save(`${filename}.pdf`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export type ExportFormat = "csv" | "excel" | "pdf";

export function exportData(format: ExportFormat, options: ExportOptions): void {
  switch (format) {
    case "csv":
      exportToCSV(options);
      break;
    case "excel":
      exportToExcel(options);
      break;
    case "pdf":
      exportToPDF(options);
      break;
  }
}
