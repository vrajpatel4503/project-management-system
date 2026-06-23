export type Role = "admin" | "manager" | "employee";

export type EmployeeStatus = "All" | "Active" | "Inactive" | "On Leave";

// export type Designation = "All" | "Manager" |"Team Leader" | "Developer" | "QA" | "Designer";

export interface EmployeeTableProps {
  employee: Employee[];
  onEdit: (employee: Employee) => void;
}

export interface AddNewEmployeeModalProps {
  open: boolean;
  onClose: () => void;
}

export interface EditEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

// --------- Employee -------------
export interface Employee {
  id: string;
  name: string;
  email: string;

  role: Role;
  designation: string;

  department: string;
  status: EmployeeStatus;
  avatar?: string;

  projectIds?: string[];

  joinedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

// ---------- Create Employee ------------
export interface CreateEmployee {
  name: string;
  email: string;
  password: string;

  role: Role;
  designation: string;

  department: string;
  status: EmployeeStatus;
}
