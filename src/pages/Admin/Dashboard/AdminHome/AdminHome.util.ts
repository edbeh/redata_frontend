import { ColumnDef } from "@tanstack/react-table";

import { GetUsersByAdmin } from "api/models";

export const generateColumns = (): ColumnDef<GetUsersByAdmin.Data>[] => {
  return [
    {
      header: "Name",
      footer: (props) => props.column.id,
      columns: [
        {
          accessorKey: "name",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
      ],
    },
  ];
};
