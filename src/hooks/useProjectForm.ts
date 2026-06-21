import { useState } from "react";
import { USERS_DATA } from "@/data/users";
import { MultiKeys, ProjectForm } from "@/types/project.types";

export const useProjectForm = () => {
  const [form, setForm] = useState<ProjectForm>({
    projectName: "",
    client: "",
    description: "",
    status: "Active",
    priority: "Medium",
    dueDate: "",
    progress: 0,
    manager: "",
    teamLeaders: [] as string[],
    developers: [] as string[],
    qa: [] as string[],
    designers: [] as string[],
  });

  // ------------- Filter users by Role --------------
  const getUsers = (role: string) => USERS_DATA.filter((u) => u.role === role);

  // ------------- Single select radio ----------------
  const setSingle = (key: string, id: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: id,
    }));
  };

  // -------------- Multi Select checkbox -----------------
  const toggleMulti = (key: MultiKeys, id: string) => {
    setForm((prev) => {
      const list = prev[key] as string[];

      const exists = list.includes(id);

      return {
        ...prev,
        [key]: exists ? list.filter((x) => x !== id) : [...list, id],
      };
    });
  };

  // --------------- Reset Form ------------------
  const resetForm = () => {
    setForm({
      projectName: "",
      client: "",
      description: "",
      status: "Active",
      priority: "Medium",
      dueDate: "",
      progress: 0,
      manager: "",
      teamLeaders: [],
      developers: [],
      qa: [],
      designers: [],
    });
  };

  return {
    form,
    setForm,
    getUsers,
    setSingle,
    toggleMulti,
    resetForm,
  };
};
