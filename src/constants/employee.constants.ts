import {  Role, EmployeeStatus } from "@/types/employee.types";
import { PresenceColor } from "@/utils/employee.utils";

export const ROLE_OPTIONS: readonly Role[] = ["admin", "manager", "employee"];

export const EMPLOYEE_STATUS_OPTIONS: readonly EmployeeStatus[] = [
  "All",
  "Active",
  "Inactive",
  "On Leave",
];

export const roleStyles: Record<Role, string> = {
  admin: "bg-red-100 text-red-700",
  manager: "bg-blue-100 text-blue-700",
  employee: "bg-emerald-100 text-emerald-700",
};

export const presenceStyles: Record<PresenceColor, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  gray: "bg-gray-400",
};