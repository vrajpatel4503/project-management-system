"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import {
  Employee,
  Role,
  EmployeeStatus,
  EditEmployeeModalProps,
} from "@/types/employee.types";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

import { ROLE_OPTIONS } from "@/constants/employee.constants";
import { EMPLOYEE_STATUS_OPTIONS } from "@/constants/employee.constants";

import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import { updateEmployee } from "@/lib/firebase/employees/employee.services";

export default function EditEmployeeModal({
  open,
  onClose,
  employee,
}: EditEmployeeModalProps) {
  const { form, setForm, setSingle, resetForm } = useEmployeeForm();

  // Prefill form when employee changes
  useEffect(() => {
    if (!employee) return;

    setForm({
      name: employee.name,
      email: employee.email,
      password: "",
      role: employee.role,
      designation: employee.designation,
      department: employee.department,
      status: employee.status,
    });
  }, [employee, setForm]);

  if (!open) return null;

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleUpdate = async () => {
    if (!employee) return;

    try {
      await updateEmployee(employee.id, {
        name: form.name,
        email: form.email,
        role: form.role,
        designation: form.designation,
        department: form.department,
        status: form.status,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Edit Employee
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update employee information
            </p>
          </div>

          <button
            onClick={handleCancel}
            className="rounded-full p-2 text-muted-foreground transition-colors bg-accent hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="mt-5 space-y-4">
          <InputField
            label="Full Name"
            value={form.name}
            onChange={(value) => setSingle("name", value)}
          />

          <InputField
            label="Email"
            value={form.email}
            onChange={(value) => setSingle("email", value)}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Role"
              value={form.role}
              options={ROLE_OPTIONS}
              onChange={(value) => setSingle("role", value as Role)}
            />

            <InputField
              label="Department"
              placeholder="Engineering"
              value={form.department}
              onChange={(value) => setSingle("department", value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Status"
              value={form.status}
              options={EMPLOYEE_STATUS_OPTIONS}
              onChange={(value) => setSingle("status", value as EmployeeStatus)}
            />

            <InputField
              label="Designation"
              placeholder="Frontend Developer"
              value={form.designation}
              onChange={(value) => setSingle("designation", value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
          <button
            onClick={handleCancel}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Update Employee
          </button>
        </div>
      </div>
    </div>
  );
}
