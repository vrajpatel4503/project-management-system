"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import {
  Role,
  EmployeeStatus,
  EditEmployeeModalProps,
  EmployeeType,
  TechnicalPositionType,
} from "@/types/employee.types";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

import {
  ROLE_OPTIONS,
  EMPLOYEE_STATUS_OPTIONS,
  EMPLOYEETYPE_OPTIONS,
  TECHNICALPOSITION_OPTIONS,
} from "@/constants/employee.constants";

import { useEmployeeForm } from "@/hooks/employee/useEmployeeForm";
import { updateEmployee } from "@/lib/firebase/employees/employee.services";
import { generateAvatarInitials } from "@/utils/employee.utils";

export default function EditEmployeeModal({
  open,
  onClose,
  employee,
}: EditEmployeeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { form, populateForm, setSingle, resetForm } = useEmployeeForm();

  useEffect(() => {
    if (!employee) return;

    populateForm(employee);
  }, [employee]);

  if (!open) return null;

  const handleCancel = () => {
    if (isLoading) return;
    resetForm();
    onClose();
  };

  // ==================================================
  // Update Employee
  // ==================================================
  const handleUpdate = async () => {
    if (!employee) return;

    const avatar = generateAvatarInitials(form.name);

    try {
      setIsLoading(true);
      const updatedData =
        form.role === "admin"
          ? {
              name: form.name,
              email: form.email,
              role: form.role,
              department: form.department,
              status: form.status,
              joinedAt: form.joinedAt,
              avatar,

              // Admin doesn't need these
              employeeType: undefined,
              technicalPosition: undefined,
            }
          : {
              name: form.name,
              email: form.email,
              role: form.role,
              employeeType: form.employeeType,
              technicalPosition: form.technicalPosition,
              department: form.department,
              status: form.status,
              joinedAt: form.joinedAt,
              avatar,
            };

      await updateEmployee(employee.id, updatedData);

      toast.success("Employee updated successfully");

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update employee");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm">
      <div className="animate-fade-in scrollbar-thin w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-tl-lg rounded-bl-lg border border-border bg-card p-5 shadow-lg">
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
            disabled={isLoading}
            className="rounded-full bg-accent/60 p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="mt-4 space-y-4">
          <InputField
            label="Full Name"
            value={form.name}
            onChange={(value) => setSingle("name", value)}
          />

          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => setSingle("email", value)}
          />

          {/* Role + Department */}
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

          {form.role === "employee" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Employee Type"
                  value={form.employeeType ?? ""}
                  options={EMPLOYEETYPE_OPTIONS}
                  onChange={(value) =>
                    setSingle("employeeType", value as EmployeeType)
                  }
                />

                <SelectField
                  label="Technical Position"
                  value={form.technicalPosition ?? ""}
                  options={TECHNICALPOSITION_OPTIONS}
                  onChange={(value) =>
                    setSingle(
                      "technicalPosition",
                      value as TechnicalPositionType,
                    )
                  }
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Status"
              value={form.status}
              options={EMPLOYEE_STATUS_OPTIONS}
              onChange={(value) => setSingle("status", value as EmployeeStatus)}
            />

            <InputField
              label="Joined Date"
              type="date"
              value={form.joinedAt}
              onChange={(value) => setSingle("joinedAt", value)}
            />
          </div>

          {/* Status + Designation */}

          {/* Position + Joined Date */}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
          <button
            disabled={isLoading}
            onClick={handleCancel}
            className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={handleUpdate}
            className="rounded-md flex justify-center items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 focus:ring-2 focus:ring-ring"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}

            {isLoading ? "Updating Employee..." : "Update Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}
