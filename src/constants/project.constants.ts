import { TechnicalPositionType } from "@/types/employee.types";

export const PROJECT_STATUS = [
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "onhold" },
] as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[number]["value"];

export const PROJECT_PRIORITY = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
] as const;

export type ProjectPriority = (typeof PROJECT_PRIORITY)[number]["value"];

export const severityStyles: Record<ProjectPriority, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-sky-100 text-sky-700",
  high: "bg-rose-100 text-rose-600",
};

export const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  onhold: "bg-slate-200 text-slate-500",
  completed: "bg-blue-100 text-blue-700",
};

// --- use in ProjectDetails.tsx --
export const sections = [
  {
    title: "Frontend",
    type: "frontend_developer",
  },
  {
    title: "Backend",
    type: "backend_developer",
  },
  {
    title: "Mobile",
    type: "mobile_developer",
  },
  {
    title: "QA",
    type: "qa",
  },
  {
    title: "Design",
    type: "designer",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  type: TechnicalPositionType;
}>;
