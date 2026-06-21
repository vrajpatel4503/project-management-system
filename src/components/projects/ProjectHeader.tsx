"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import ProjectCard from "./ProjectCard";
import AddNewProjectModal from "./AddNewProjectModal";

import { PROJECTS_DATA } from "@/data/projects";
import { STATUS_OPTIONS } from "@/constants/project.constants";
import type { ProjectStatus } from "@/types/project.types";

const ProjectHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>(
    "All",
  );
  const [open, setOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);


  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Projects</h1>

          <p className="mt-1 text-muted-foreground text-sm">
            {filteredProjects.length} projects across your workspace
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex gap-3">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-96 rounded-md border border-border bg-background px-2 py-2 text-sm shadow outline-none focus:ring-1 focus:ring-ring"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | ProjectStatus)}
          className="w-40 rounded-md border border-border bg-background px-2 py-2 text-sm shadow outline-none focus:ring-1 focus:ring-ring"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <ProjectCard projects={filteredProjects} />
      <AddNewProjectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ProjectHeader;
