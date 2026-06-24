"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useProjectForm } from "@/hooks/useProjectForm";
import { ProjectStatus, Priority } from "@/types/project.types";
import { RoleSelect } from "./ProjectRoleSelect";
import { addProject } from "@/lib/firebase/projects/project.services";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddNewProjectModal({ open, onClose }: Props) {
  const { form, setForm, getUsers, setSingle, toggleMulti, resetForm } =
    useProjectForm();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!open) return null;

  const inputClass =
    "w-full rounded-md border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary";

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleSubmit = async () => {
    try {
      await addProject({
        projectName: form.projectName,
        client: form.client,
        description: form.description,

        status: form.status,
        priority: form.priority,
        progress: form.progress,

        dueDate: form.dueDate,

        manager: form.manager,
        teamLeaders: form.teamLeaders,
        developers: form.developers,
        qa: form.qa,
        designers: form.designers,
      });

      console.log("Project Added");

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl animate-fade-in">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h2 className="text-xl font-semibold">Create New Project</h2>
            <p className="text-xs text-muted-foreground">
              Add project details and assign team
            </p>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-accent">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-6">
          {/* ---- Project Name ---- */}
          <InputField
            label="Project Name"
            value={form.projectName}
            onChange={(value) => setForm({ ...form, projectName: value })}
          />

          {/* ---- Client Name ---- */}
          <InputField
            label="Client Name"
            value={form.client}
            onChange={(value) => setForm({ ...form, client: value })}
          />

          {/* ------ Description ----- */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputClass} min-h-22 resize-none`}
            />
          </div>

          {/* ------ Status , Priority, Progrss % */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Status"
              value={form.status}
              options={["Active", "Pending", "Completed", "Hold"]}
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
              options={["Low", "Medium", "High"]}
              onChange={(value) =>
                setForm({
                  ...form,
                  priority: value as Priority,
                })
              }
            />

            <InputField
              label="Progress %"
              type="number"
              value={form.progress}
              onChange={(value) =>
                setForm({
                  ...form,
                  progress: Number(value),
                })
              }
            />
          </div>

          {/* ---- Team Roles :- (Manager, Team Leader, QA, Developer) --- */}

          <RoleSelect
            label="Manager"
            role="Manager"
            selected={form.manager}
            onSelect={(id) => setSingle("manager", id)}
            getUsers={getUsers}
            open={openDropdown === "manager"}
            onOpen={() => toggleDropdown("manager")}
          />

          <RoleSelect
            label="Team Leaders"
            role="Team Leader"
            selected={form.teamLeaders}
            onToggle={(id) => toggleMulti("teamLeaders", id)}
            getUsers={getUsers}
            open={openDropdown === "teamLeader"}
            onOpen={() => toggleDropdown("teamLeader")}
          />

          <RoleSelect
            label="Developers"
            role="Developer"
            selected={form.developers}
            onToggle={(id) => toggleMulti("developers", id)}
            getUsers={getUsers}
            open={openDropdown === "developers"}
            onOpen={() => toggleDropdown("developers")}
          />

          <RoleSelect
            label="QA"
            role="QA"
            selected={form.qa}
            onToggle={(id) => toggleMulti("qa", id)}
            getUsers={getUsers}
            open={openDropdown === "qa"}
            onOpen={() => toggleDropdown("qa")}
          />

          <RoleSelect
            label="Designers"
            role="Designer"
            selected={form.designers}
            onToggle={(id) => toggleMulti("designers", id)}
            getUsers={getUsers}
            open={openDropdown === "designer"}
            onOpen={() => toggleDropdown("designer")}
          />
        </div>

        <div className="flex items-center border-t border-border p-4">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
