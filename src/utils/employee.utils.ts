import { EmployeeStatus } from "@/types/employee.types";

export type PresenceColor = "green" | "yellow" | "gray";

export const getPresenceColor = (status: EmployeeStatus): PresenceColor => {
  switch (status.toLowerCase()) {
    case "active":
      return "green";

    case "on leave":
      return "yellow";

    case "inactive":
      return "gray";

    default:
      return "gray";
  }
};
