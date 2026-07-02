"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Employee, TechnicalPositionType } from "@/types/employee.types";
import { subscribeEmployees } from "@/lib/firebase/employees/employee.services";
import { assignMembersToProject } from "@/lib/firebase/projects/project.services";

import Button from "@/components/ui/Button";

type AssignProjectMembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  memberType: TechnicalPositionType;
  projectId: string;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
};

export default function AssignProjectMembersModal({
  isOpen,
  onClose,
  memberType,
  projectId,
  selectedIds,
  setSelectedIds,
}: AssignProjectMembersModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeEmployees(setEmployees);
    return unsubscribe;
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.technicalPosition?.toLowerCase() === memberType.toLowerCase(),
    );
  }, [employees, memberType]);

  const handleToggle = (employeeId: string) => {
    if (isLoading) return;

    setSelectedIds((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    );
  };

  const handleAssign = async () => {
    if (selectedIds.length === 0) {
      toast.error(`Please select at least one ${memberType}`);
      return;
    }

    try {
      setIsLoading(true);

      await assignMembersToProject(projectId, memberType, selectedIds);

      toast.success("Members assigned successfully");

      setSelectedIds([]);
      onClose();
    } catch (error) {
      console.error("Failed to assign members:", error);
      toast.error("Failed to assign members. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-fade-in flex h-[80vh] w-full max-w-lg flex-col rounded-lg border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold capitalize">
            Assign {memberType.replaceAll("_", " ")}
          </h2>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Employee List */}
        <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-3">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <label
                  key={employee.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    disabled={isLoading}
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => handleToggle(employee.id)}
                    className="h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-ring disabled:cursor-not-allowed"
                  />

                  <div>
                    <p className="font-medium">{employee.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {employee.email}
                    </p>
                  </div>
                </label>
              ))
            ) : (
              <div className="flex min-h-80 items-center justify-center">
                <p className="text-3xl text-muted-foreground">
                  No {memberType.replaceAll("_", " ")} found.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border px-6 py-5">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Cancelling..." : "Cancel"}
          </button>

          <Button
            onClick={handleAssign}
            loading={isLoading}
            disabled={selectedIds.length === 0}
          >
            {isLoading ? "Assigning..." : "Assign Members"}
          </Button>
        </div>
      </div>
    </div>
  );
}
