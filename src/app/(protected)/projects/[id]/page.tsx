// app/projects/[id]/page.tsx

import { PROJECTS_DATA } from "@/data/projects";

interface Props {
  params: {
    id: string;
  };
}

export default function ProjectDetailsPage({ params }: Props) {
  const project = PROJECTS_DATA.find((project) => project.id === params.id);

  if (!project) {
    return (
      <div className="p-6">
        <h1>Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">{project.name}</h1>

      <div className="rounded-xl border p-4">
        <h2 className="mb-2 text-lg font-semibold">Project Information</h2>

        <p>
          <strong>ID:</strong> {project.id}
        </p>

        <p>
          <strong>Status:</strong> {project.status}
        </p>

        <p>
          <strong>Priority:</strong> {project.severity}
        </p>

        <p>
          {/* <strong>Manager:</strong> {project.manager} */}
        </p>

        <p>
          <strong>Due Date:</strong> {project.dueDate}
        </p>

        <p className="mt-4">
          <strong>Description:</strong>
        </p>

        <p>{project.description}</p>
      </div>
    </div>
  );
}
