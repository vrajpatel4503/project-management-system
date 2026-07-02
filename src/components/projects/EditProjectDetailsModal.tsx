"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useProjectForm } from "@/hooks/projects/useProjectForm";
import { updateProject } from "@/lib/firebase/projects/project.services";

import { RoleSelect } from "./ProjectRoleSelect";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

import {
  PROJECT_PRIORITY,
  PROJECT_STATUS,
  ProjectPriority,
  ProjectStatus,
} from "@/constants/project.constants";

import { Project } from "@/types/project.types";

interface EditProjectDetailsModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
}

export default function EditProjectDetailsModal({
  open,
  onClose,
  project,
}: EditProjectDetailsModalProps) {
  const { form, setForm, getUsers, setSingle, toggleMulti } = useProjectForm();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Populate form when modal opens
  useEffect(() => {
    if (!open || !project) return;

    setForm({
      projectName: project.projectName,
      client: project.client,
      description: project.description,
      status: project.status,
      priority: project.priority,
      progress: project.progress,
      dueDate: project.dueDate,
      projectManager: project.projectManager,
      teamLeaders: project.teamLeaders,
    });
  }, [open, project, setForm]);

  if (!open) return null;

  const inputClass =
    "w-full rounded-md border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary";

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleEditSubmit = async () => {
    try {
      await updateProject(project.id, form);

      toast.success("Project updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm px-4">
      <div className="animate-fade-in scrollbar-thin w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-tl-lg rounded-bl-lg border border-border bg-card p-1 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h2 className="text-xl font-semibold">Edit Project</h2>
            <p className="text-xs text-muted-foreground">
              Edit project details
            </p>
          </div>

          <button onClick={onClose} className="rounded-full bg-accent p-2">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-4">
          <InputField
            label="Project Name"
            value={form.projectName}
            onChange={(value) =>
              setForm({
                ...form,
                projectName: value,
              })
            }
          />

          <InputField
            label="Client Name"
            value={form.client}
            onChange={(value) =>
              setForm({
                ...form,
                client: value,
              })
            }
          />

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className={`${inputClass} min-h-24 resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              label="Status"
              value={form.status}
              options={PROJECT_STATUS}
              onChange={(value) =>
                setForm({
                  ...form,
                  status: value as ProjectStatus,
                })
              }
            />

            <SelectField
              label="Priority"
              value={form.priority}
              options={PROJECT_PRIORITY}
              onChange={(value) =>
                setForm({
                  ...form,
                  priority: value as ProjectPriority,
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Progress %"
              type="number"
              value={form.progress === 0 ? "" : form.progress}
              onChange={(value) =>
                setForm({
                  ...form,
                  progress: Number(value) || 0,
                })
              }
            />

            <InputField
              label="Due Date"
              type="date"
              value={form.dueDate}
              onChange={(value) =>
                setForm({
                  ...form,
                  dueDate: value,
                })
              }
            />
          </div>

          <RoleSelect
            label="Manager"
            role="project_manager"
            selected={form.projectManager}
            onSelect={(id) => setSingle("projectManager", id)}
            getUsers={getUsers}
            open={openDropdown === "manager"}
            onOpen={() => toggleDropdown("manager")}
          />

          <RoleSelect
            label="Team Leaders"
            role="team_leader"
            selected={form.teamLeaders}
            onToggle={(id) => toggleMulti("teamLeaders", id)}
            getUsers={getUsers}
            open={openDropdown === "teamLeader"}
            onOpen={() => toggleDropdown("teamLeader")}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border p-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            Cancel
          </button>

          <button
            onClick={handleEditSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-white"
          >
            Edit Changes
          </button>
        </div>
      </div>
    </div>
  );
}
