"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";
import { EmployeeStatus, EmployeeTableProps } from "@/types/employee.types";
import { getPresenceColor } from "@/utils/employee.utils";
import {
  deleteEmployee,
  updateEmployeeStatus,
} from "@/lib/firebase/employees/employee.services";
import {
  EMPLOYEE_STATUS_OPTIONS,
  presenceStyles,
  roleStyles,
} from "@/constants/employee.constants";
import { capitalize, formatLabel } from "@/utils/format";
import SelectField from "../ui/SelectField";
import { useState } from "react";
import DeleteConfirmationModal from "../ui/DeleteConfimationModal";
import { toast } from "sonner";
import Loader from "../ui/Loader";

export default function EmployeeTable({
  employee,
  onEdit,
}: EmployeeTableProps) {
  // -- zustand --
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const isAdmin = role === "admin";

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // ------ handle status change ------
  const handleStatusChange = async (id: string, status: EmployeeStatus) => {
    try {
      await updateEmployeeStatus(id, status);
    } catch (error) {
      console.error(error);
    }
  };

  // ------ handle Delete -------
  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      setIsDeleting(true);

      await deleteEmployee(selectedEmployee.id);

      toast.success("Employee deleted successfully");

      setIsDeleteOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="animate-fade-in overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-225 border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              EMPLOYEE
            </th>

            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              TECHNICAL POSITION
            </th>

            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              EMPLOYEE TYPE
            </th>

            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              ROLE
            </th>

            {isAdmin && (
              <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
                STATUS
              </th>
            )}

            <th className="px-6 py-4" />
          </tr>
        </thead>

        <tbody>
          {employee.map((emp) => (
            <tr
              key={emp.id}
              className={`border-b border-border transition-colors last:border-b-0 ${
                emp.status === "onleave" ? "bg-muted" : "hover:bg-accent/30"
              }`}
            >
              {/* Employee */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-accent text-sm font-semibold text-primary">
                    {emp.avatar}

                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                        presenceStyles[getPresenceColor(emp.status)]
                      }`}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {emp.name}
                    </p>

                    <p className="text-sm text-muted-foreground">{emp.email}</p>
                  </div>
                </div>
              </td>
              {/* Technical Position */}
              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {emp.technicalPosition
                    ? formatLabel(emp.technicalPosition)
                    : "N/A"}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {emp.employeeType ? formatLabel(emp.employeeType) : "N/A"}
                </span>
              </td>
              {/* Role */}
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    roleStyles[emp.role]
                  }`}
                >
                  {capitalize(emp.role)}
                </span>
              </td>
              {/* Status */}
              {isAdmin && (
                <td className="px-6 py-4">
                  <div className="relative inline-block w-36">
                    <SelectField
                      value={emp.status}
                      options={EMPLOYEE_STATUS_OPTIONS}
                      onChange={(value) =>
                        handleStatusChange(emp.id, value as EmployeeStatus)
                      }
                    />
                  </div>
                </td>
              )}
              {/* Actions */}
              <td className="px-6 py-4">
                {emp.role !== "admin" && (
                  <div className="flex items-center justify-end gap-2">
                    {/* -- Edit Button */}
                    {isAdmin && (
                      <button
                        type="button"
                        aria-label={`Edit ${emp.name}`}
                        onClick={() => onEdit(emp)}
                        className="cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}

                    {/* -- Delete Button -- */}
                    {isAdmin && (
                      <button
                        type="button"
                        aria-label={`Delete ${emp.name}`}
                        onClick={() => {
                          setSelectedEmployee({
                            id: emp.id,
                            name: emp.name,
                          });

                          setIsDeleteOpen(true);
                        }}
                        className="cursor-pointer rounded-md p-2 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        title={`Delete ${selectedEmployee?.name}`}
        message={`Are you sure you want to delete ${selectedEmployee?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (isDeleting) return;

          setIsDeleteOpen(false);
          setSelectedEmployee(null);
        }}
      />
    </div>
  );
}
