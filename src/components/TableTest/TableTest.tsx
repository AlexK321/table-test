import React from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { ServerProgress } from '../ServerProgress';

import { Person, TABLE_DATA } from './TableTest.const';

import './TableTest.css';

const columnHelper = createColumnHelper<Person>();

export const COLUMNS: any[] = [
  columnHelper.accessor(row => row.name, {
    id: 'lastName',
    header: () => <span>Name</span>,
    cell: info => <i>{info.getValue()}</i>,
    footer: info => 'info',
  }),
  columnHelper.accessor('city', {
    header: () => 'City',
    // cell: info => info.renderValue(),
    cell: info => <button>{info.renderValue()}</button>,
    footer: info => <button>{info.column.id}</button>,
  }),
  columnHelper.accessor('salary', {
    header: () => <span>Salary</span>,
    cell: info => <ServerProgress value={Number(info.renderValue()) / 5} />,
    footer: info => <button>{info.column.id}</button>,
  }),
  columnHelper.group({
    id: 'hello',
    header: () => 'Группа колонок',
    columns: [
      columnHelper.accessor('country', {
        header: 'Status',
        footer: info => info.column.id,
      }),
      columnHelper.accessor('cellPhone', {
        header: 'Your cellPhone',
        footer: info => info.column.id,
      }),
    ],
  }),
];

export const TableTest: React.FC = () => {
  const table = useReactTable({
    data: TABLE_DATA,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
};
