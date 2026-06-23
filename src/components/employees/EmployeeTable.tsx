"use client";

import { Pencil, Trash2, ChevronDown } from "lucide-react";

import {
  EmployeeStatus,
  EmployeeTableProps,
} from "@/types/employee.types";

import { getPresenceColor } from "@/utils/employee.utils";

import {
  deleteEmployee,
  updateEmployeeStatus,
} from "@/lib/firebase/employees/employee.services";

import {
  presenceStyles,
  roleStyles,
} from "@/constants/employee.constants";

import { capitalize } from "@/lib/format";

export default function EmployeeTable({
  employee,
  onEdit,
}: EmployeeTableProps) {
  const handleStatusChange = async (
    id: string,
    status: EmployeeStatus,
  ) => {
    try {
      await updateEmployeeStatus(id, status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this employee?"
    );

    if (!confirmed) return;

    try {
      await deleteEmployee(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              EMPLOYEE
            </th>

            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              DESIGNATION
            </th>

            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              ROLE
            </th>

            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground">
              STATUS
            </th>

            <th className="px-6 py-4" />
          </tr>
        </thead>

        <tbody>
          {employee.map((emp) => (
            <tr
              key={emp.id}
              className={`border-b border-border transition-colors last:border-b-0 ${
                emp.status === "On Leave"
                  ? "bg-muted/50 text-muted-foreground"
                  : "hover:bg-accent/30"
              }`}
            >
              {/* Employee */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-accent text-sm font-semibold text-primary">
                    {emp.avatar}

                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                        presenceStyles[
                          getPresenceColor(emp.status)
                        ]
                      }`}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {emp.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {emp.email}
                    </p>
                  </div>
                </div>
              </td>

              {/* Designation */}
              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {emp.designation}
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
              <td className="px-6 py-4">
                <div className="relative inline-block w-36">
                  <select
                    value={emp.status}
                    onChange={(e) =>
                      handleStatusChange(
                        emp.id,
                        e.target.value as EmployeeStatus
                      )
                    }
                    className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-8 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                    <option value="On Leave">
                      On Leave
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                {emp.role !== "admin" && (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${emp.name}`}
                      onClick={() => onEdit(emp)}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${emp.name}`}
                      onClick={() =>
                        handleDelete(emp.id)
                      }
                      className="rounded-md p-2 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}