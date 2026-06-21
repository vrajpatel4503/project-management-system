import ProjectDetails from "@/components/projects/ProjectDetails";
import { PROJECTS_DATA } from "@/data/projects";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = PROJECTS_DATA.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="p-6">
        <h1>Project Not Found</h1>
      </div>
    );
  }

  return <ProjectDetails project={project} />;
}
