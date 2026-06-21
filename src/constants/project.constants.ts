import { Severity, Status } from "@/types/project.types";

export const severityStyles: Record<Severity, string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-sky-100 text-sky-700",
  High: "bg-rose-100 text-rose-600",
};

export const statusStyles: Record<Status, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "Pending": "bg-amber-100 text-amber-700",
  "Hold": "bg-slate-200 text-slate-500",
  Completed: "bg-blue-100 text-blue-700",
};

export const STATUS_OPTIONS: Array<"All" | Status> = [
  "All",
  "Active",
  "Pending",
  "Hold",
  "Completed",
];