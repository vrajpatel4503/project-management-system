"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { TechnicalPositionType } from "@/types/employee.types";
import { ProjectDetailsProps } from "@/types/project.types";

import { useProjectEmployees } from "@/hooks/projects/useProjectEmployees";
import { removeMemberFromProject } from "@/lib/firebase/projects/project.services";

import ProjectInfoCard from "./ProjectInfoCard";
import ProjectMemberSection from "./ProjectMemberSection";
import AssignProjectMembersModal from "./AssignProjectMembersModal";
import EditProjectDetailsModal from "./EditProjectDetailsModal";

import Button from "../ui/Button";
import { sections } from "@/constants/project.constants";
import { progressBarColor } from "@/utils/project.utils";
import { useProjectPermissions } from "@/hooks/projects/useProjectPermissions";

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { projectRole, canEditProject, canManageMembers, canDeleteProject } =
    useProjectPermissions(project);
  const router = useRouter();

  const { getEmployeesByIds, getEmployee } = useProjectEmployees();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [memberType, setMemberType] =
    useState<TechnicalPositionType>("frontend_developer");

  // ---------------- OPEN MODAL ----------------
  const handleAddMember = (type: TechnicalPositionType) => {
    setMemberType(type);

    const map: Record<TechnicalPositionType, string[]> = {
      frontend_developer: project.frontend_developer ?? [],
      backend_developer: project.backend_developer ?? [],
      mobile_developer: project.mobile_developer ?? [],
      qa: project.qa ?? [],
      designer: project.designer ?? [],
    };

    setSelectedIds(map[type]);
    setIsModalOpen(true);
  };

  // ---------------- REMOVE MEMBER ----------------
  const handleRemoveMember = async (
    memberId: string,
    memberType: TechnicalPositionType,
  ) => {
    await removeMemberFromProject(project.id, memberId, memberType);
  };

  return (
    <div className="animate-fade-in min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.push("/projects")}
            variant="primary"
            size="md"
            leftIcon={<ArrowLeft size={18} />}
          >
            Back to Projects
          </Button>

          {canEditProject && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsEditOpen(true)}
            >
              Edit Project
            </Button>
          )}
        </div>

        {/* TITLE */}
        <div className="rounded-3xl border border-border bg-card px-4 py-4">
          <h1 className="text-2xl font-bold">{project.projectName}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* PROJECT INFO */}
        <ProjectInfoCard project={project} />

        {/* PROGRESS */}
        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="mb-3 flex justify-between">
            <h2 className="text-lg font-semibold">Project Progress</h2>
            <span className="font-semibold">{project.progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-all duration-300 ${progressBarColor(
                project.progress,
              )}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* PROJECT MANAGER + TEAM LEADERS */}
        {/* Manager & Team Leaders */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Project Manager */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 text-lg font-semibold">Project Manager</h3>

            {(() => {
              const manager = getEmployee(project.projectManager);

              return manager ? (
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {manager.avatar || manager.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium">{manager.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {manager.email}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No project manager assigned
                </p>
              );
            })()}
          </div>

          {/* Team Leaders */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 text-lg font-semibold">Team Leaders</h3>

            {project.teamLeaders.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.teamLeaders.map((leaderId) => {
                  const leader = getEmployee(leaderId);

                  if (!leader) return null;

                  return (
                    <div
                      key={leader.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                        {leader.avatar || leader.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">{leader.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {leader.email}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No team leaders assigned
              </p>
            )}
          </div>
        </div>

        {/* Team Section :- Frontend, Backend, Mobile, QA, Designer */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {sections.map((sec) => (
              <ProjectMemberSection
                key={sec.type}
                title={sec.title}
                memberType={sec.type}
                members={getEmployeesByIds(project[sec.type] || [])}
                onAdd={canManageMembers ? handleAddMember : undefined}
                onRemove={canManageMembers ? handleRemoveMember : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AssignProjectMembersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memberType={memberType}
        projectId={project.id}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <EditProjectDetailsModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={project}
      />
    </div>
  );
}
