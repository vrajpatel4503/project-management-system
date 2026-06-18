import Link from "next/link";
import { Calendar, Pencil, Trash2 } from "lucide-react";

import { severityStyles, statusStyles } from "@/constants/project.constants";
import { progressBarColor } from "@/utils/project.utils";
import { ProjectCardProps, Developer} from "@/types/project.types";

export default function ProjectCard({ projects }: ProjectCardProps) {
  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-24 text-center">
        <p className="text-base font-medium text-foreground">
          No projects found
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Try a different search term or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => {
        const visibleDevs = project.developers.slice(0, 4);
        const extraDevCount = project.developers.length - visibleDevs.length;

        return (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block"
          >
            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${project.accentColor}`}
                  />

                  <div>
                    <h3 className="text-md font-semibold leading-tight text-foreground">
                      {project.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    severityStyles[project.severity]
                  }`}
                >
                  {project.severity}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 line-clamp-1 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Progress
                  </span>

                  <span className="text-xs font-semibold text-foreground">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${progressBarColor(
                      project.progress,
                    )}`}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Team + Status */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {visibleDevs.map((dev: Developer) => (
                    <div
                      key={dev.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-accent text-[10px] font-medium"
                    >
                      {dev.initials}
                    </div>
                  ))}

                  {extraDevCount > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-medium">
                      +{extraDevCount}
                    </div>
                  )}
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-sm font-medium ${
                    statusStyles[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>Due {project.dueDate}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-destructive transition-opacity hover:opacity-80"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
