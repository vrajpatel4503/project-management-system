"use client";

import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

import { ProjectMemberCardProps } from "@/types/project.types";

import DeleteConfirmationModal from "../ui/DeleteConfimationModal";
import Button from "@/components/ui/button";

export default function ProjectMemberCard({
  title,
  members,
  memberType,
  onAdd,
  onRemove,
}: ProjectMemberCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const [selectedMember, setSelectedMember] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleConfirmDelete = async () => {
    if (!selectedMember || !onRemove) return;

    try {
      setIsRemoving(true);

      await onRemove(selectedMember.id, memberType);

      toast.success(`${selectedMember.name} removed successfully`);
    } catch (err) {
      toast.error("Failed to remove member");
    } finally {
      setIsRemoving(false);
      setIsDeleteOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="flex h-96 w-96 shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">
            {title} ({members?.length || 0})
          </h3>

          {onAdd && (
            <Button
              onClick={() => onAdd(memberType)}
              variant="primary"
              size="md"
              fullWidth={false}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add
            </Button>
          )}
        </div>

        <div className="my-4 border-t border-border" />

        {/* LIST */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-2">
          {members?.length ? (
            members.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between rounded-xl border border-border p-4 transition hover:bg-accent/40"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {employee.avatar || employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium">{employee.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {employee.technicalPosition
                        ?.replaceAll("_", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                  </div>
                </div>

                {/* DELETE */}
                {onRemove && (
                  <button
                    onClick={() => {
                      setSelectedMember({
                        id: employee.id,
                        name: employee.name,
                      });

                      setIsDeleteOpen(true);
                    }}
                    className="rounded-full p-2 text-red-500 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users size={28} strokeWidth={2} />
                </div>

                <p className="font-semibold text-muted-foreground">
                  No members assigned
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {onAdd
                    ? "Click Add to assign team members."
                    : "You don't have permission to manage members."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        title={`Remove ${selectedMember?.name}`}
        message={`Are you sure you want to remove ${selectedMember?.name} from this project?`}
        confirmText="Remove"
        cancelText="Cancel"
        loading={isRemoving}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isRemoving) return;

          setIsDeleteOpen(false);
          setSelectedMember(null);
        }}
      />
    </>
  );
}
