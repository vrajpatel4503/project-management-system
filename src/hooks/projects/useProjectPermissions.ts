import { useAuthStore } from "@/lib/store/auth.store";
import { Project } from "@/types/project.types";

export function useProjectPermissions(project: Project) {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);

  const projectRole =
    role === "admin"
      ? "admin"
      : project.projectManager === user?.uid
        ? "project_manager"
        : project.teamLeaders.includes(user?.uid ?? "")
          ? "team_leader"
          : "member";

  return {
    projectRole,

    canEditProject:
      projectRole === "admin" || projectRole === "project_manager",

    canManageMembers:
      projectRole === "admin" ||
      projectRole === "project_manager" ||
      projectRole === "team_leader",

    canDeleteProject:
      projectRole === "admin" || projectRole === "project_manager",

    canChangeStatus:
      projectRole === "admin" || projectRole === "project_manager",
  };
}
