/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from './button';
import { DownloadIcon } from 'lucide-react';

interface ExportButtonProps {
  data: any[];
  columns: any[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, columns }) => {
  const exportToExcel = () => {
    if (data.length === 0) {
      alert('No data available to export!');
      return;
    }

    const headers = [...columns.map((col) => col.header || col.accessorKey)];


    const exportData = data.map((item) => {
      const row: Record<string, any> = {};
      columns.forEach((col) => {
        row[col.header || col.accessorKey] = item[col.accessorKey];
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);

    headers.forEach((header, index) => {
      ws[XLSX.utils.encode_cell({ r: 0, c: index })] = { v: header, t: 's' };
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported Data');

    XLSX.writeFile(wb, 'Exported_Data.xlsx');
  };

  return (
    <Button
      title="Export"
      onClick={exportToExcel}
      className="w-[80px]"
    >
      <DownloadIcon />
      Export
    </Button>
  );
};

export default ExportButton;
