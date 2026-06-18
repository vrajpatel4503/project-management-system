export const ROLES = {
  ADMIN: "admin",
  PROJECT_MANAGER: "project_manager",
  TEAM_LEAD: "team_lead",
  DEVELOPER: "developer",
  TESTER: "tester",
} as const;

export type UserRole =
  (typeof ROLES)[keyof typeof ROLES];