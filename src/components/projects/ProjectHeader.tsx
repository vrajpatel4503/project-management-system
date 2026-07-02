"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import ProjectCard from "./ProjectCard";
import AddNewProjectModal from "./AddNewProjectModal";

import { ProjectStatus, PROJECT_STATUS } from "@/constants/project.constants";
import { Project } from "@/types/project.types";
import { subscribeProjects } from "@/lib/firebase/projects/project.services";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/lib/store/auth.store";

// ---------------- Project Header Component ----------------
// Displays:
// 1. Project title and count
// 2. Search projects by name
// 3. Filter projects by status
// 4. Open Add Project modal
// 5. Display filtered project cards

const ProjectHeader = () => {
  // -- zustand --
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const isAdmin = role === "admin";

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Status filter state (All | Active | Pending | etc.)
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>(
    "All",
  );

  // Stores all projects fetched from Firestore
  const [projects, setProjects] = useState<Project[]>([]);

  // Controls Add Project Modal visibility
  const [open, setOpen] = useState(false);

  // Debounce search input to avoid filtering on every keystroke
  const debouncedSearchProjectQuery = useDebounce(searchQuery, 500);

  /**
   * Filters projects based on:
   * 1. Project name search
   * 2. Selected project status
   *
   * useMemo prevents unnecessary recalculations
   * unless dependencies change.
   */
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Match project name with search query
      const matchesSearch = project.projectName
        .toLowerCase()
        .includes(debouncedSearchProjectQuery.toLowerCase());

      // Match selected status filter
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, debouncedSearchProjectQuery, statusFilter]);

  /**
   * Fetch projects from Firestore in real-time.
   *
   * Runs once when component mounts.
   * Automatically updates UI when project data changes.
   */
  useEffect(() => {
    const unsubscribe = subscribeProjects((projects) => {
      setProjects(projects);
    });

    // Cleanup Firestore listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // or skeleton loader
  }

  return (
    <>
      {/* ---------- Page Header ---------- */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Projects</h1>

          {/* Total filtered projects count */}
          <p className="mt-1 text-muted-foreground text-sm">
            {filteredProjects.length} projects across your workspace
          </p>
        </div>

        {/* Open Add Project Modal */}
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
          >
            <Plus size={16} />
            New Project
          </button>
        )}
      </div>

      {/* ---------- Search & Filter ---------- */}
      <div className="mb-6 flex gap-3">
        {/* Search Project */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-96 rounded-md border border-border bg-background px-2 py-2 text-sm shadow outline-none focus:ring-1 focus:ring-ring"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "All" | ProjectStatus)
          }
          className="w-40 rounded-md border border-border bg-background px-2 py-2 text-sm shadow outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="All">All Status</option>

          {PROJECT_STATUS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- Project Cards ---------- */}
      <ProjectCard projects={filteredProjects} />

      {/* ---------- Add Project Modal ---------- */}
      <AddNewProjectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ProjectHeader;
