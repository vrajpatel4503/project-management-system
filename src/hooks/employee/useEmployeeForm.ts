import { useState } from "react";

import { Employee, CreateEmployee } from "@/types/employee.types";

// ==================================================
// Initial Form State
// Default values when creating a new employee
// ==================================================
const initialForm: CreateEmployee = {
  name: "",
  email: "",
  password: "",

  role: "employee",

  // Default values for employee role
  employeeType: "member",
  technicalPosition: undefined,

  department: "",
  status: "active",
  joinedAt: "",
};

export function useEmployeeForm() {
  // ==================================================
  // Form State
  // Stores all employee form values
  // ==================================================
  const [form, setForm] = useState<CreateEmployee>(initialForm);

  // ==================================================
  // Update Single Field
  // Updates only one field without affecting others
  // ==================================================
  const setSingle = <K extends keyof CreateEmployee>(
    key: K,
    value: CreateEmployee[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==================================================
  // Populate Form
  // Loads employee data into the form while editing
  // ==================================================
  const populateForm = (employee: Employee) => {
    setForm({
      name: employee.name,
      email: employee.email,
      password: "",

      role: employee.role,

      // Optional for Admin
      employeeType: employee.employeeType,
      technicalPosition: employee.technicalPosition,

      department: employee.department,
      status: employee.status,
      joinedAt: employee.joinedAt,
    });
  };

  // ==================================================
  // Reset Form
  // Restores the form to its initial state
  // ==================================================
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
