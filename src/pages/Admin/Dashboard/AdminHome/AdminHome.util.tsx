import dayjs from "dayjs";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { GetPendingUsersByAdmin, GetUsersByAdmin } from "api/models";

const activeUsersColumnHelper = createColumnHelper<GetUsersByAdmin.Data>();
const pendingUsersColumnHelper =
  createColumnHelper<GetPendingUsersByAdmin.Data>();

export const generateActiveUsersColumns = (): ColumnDef<any, string>[] => [
  activeUsersColumnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  activeUsersColumnHelper.accessor("designation.name", {
    header: "Designation",
    cell: (info) => info.getValue(),
  }),
  activeUsersColumnHelper.accessor("department.name", {
    header: "Department",
    cell: (info) => info.getValue(),
  }),
];

export const generatePendingUsersColumns = (): ColumnDef<any, string>[] => [
  pendingUsersColumnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  pendingUsersColumnHelper.accessor("invitedAt", {
    header: "Invitation Sent",
    cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY, hh:mma"),
  }),
  pendingUsersColumnHelper.display({
    id: "daysElapsed",
    header: "Days elapsed",
    cell: (props) => {
      const days = dayjs()
        .startOf("day")
        .diff(dayjs(props.row.original.invitedAt).startOf("day"), "days");
      return `${days} ${days > 1 ? "days" : "day"}`;
    },
  }),
];
