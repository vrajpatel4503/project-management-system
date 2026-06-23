"use client";

import { X } from "lucide-react";

import {
  Role,
  EmployeeStatus,
  AddNewEmployeeModalProps,
} from "@/types/employee.types";
import { createEmployee } from "@/lib/firebase/employees/employee.services";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

import { toast } from "sonner";

import { ROLE_OPTIONS } from "@/constants/employee.constants";
import { EMPLOYEE_STATUS_OPTIONS } from "@/constants/employee.constants";

import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import { employeeSchema } from "@/schemas/employee.schema";

export default function AddNewEmployeeModal({
  open,
  onClose,
}: AddNewEmployeeModalProps) {
  const { form, setSingle, resetForm } = useEmployeeForm();

  if (!open) return null;

  const handleAddSubmit = async () => {
    const result = employeeSchema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      await createEmployee(result.data);

      toast.success("Employee added successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.log(`Error in handleAddSubmit :- ${error}`);
      toast.error("Failed to create employee");
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Add Employee
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add Manager or Employee account
            </p>
          </div>

          <button
            onClick={handleCancel}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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

          <InputField
            label="Password"
            value={form.password}
            onChange={(value) => setSingle("password", value)}
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
            onClick={handleAddSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
