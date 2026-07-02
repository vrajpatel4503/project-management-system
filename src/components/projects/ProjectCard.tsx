"use client";

import Link from "next/link";
import { Calendar, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { severityStyles, statusStyles } from "@/constants/project.constants";
import { progressBarColor } from "@/utils/project.utils";
import { ProjectCardProps } from "@/types/project.types";
import { capitalize } from "@/utils/format";

import DeleteConfirmationModal from "../ui/DeleteConfimationModal";

import { deleteProject } from "@/lib/firebase/projects/project.services";
import { useAuthStore } from "@/lib/store/auth.store";
import Button from "@/components/ui/button";

export default function ProjectCard({ projects }: ProjectCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const isAdmin = role === "admin";

  const [selectedProject, setSelectedProject] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleConfirmDelete = async () => {
    if (!selectedProject) return;

    try {
      setIsDeleting(true);
      await deleteProject(selectedProject.id);

      toast.success(`${selectedProject.name} deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
      setSelectedProject(null);
    }
  };

  if (loading) {
    return null;
  }

  if (!projects.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-border">
        <p className="text-4xl font-medium text-foreground">
          No projects found
        </p>

        <p className="mt-2 text-lg text-muted-foreground">
          Try a different search term or filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block"
          >
            <div className="flex min-h-75 flex-col rounded-3xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="h-14">
                    <h3 className="line-clamp-2 text-md font-semibold leading-tight text-foreground">
                      {project.projectName}
                    </h3>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    severityStyles[project.priority]
                  }`}
                >
                  {capitalize(project.priority)}
                </span>
              </div>

              {/* Description */}
              <div className="mt-4 h-12">
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* Progress */}
              <div className="mt-4">
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

              {/* Status */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-sm font-medium capitalize ${
                    statusStyles[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>Due {project.dueDate}</span>
                </div>

                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-9 px-0 text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setSelectedProject({
                        id: project.id,
                        name: project.projectName,
                      });

                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        title={`Delete ${selectedProject?.name ?? "Project"}`}
        message={`Are you sure you want to delete ${
          selectedProject?.name ?? "this project"
        } project ? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isDeleting) return;

          setIsDeleteOpen(false);
          setSelectedProject(null);
        }}
      />
    </>
  );
}
