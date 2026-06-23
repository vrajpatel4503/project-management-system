import { useState } from "react";

import { Employee, CreateEmployee } from "@/types/employee.types";

const initialForm: CreateEmployee = {
  name: "",
  email: "",
  password: "",
  role: "Employee",
  designation: "",
  department: "",
  status: "Active",
};

export function useEmployeeForm() {
  const [form, setForm] = useState<CreateEmployee>(initialForm);

  // Update single field
  const setSingle = <K extends keyof CreateEmployee>(
    key: K,
    value: CreateEmployee[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Populate form from employee
  const populateForm = (employee: Employee) => {
    setForm({
      name: employee.name,
      email: employee.email,
      password: "",
      role: employee.role,
      designation: employee.designation,
      department: employee.department,
      status: employee.status,
    });
  };

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
  };

  return {
    form,
    setForm,
    setSingle,
    populateForm,
    resetForm,
  };
}
