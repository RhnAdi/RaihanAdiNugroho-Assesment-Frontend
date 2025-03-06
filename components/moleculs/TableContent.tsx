/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { AccessorKeyColumnDef, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableAction from "./table-action";

export default function TableContent({
  data,
  columns
}: {
  data: [],
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[]
}){
  const defaultData = React.useMemo(() => [], []);
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return(
    <div className="flex flex-col gap-[10px] w-full">
      <TableAction
        data={data}
        columns={columns}
      />
      <Table>
        <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}

                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}