import { ProjectForm } from "@/types/project.types";
import {
  ProjectPriority,
  severityStyles,
  statusStyles,
  ProjectStatus,
} from "@/constants/project.constants";
import { capitalize } from "@/utils/format";

interface ProjectInfoCardProps {
  project: ProjectForm;
}

export default function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  const status = {
    label: project.status,
    className: statusStyles[project.status as ProjectStatus],
  };

  const severity = {
    label: project.priority,
    className: severityStyles[project.priority as ProjectPriority],
  };

  const projectDetails = [
    { label: "Client", value: project.client },
    { label: "Deadline", value: project.dueDate },
    { label: "Status", type: "status" },
    { label: "Severity", type: "severity" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {projectDetails.map((item) => {
        const isStatus = item.type === "status";
        const isSeverity = item.type === "severity";

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>

            {isStatus && (
              <span
                className={`mt-2 inline-block rounded-full border px-3 py-1 text-sm ${status.className}`}
              >
                {capitalize(status.label)}
              </span>
            )}

            {isSeverity && (
              <span
                className={`mt-2 inline-block rounded-full border px-3 py-1 text-sm ${severity.className}`}
              >
                {capitalize(severity.label)}
              </span>
            )}

            {!isStatus && !isSeverity && (
              <p className="mt-2 font-medium">{item.value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
