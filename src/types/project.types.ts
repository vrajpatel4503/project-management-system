  export type Severity = "Low" | "Medium" | "High";
  export type Status = "Active" | "Pending" | "Hold" | "Completed";

  export interface ProjectCardProps {
    projects: Project[];
  }

  export interface Developer {
    id: string;
    initials: string;
  }

  export interface Project {
    id: string;
    name: string;
    client: string;
    description: string;
    severity: Severity;
    progress: number;
    status: Status;
    dueDate: string;
    developers: Developer[];
    accentColor: string;
  }