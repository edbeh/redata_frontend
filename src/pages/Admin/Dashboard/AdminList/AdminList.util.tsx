import dayjs from "dayjs";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { GetPendingUsersByAdmin, GetUsersByAdmin } from "api/models";
import { getAdminDeptLocalStorage } from "utils";

const activeAdminsColumnHelper = createColumnHelper<GetUsersByAdmin.Data>();
const pendingAdminsColumnHelper =
  createColumnHelper<GetPendingUsersByAdmin.Data>();

export const generateActiveAdminsColumns = (): ColumnDef<any, string>[] => [
  activeAdminsColumnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  activeAdminsColumnHelper.accessor(
    (row) => {
      const adminDept = getAdminDeptLocalStorage();
      if (adminDept) {
        const department = row.departments.filter(
          (dept) => dept.id === adminDept.id
        );
        return department[0].name;
      } else {
        return row.departments[0].name;
      }
    },
    {
      header: "Department",
      cell: (info) => info.getValue(),
    }
  ),
  activeAdminsColumnHelper.accessor("institution.name", {
    header: "Institution",
    cell: (info) => info.getValue(),
  }),
];

export const generatePendingAdminsColumns = (): ColumnDef<any, string>[] => [
  pendingAdminsColumnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  pendingAdminsColumnHelper.accessor("invitedAt", {
    header: "Created at",
    cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY, hh:mma"),
  }),
  pendingAdminsColumnHelper.display({
    id: "daysElapsed",
    header: "Days since creation",
    cell: (props) => {
      const days = dayjs()
        .startOf("day")
        .diff(dayjs(props.row.original.invitedAt).startOf("day"), "days");
      return `${days} ${days > 1 ? "days" : "day"}`;
    },
  }),
];
