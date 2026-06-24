import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address",
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["admin", "manager", "employee"]),

  department: z.string().min(2, "Department is required"),

  status: z.enum(["Active", "Inactive", "On Leave"]),

  designation: z.string().min(4, "Designation is required"),
});
