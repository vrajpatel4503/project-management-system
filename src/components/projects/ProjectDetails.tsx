import { ProjectData } from "@/types/project.types";

import ProjectInfoCard from "./ProjectInfoCard";
import { progressBarColor } from "@/utils/project.utils";

interface ProjectDetailsProps {
  project: ProjectData;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="animate-fade-in min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="bg-card rounded-3xl border border-border px-4 py-4">
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <p className="mt-2 text-muted-foreground">{project.description}</p>
        </div>

        {/* Project Info */}
        <ProjectInfoCard project={project} />

        {/* Progress */}
        <div className="glass bg-card rounded-3xl border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Project Progress</h2>

            <span className="font-semibold">{project.progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
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

        {/* Manager & Team Leader */}
        <div className="grid gap-4 md:grid-cols-2">
          {/*  Manager */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 text-lg font-semibold">Project Manager</h3>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                {getInitials(project.manager.name)}
              </div>

              <div>
                <p className="font-medium">{project.manager.name}</p>
                <p className="text-sm text-muted-foreground">
                  {project.manager.email}
                </p>
              </div>
            </div>
          </div>

          {/* 👥 Team Leaders (Scrollable) */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 text-lg font-semibold">Team Leaders</h3>

            {/* Scroll only when needed */}
            <div className="max-h-18 overflow-y-auto pr-2 scrollbar-thin space-y-3">
              {project.teamLeaders.map((leader) => (
                <div
                  key={leader.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-3"
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10 font-bold text-info">
                    {getInitials(leader.name)}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-medium text-sm">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {leader.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Developers */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 text-lg font-semibold">
              Developers ({project.developers.length})
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {project.developers.map((dev) => (
                <div
                  key={dev.id}
                  className="rounded-lg border border-border p-3"
                >
                  <p className="font-medium">{dev.name}</p>

                  <p className="text-sm text-muted-foreground">{dev.email}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QA */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-4 text-lg font-semibold">
              QA Members ({project.qaMembers.length})
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {project.qaMembers.map((qa) => (
                <div
                  key={qa.id}
                  className="rounded-lg border border-border p-3"
                >
                  <p className="font-medium">{qa.name}</p>

                  <p className="text-sm text-muted-foreground">{qa.email}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Designers */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-4 text-lg font-semibold">
              Designers ({project.designers.length})
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {project.designers.map((designer) => (
                <div
                  key={designer.id}
                  className="rounded-lg border border-border p-3"
                >
                  <p className="font-medium">{designer.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {designer.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
