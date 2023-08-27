import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";

import { GetPendingUsersByAdmin, GetUsersByAdmin } from "api/models";

const activeUsersColumnHelper = createColumnHelper<GetUsersByAdmin.Data>();
const pendingUsersColumnHelper =
  createColumnHelper<GetPendingUsersByAdmin.Data>();

export const generateActiveUsersColumns = () => {
  return [
    activeUsersColumnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    activeUsersColumnHelper.accessor("designation.name", {
      header: "Designation",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    activeUsersColumnHelper.accessor("department.name", {
      header: "Department",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];
};

export const generatePendingUsersColumns = () => {
  return [
    pendingUsersColumnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    pendingUsersColumnHelper.accessor("invitedAt", {
      header: "Invitation Sent",
      cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY, hh:mma"),
      footer: (info) => info.column.id,
    }),
    pendingUsersColumnHelper.display({
      id: "daysElapsed",
      header: "Days elapsed",
      cell: (props) => {
        const days = dayjs().diff(dayjs(props.row.original.invitedAt), "days");
        return `${days} ${days > 1 ? "days" : "day"}`;
      },
    }),
  ];
};
