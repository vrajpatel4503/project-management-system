import { ProjectPriority, ProjectStatus } from "@/constants/project.constants";
import { Employee, TechnicalPositionType } from "./employee.types";

// ---------------- Utility ----------------

export type ProjectMultiField = "teamLeaders";

// ---------------- Create / Edit Form ----------------

export interface CreateProject {
  projectName: string;
  client: string;
  description: string;

  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;

  dueDate: string;

  projectManager: string;
  teamLeaders: string[];
}

// ---------------- Project ----------------

export interface Project extends CreateProject {
  id: string;

  frontend_developer: string[];
  backend_developer: string[];
  mobile_developer: string[];
  qa: string[];
  designer: string[];
}

// ---------------- Firestore ----------------
export interface ProjectFirestore extends CreateProject {
  frontend_developer: string[];
  backend_developer: string[];
  mobile_developer: string[];
  qa: string[];
  designer: string[];
}

// ---------------- Props ----------------

// --- project card props :- Display all projects ---
export interface ProjectCardProps {
  projects: Project[];
}

// --- Project Details Props :- Display project Details ---
export interface ProjectDetailsProps {
  project: Project;
}

// --- Project Member Card Props ---
export interface ProjectMemberCardProps {
  title: string;
  members: Employee[];
  memberType: TechnicalPositionType;
  onAdd?: (type: TechnicalPositionType) => void;
  onRemove?: (memberId: string, memberType: TechnicalPositionType) => void;
}
