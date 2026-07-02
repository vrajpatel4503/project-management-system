import { Timestamp } from "firebase/firestore";

export interface AddNewEmployeeModalProps {
  open: boolean;
  onClose: () => void;
}

export interface EditEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export interface EmployeeTableProps {
  employee: Employee[];
  onEdit: (employee: Employee) => void;
}

// -- Use in EmployeeHeader.tsx ---
export type EmployeeStatusFilter = "All" | EmployeeStatus;

// -- Use in EmployeeHeader.tsx ---
export type TechnicalPositionFilter = "All" | TechnicalPositionType;

export type Role = "admin" | "employee" ;

export type EmployeeType = "project_manager" | "team_leader" | "member";

export type TechnicalPositionType =
  | "frontend_developer"
  | "backend_developer"
  | "mobile_developer"
  | "qa"
  | "designer";

export type EmployeeStatus = "active" | "inactive" | "onleave";

export interface Employee {
  id: string;

  name: string;
  email: string;

  role: Role;

  // Only for employees
  employeeType?: EmployeeType;
  technicalPosition?: TechnicalPositionType;

  department: string;
  status: EmployeeStatus;

  avatar?: string;
  projectIds?: string[];

  joinedAt: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// This is only for the form when adding a new employee.
export interface CreateEmployee {
  name: string;
  email: string;
  password: string;

  role: Role;

  employeeType?: EmployeeType;
  technicalPosition?: TechnicalPositionType;

  department: string;
  status: EmployeeStatus;

  joinedAt: string;
}
