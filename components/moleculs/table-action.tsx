/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import ExportButton from '@components/ui/Table/Action/ExportButton';
// import PrintButton from '@components/ui/Table/Action/PrintButton';
import { AccessorKeyColumnDef, ColumnDef } from '@tanstack/react-table';
import PrintButton from '../ui/PrintButton';
import ExportButton from '../ui/ExportButton';

export interface TableActionProps {
  data: any[];
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  showExport?: boolean;
}

const TableAction: React.FC<TableActionProps> = ({
  data,
  columns
}) => (
  <div className="flex justify-between gap-2 z-20">
    <div className="flex gap-2 flex-1 w-full">
      <div className="flex items-center w-full h-full gap-2">
        <PrintButton data={data} columns={columns as ColumnDef<any>[]} />
        <ExportButton data={data} columns={columns as ColumnDef<any>[]} />
      </div>
    </div>
  </div>
);

export default TableAction;
