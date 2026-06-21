import { ProjectData } from "@/types/project.types";

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "p1",
    name: "Project Alpha",
    client: "Northwind Retail",
    description:
      "Retail platform modernization with improved UI and performance.",
    severity: "High",
    status: "Active",
    progress: 68,
    dueDate: "Jun 20, 2026",
    accentColor: "bg-indigo-500",

    manager: {
      id: "m1",
      name: "John Smith",
      email: "john@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl1",
        name: "Alex Roy",
        email: "alex@company.com",
        position: "Team Leader",
      },
      {
        id: "tl2",
        name: "Michael Scott",
        email: "michael@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d1",
        name: "Liam Carter",
        email: "liam@company.com",
        position: "Developer",
      },
      {
        id: "d2",
        name: "Noah Patel",
        email: "noah@company.com",
        position: "Developer",
      },
      {
        id: "d3",
        name: "Emma Wilson",
        email: "emma@company.com",
        position: "Developer",
      },
      {
        id: "d4",
        name: "Olivia Brown",
        email: "olivia@company.com",
        position: "Developer",
      },
      {
        id: "d5",
        name: "Ethan Johnson",
        email: "ethan@company.com",
        position: "Developer",
      },
      {
        id: "d6",
        name: "Sophia Davis",
        email: "sophia@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [
      {
        id: "q1",
        name: "Emma Brown",
        email: "emma@company.com",
        position: "QA",
      },
    ],

    designers: [
      {
        id: "ui1",
        name: "Ava Wilson",
        email: "ava@company.com",
        position: "Designer",
      },
    ],
  },

  {
    id: "p2",
    name: "Project Beta",
    client: "Fenwick Logistics",
    description:
      "Shipment tracking dashboard with analytics and route optimization.",
    severity: "Medium",
    status: "Pending",
    progress: 42,
    dueDate: "Jul 15, 2026",
    accentColor: "bg-teal-500",

    manager: {
      id: "m2",
      name: "Emma Wilson",
      email: "emma.manager@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl2",
        name: "Michael Scott",
        email: "michael@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d3",
        name: "James Walker",
        email: "james@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [
      {
        id: "q2",
        name: "Sarah Khan",
        email: "sarah@company.com",
        position: "QA",
      },
    ],

    designers: [
      {
        id: "ui2",
        name: "Emily Stone",
        email: "emily@company.com",
        position: "Designer",
      },
    ],
  },

  {
    id: "p3",
    name: "Project Gamma",
    client: "Brightline Analytics",
    description: "Analytics dashboard with custom reports and export features.",
    severity: "Medium",
    status: "Active",
    progress: 80,
    dueDate: "Aug 05, 2026",
    accentColor: "bg-emerald-500",

    manager: {
      id: "m1",
      name: "John Smith",
      email: "john@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl3",
        name: "Daniel Lee",
        email: "daniel@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d4",
        name: "Ryan Thomas",
        email: "ryan@company.com",
        position: "Developer",
      },
      {
        id: "d5",
        name: "Kevin Adams",
        email: "kevin@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [
      {
        id: "q3",
        name: "Olivia Clark",
        email: "olivia@company.com",
        position: "QA",
      },
    ],

    designers: [],
  },

  {
    id: "p4",
    name: "Project Delta",
    client: "Vaultline Finance",
    description:
      "Customer onboarding system with profile setup and verification flow.",
    severity: "High",
    status: "Hold",
    progress: 25,
    dueDate: "Sep 12, 2026",
    accentColor: "bg-purple-500",

    manager: {
      id: "m2",
      name: "Emma Wilson",
      email: "emma.manager@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl4",
        name: "Chris Evans",
        email: "chris@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d6",
        name: "Aman Patel",
        email: "aman@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [
      {
        id: "q4",
        name: "Jessica Miller",
        email: "jessica@company.com",
        position: "QA",
      },
    ],

    designers: [
      {
        id: "ui3",
        name: "Sophia Turner",
        email: "sophia@company.com",
        position: "Designer",
      },
    ],
  },

  {
    id: "p5",
    name: "Design System 2.0",
    client: "Internal Platform",
    description:
      "Enterprise-wide design system upgrade and component standardization.",
    severity: "Low",
    status: "Completed",
    progress: 100,
    dueDate: "Apr 01, 2026",
    accentColor: "bg-orange-500",

    manager: {
      id: "m1",
      name: "John Smith",
      email: "john@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl5",
        name: "Grace Martin",
        email: "grace@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d7",
        name: "Ethan Brooks",
        email: "ethan@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [],

    designers: [
      {
        id: "ui4",
        name: "Ava Wilson",
        email: "ava@company.com",
        position: "Designer",
      },
    ],
  },

  {
    id: "p6",
    name: "Checkout Optimization",
    client: "Solace Commerce",
    description:
      "Checkout redesign focused on payments, fraud checks and conversion.",
    severity: "High",
    status: "Pending",
    progress: 55,
    dueDate: "Jul 30, 2026",
    accentColor: "bg-rose-500",

    manager: {
      id: "m2",
      name: "Emma Wilson",
      email: "emma.manager@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl6",
        name: "Robert King",
        email: "robert@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d8",
        name: "Arjun Patel",
        email: "arjun@company.com",
        position: "Developer",
      },
      {
        id: "d9",
        name: "David Ross",
        email: "david@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [
      {
        id: "q5",
        name: "Natalie White",
        email: "natalie@company.com",
        position: "QA",
      },
    ],

    designers: [
      {
        id: "ui5",
        name: "Mia Johnson",
        email: "mia@company.com",
        position: "Designer",
      },
    ],
  },

  {
    id: "p7",
    name: "Mobile App Revamp",
    client: "Horizon Health",
    description:
      "Cross-platform mobile application redesign with offline support.",
    severity: "Medium",
    status: "Active",
    progress: 73,
    dueDate: "Oct 10, 2026",
    accentColor: "bg-cyan-500",

    manager: {
      id: "m1",
      name: "John Smith",
      email: "john@company.com",
      position: "Manager",
    },

    teamLeaders: [
      {
        id: "tl7",
        name: "Nathan Cooper",
        email: "nathan@company.com",
        position: "Team Leader",
      },
    ],

    developers: [
      {
        id: "d10",
        name: "Karan Shah",
        email: "karan@company.com",
        position: "Developer",
      },
      {
        id: "d11",
        name: "Vivek Mehta",
        email: "vivek@company.com",
        position: "Developer",
      },
    ],

    qaMembers: [
      {
        id: "q6",
        name: "Priya Patel",
        email: "priya@company.com",
        position: "QA",
      },
    ],

    designers: [
      {
        id: "ui6",
        name: "Neha Sharma",
        email: "neha@company.com",
        position: "Designer",
      },
    ],
  },
];
