import { z } from "zod";

// ==================================================
// Common Fields
// ==================================================

const baseFields = {
  name: z.string().trim().min(1, "Please enter the employee's name."),

  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Please enter a password.")
    .min(6, "Password must be at least 6 characters long."),

  department: z.string().trim().min(1, "Please select a department."),

  status: z.enum(["active", "inactive", "onleave"], {
    error: "Please select an employee status.",
  }),

  joinedAt: z.string().min(1, "Please select the joining date."),
};

const technicalPositionEnum = z.enum(
  [
    "frontend_developer",
    "backend_developer",
    "mobile_developer",
    "qa",
    "designer",
  ],
  {
    error: "Please select a technical position.",
  },
);

// ==================================================
// Employee Schema
// ==================================================

// ==================================================
// z.discriminatedUnion() is a Zod method that validates different object shapes based on the value of a specific field

// ==================================================

// First, if role is "employee", then check employeeType
// employeeType decides which employee schema to use
const employeeSchema = z.discriminatedUnion("employeeType", [
  // ----------------------------------------
  // Project Manager
  // No technicalPosition is required
  // ----------------------------------------
  z.object({
    ...baseFields,

    role: z.literal("employee"),
    employeeType: z.literal("project_manager"),
  }),

  // ----------------------------------------
  // Team Leader
  // technicalPosition is required
  // ----------------------------------------
  z.object({
    ...baseFields,

    role: z.literal("employee"),
    employeeType: z.literal("team_leader"),
    technicalPosition: technicalPositionEnum,
  }),
  // ----------------------------------------
  // Member
  // technicalPosition is required
  // ----------------------------------------
  z.object({
    ...baseFields,

    role: z.literal("employee"),
    employeeType: z.literal("member"),
    technicalPosition: technicalPositionEnum,
  }),
]);

// ==================================================
// Admin Schema
// ==================================================

// If role is "admin", use this schema
const adminSchema = z.object({
  ...baseFields,

  role: z.literal("admin"),
});

// ==================================================
// Main Schema
// ==================================================

export const employeeFormSchema = z.discriminatedUnion("role", [
  adminSchema,
  employeeSchema,
]);

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
