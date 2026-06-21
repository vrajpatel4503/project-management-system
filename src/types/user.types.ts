export type Role =
  | "Admin"
  | "Manager"
  | "Employee"
  | "QA"
  | "Tester"
  | "Team Leader"
  | "Developer";

export type Status = "Active" | "Inactive" | "Offline" | "On Leave";

export interface Users {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: Status;
  avatar: string;
  department: string;
  joinedAt: string;
}