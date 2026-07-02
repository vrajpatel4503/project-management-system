import { Role } from "@/types/employee.types";
import { PresenceColor } from "@/utils/employee.utils";

export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  // { label: "Project Manager", value: "project_manager" },
  { label: "Employee", value: "employee" },
] as const;

export type role = (typeof ROLE_OPTIONS)[number]["value"];

// ================= Employee Status =================
export const EMPLOYEE_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "On Leave", value: "onleave" },
] as const;

export type EmployeeStatus = (typeof EMPLOYEE_STATUS_OPTIONS)[number]["value"];

// ================= Filter Status =================
export const EMPLOYEE_STATUS_FILTER_OPTIONS = [
  { label: "All", value: "All" },
  ...EMPLOYEE_STATUS_OPTIONS,
] as const;

export type EmployeeStatusFilter =
  (typeof EMPLOYEE_STATUS_FILTER_OPTIONS)[number]["value"];

// ================= EMPLOYEETYPE_OPTIONS =================

export const EMPLOYEETYPE_OPTIONS = [
  {
    label: "Project Manager",
    value: "project_manager",
  },
  {
    label: "Team Leader",
    value: "team_leader",
  },
  {
    label: "Member",
    value: "member",
  },
] as const;

export type EmployeeType = (typeof EMPLOYEETYPE_OPTIONS)[number]["value"];

// ================= TECHNICALPOSITION_OPTIONS =================

export const TECHNICALPOSITION_OPTIONS = [
  {
    label: "Frontend Developer",
    value: "frontend_developer",
  },
  {
    label: "Backend Developer",
    value: "backend_developer",
  },
  {
    label: "Mobile Developer",
    value: "mobile_developer",
  },
  {
    label: "QA",
    value: "qa",
  },
  {
    label: "UI/UX Desginer",
    value: "designer",
  },
] as const;


// Options for the Add Employee modal
export const TECHNICALPOSITION_SELECT_OPTIONS = [
  { label: "Select Technical Position", value: "" },
  ...TECHNICALPOSITION_OPTIONS,
] as const;

// ================= Filter Techincal Position =================

export const TECHNICALPOSITION_FILTER_OPTIONS = [
  { label: "All", value: "All" },
  ...TECHNICALPOSITION_OPTIONS,
] as const;

export type TechincalPositionFilter =
  (typeof TECHNICALPOSITION_OPTIONS)[number]["value"];

// ================= Role style =================
export const roleStyles: Record<Role, string> = {
  admin: "bg-red-100 text-red-700",
  employee: "bg-emerald-100 text-emerald-700",
  // project_manager: "bg-blue-100 text-blue-700",

};

export const presenceStyles: Record<PresenceColor, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  gray: "bg-gray-400",
};
