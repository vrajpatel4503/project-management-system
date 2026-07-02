"use client";

import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import {
  Role,
  EmployeeStatus,
  AddNewEmployeeModalProps,
  TechnicalPositionType,
} from "@/types/employee.types";
import { createEmployee } from "@/lib/firebase/employees/employee.services";

import {
  EmployeeType,
  ROLE_OPTIONS,
  TECHNICALPOSITION_SELECT_OPTIONS,
} from "@/constants/employee.constants";
import { EMPLOYEE_STATUS_OPTIONS } from "@/constants/employee.constants";
import { EMPLOYEETYPE_OPTIONS } from "@/constants/employee.constants";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

import { useEmployeeForm } from "@/hooks/employee/useEmployeeForm";
import { employeeFormSchema } from "@/schemas/employee.schema";
import { useState } from "react";

export default function AddNewEmployeeModal({
  open,
  onClose,
}: AddNewEmployeeModalProps) {
  const { form, setSingle, resetForm } = useEmployeeForm();
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleAddSubmit = async () => {
    const result = employeeFormSchema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      setIsLoading(true);

      await createEmployee(result.data);

      toast.success("Employee added successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.log(`Error in handleAddSubmit :- ${error}`);
      toast.error("Failed to create employee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    resetForm();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm px-4">
        <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Create New Member
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Create Manager or Employee account
              </p>
            </div>

            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="rounded-full bg-accent/60 p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Form */}
          <div className="p-4 space-y-4">
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

            <InputField
              label="Password"
              type="password"
              value={form.password}
              onChange={(value) => setSingle("password", value)}
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

            {/* Employee Only Fields */}
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
                    options={TECHNICALPOSITION_SELECT_OPTIONS}
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

            {/* Status + Designation */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Status"
                value={form.status}
                options={EMPLOYEE_STATUS_OPTIONS}
                onChange={(value) =>
                  setSingle("status", value as EmployeeStatus)
                }
              />

              <InputField
                label="Joined Date"
                type="date"
                value={form.joinedAt}
                onChange={(value) => setSingle("joinedAt", value)}
              />
            </div>
          </div>
          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleAddSubmit}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}

              {isLoading ? "Adding Employee..." : "Add Employee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
