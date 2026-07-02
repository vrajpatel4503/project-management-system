import { Employee, EmployeeStatus } from "@/types/employee.types";

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

// For Project Manager & Team Leader names
export const createEmployeeNameMap = (employees: Employee[]) =>
  employees.reduce(
    (acc, emp) => {
      acc[emp.id] = emp.name;
      return acc;
    },
    {} as Record<string, string>,
  );

export const getEmployeeName = (
  id: string,
  employeeMap: Record<string, string>,
) => employeeMap[id] || "Unknown Employee";

// For Project Member Cards
export const createEmployeeObjectMap = (employees: Employee[]) =>
  employees.reduce(
    (acc, emp) => {
      acc[emp.id] = emp;
      return acc;
    },
    {} as Record<string, Employee>,
  );

export const getEmployeeById = (id: string, employees: Employee[]) =>
  employees.find((emp) => emp.id === id);


// generate Avatar Initials
export const generateAvatarInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};
