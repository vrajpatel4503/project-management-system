import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Bell,
  Activity,
  Settings,
  User,
  ShieldCheck,
  Bug,
} from "lucide-react";

export const SIDEBAR_LINK = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/tasks",
    label: "Tasks",
    icon: CheckSquare,
  },
  // {
  //   href: "/kanban",
  //   label: "Kanban",
  //   icon: ShieldCheck,
  // },
  {
    href: "/qa-tracking",
    label: "QA Tracking",
    icon: ShieldCheck,
  },
  {
    href: "/bug-tracking",
    label: "Bug Tracking",
    icon: Bug,
  },
  {
    href: "/employees",
    label: "Employees",
    icon: Users,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/activity",
    label: "Activity Logs",
    icon: Activity,
  },
  // {
  //   href: "/settings",
  //   label: "Settings",
  //   icon: Settings,
  // },
  // {
  //   href: "/profile",
  //   label: "Profile",
  //   icon: User,
  // },
];
