/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from './button';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  data: any[];
  columns: any[];
}

const PrintButton: React.FC<PrintButtonProps> = ({ data, columns }) => {
  const generatePdf = () => {
    if (data.length === 0) {
      alert('No data available to print!');
      return;
    }

    const doc = new JsPDF();
    const padding = 10;
    const titleY = 30;

    const imageUrl = 'gvp-logo.png';
    const imgWidth = 80;
    const imgHeight = 20;
    const imgX = padding;
    const imgY = titleY - 10;

    doc.addImage(imageUrl, 'PNG', imgX, imgY, imgWidth, imgHeight);
    doc.setFontSize(8);

    const addressText = 'Semarang, Jawa Tengah';
    const wrappedAddressText = doc.splitTextToSize(addressText, imgWidth); // Sesuaikan lebar teks
    const addressY = imgY + imgHeight + 5; // Tambahkan padding agar tidak menempel ke logo
  
    doc.text(wrappedAddressText, imgX, addressY);

    const dateText = `Date: ${new Date().toLocaleDateString()}`;
    const pageWidth = doc.internal.pageSize.width;
    const dateX = pageWidth - padding - doc.getTextWidth(dateText);
    doc.text(dateText, dateX, titleY + 10 + wrappedAddressText.length * 5);

    columns.pop()
    const headers = [...columns.map((col) => col.header || col.accessorKey)];
    const tableData = data.map((item) => [
      ...columns.map((col) => item[col.accessorKey]),
    ]);

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: titleY + 30,
      margin: { top: 0, left: padding, right: padding, bottom: padding },
    });

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  };

  return (
    <Button
      title="Print"
      onClick={generatePdf}
      className="flex items-center gap-x-2 w-[80px]"
    >
      <Printer />
      Print
    </Button>
  );
};

export default PrintButton;
