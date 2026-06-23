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

export default function AddNewEmployeeModal({
  open,
  onClose,
}: AddNewEmployeeModalProps) {
  const { form, setSingle, resetForm } = useEmployeeForm();

  if (!open) return null;

  const handleAddSubmit = async () => {
    try {
      await createEmployee(form);

      toast.success("Employee added successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Failed to create employee");
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Employee</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add Manager or Employee account
            </p>
          </div>

          <button onClick={handleCancel}>
            <X className="h-5 w-5 text-gray-500" />
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

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Role"
              value={form.role}
              options={ROLE_OPTIONS}
              onChange={(value) => setSingle("role", value as Role)}
            />
            <InputField
              label="Department"
              placeholder="Engineer"
              value={form.department}
              onChange={(value) => setSingle("department", value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Status"
              value={form.status}
              options={EMPLOYEE_STATUS_OPTIONS}
              onChange={(value) => setSingle("status", value as EmployeeStatus)}
            />

            <InputField
              label="Designation"
              placeholder="Developer"
              value={form.designation}
              onChange={(value) => setSingle("designation", value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleAddSubmit}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
