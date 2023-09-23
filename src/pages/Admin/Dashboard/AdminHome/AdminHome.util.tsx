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
  activeUsersColumnHelper.display({
    id: "onboardingStatus",
    header: "Onboarding Status",
    cell: (props) => {
      const { name, researchInterests, patientPools } = props.row.original;
      if (
        !name &&
        researchInterests?.length === 0 &&
        patientPools?.length === 0
      ) {
        return (
          <span className="p-1 bg-red-600 text-white rounded">Uninitiated</span>
        );
      }
      if (researchInterests?.length === 0 && patientPools?.length === 0) {
        return (
          <span className="p-1 bg-yellow-600 text-white rounded">
            In progress
          </span>
        );
      }
      return (
        <span className="p-1 bg-green-600 text-white rounded">Complete</span>
      );
    },
  }),
];

export const generatePendingUsersColumns = (): ColumnDef<any, string>[] => [
  pendingUsersColumnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  pendingUsersColumnHelper.accessor("invitedAt", {
    header: "Created at",
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
