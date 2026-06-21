export type Priority = "Low" | "Medium" | "High";
export type ProjectStatus = "Active" | "Pending" | "Hold" | "Completed";
export type MultiKeys =
  | "manager"
  | "teamLeaders"
  | "developers"
  | "qa"
  | "designers";

// ---------- This can be remove later -----------
export interface ProjectCardProps {
  projects: ProjectData[];
}

export interface Developer {
  id: string;
  initials: string;
}

// ------- Team Member --------
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: "Manager" | "Team Leader" | "Developer" | "QA" | "Designer";
}

// ------- ProjectData :- used only for mock data --------
// ---------- This can be remove later -----------
export type ProjectData = {
  id: string;
  name: string;
  client: string;
  description: string;

  status: ProjectStatus;
  priority: Priority;
  progress: number;

  dueDate: string;
  accentColor: string;

  manager: TeamMember;
  teamLeaders: TeamMember[];
  developers: TeamMember[];
  qaMembers: TeamMember[];
  designers: TeamMember[];
};

// ------ Project Form :- Used for Add/Edit Project form state and validation. ---------
export type ProjectForm = {
  projectName: string;
  client: string;
  description: string;

  status: ProjectStatus;
  priority: Priority;
  progress: number;

  dueDate: string;

  manager: string;
  teamLeaders: string[];
  developers: string[];
  qa: string[];
  designers: string[];
};

// ------- Firestore Project Type ---------
// Represents a project document fetched from Firestore.
// Firestore generates the document ID.
export type Project = {
  id: string;
} & ProjectForm;
