import { useEffect, useState } from "react";
import { CreateProject, ProjectMultiField } from "@/types/project.types";
import { subscribeEmployees } from "@/lib/firebase/employees/employee.services";
import { Employee, EmployeeType } from "@/types/employee.types";

const initialForm: CreateProject = {
  projectName: "",
  client: "",
  description: "",
  status: "active",
  priority: "medium",
  progress: 0,
  dueDate: "",
  projectManager: "",
  teamLeaders: [],
};

export const useProjectForm = () => {
  /**
   * Stores all employees fetched from Firestore.
   * Used to display Project Managers and Team Leaders.
   */
  const [employees, setEmployees] = useState<Employee[]>([]);

  /**
   * Holds the current project creation form.
   */
  const [form, setForm] = useState<CreateProject>(initialForm);

  /**
   * Subscribe to Employees collection.
   */
  useEffect(() => {
    const unsubscribe = subscribeEmployees((data: Employee[]) => {
      setEmployees(data);
    });

    return unsubscribe;
  }, []);

  /**
   * Returns employees by Employee Type.
   *
   * Examples:
   * getUsers("project_manager")
   * getUsers("team_leader")
   */
  const getUsers = (employeeType: EmployeeType): Employee[] => {
    return employees.filter(
      (employee) => employee.employeeType === employeeType,
    );
  };

  /**
   * Updates a single-value field.
   *
   * Example:
   * setSingle("projectManager", employeeId)
   */
  const setSingle = <K extends keyof CreateProject>(
    key: K,
    value: CreateProject[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Toggles values inside an array field.
   *
   * Used for Team Leaders.
   */
  const toggleMulti = (key: ProjectMultiField, id: string) => {
    setForm((prev) => {
      const currentValues = prev[key];

      return {
        ...prev,
        [key]: currentValues.includes(id)
          ? currentValues.filter((memberId) => memberId !== id)
          : [...currentValues, id],
      };
    });
  };

  /**
   * Reset form to initial state.
   */
  const resetForm = () => {
    setForm(initialForm);
  };

  return {
    employees,
    form,
    setForm,
    getUsers,
    setSingle,
    toggleMulti,
    resetForm,
  };
};
