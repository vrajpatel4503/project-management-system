"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProjectDetails from "@/components/projects/ProjectDetails";

import { Project } from "@/types/project.types";
import { subscribeProjectById } from "@/lib/firebase/projects/project.services";

export default function Page() {
  const params = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const unsubscribe = subscribeProjectById(
      params.id as string,
      (projectData) => {
        setProject(projectData);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [params.id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="p-6">
        <h1>Project Not Found</h1>
      </div>
    );
  }

  return <ProjectDetails project={project} />;
}