import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps {
  columns: ColumnDef<any, string>[];
  data: any[];
  isLoading: boolean;
  handleClickCell?: (cell: any) => void;
}

const Table = ({ columns, data, isLoading, handleClickCell }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="overflow-auto">
      <table className="w-full table-fixed border-[1px] border-tableHeaderGray">
        <thead className="bg-tableHeaderGray text-left text-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`w-[120px] p-3 font-semibold ${
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " ⬆",
                        desc: " ⬇",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-[13px]">
          {isLoading ? (
            <tr className="border-b-[1px] border-b-tableHeaderGray bg-white hover:bg-tableRowGray">
              <td
                className="w-fit truncate p-3 text-center"
                colSpan={columns.length}
              >
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr className="border-b-[1px] border-b-tableHeaderGray bg-white hover:bg-tableRowGray">
              <td
                className="w-fit truncate p-3 text-center"
                colSpan={columns.length}
              >
                No data
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`border-b-[1px] border-b-tableHeaderGray bg-white hover:bg-tableRowGray
                              ${
                                handleClickCell &&
                                typeof handleClickCell === "function"
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="w-fit truncate p-3"
                        onClick={() => {
                          if (
                            handleClickCell &&
                            typeof handleClickCell === "function"
                          ) {
                            handleClickCell(cell);
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
