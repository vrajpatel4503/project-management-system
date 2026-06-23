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
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Employee</h2>

            <p className="mt-1 text-sm text-gray-500">
              Update employee information
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
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            Update Employee
          </button>
        </div>
      </div>
    </div>
  );
}
