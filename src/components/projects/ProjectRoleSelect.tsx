
"use client";

import { X } from "lucide-react";

import { Employee, EmployeeType } from "@/types/employee.types";

type Props = {
  label: string;

  // Employee Type (project_manager | team_leader | member)
  role: EmployeeType;

  selected: string | string[];

  open: boolean;
  onOpen: () => void;

  onSelect?: (id: string) => void;
  onToggle?: (id: string) => void;

  getUsers: (role: EmployeeType) => Employee[];
};

export const RoleSelect = ({
  label,
  role,
  selected,
  open,
  onOpen,
  onSelect,
  onToggle,
  getUsers,
}: Props) => {
  const users = getUsers(role);

  const isSingle = !!onSelect;

  const isSelected = (id: string) => {
    if (isSingle) return selected === id;
    return (selected as string[]).includes(id);
  };

  const handleSelect = (id: string) => {
    if (isSingle) {
      onSelect?.(id);
      onOpen();
    } else {
      onToggle?.(id);
      onOpen();
    }
  };

  const removeChip = (id: string) => {
    if (isSingle) {
      onSelect?.("");
    } else {
      onToggle?.(id);
    }
  };

  return (
    <div className="relative w-full">
      <label className="block mb-1 text-sm font-medium">{label}</label>

      <div
        onClick={onOpen}
        className="min-h-10 flex flex-wrap gap-2 rounded-lg border border-border bg-card p-2 cursor-pointer"
      >
        {isSingle ? (
          selected ? (
            <Chip
              name={users.find((u) => u.id === selected)?.name || ""}
              onRemove={() => removeChip(selected as string)}
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              Select {label}
            </span>
          )
        ) : (selected as string[] | undefined)?.length ? (
          (selected as string[]).map((id) => {
            const user = users.find((u) => u.id === id);

            return (
              <Chip
                key={id}
                name={user?.name || ""}
                onRemove={() => removeChip(id)}
              />
            );
          })
        ) : (
          <span className="text-sm text-muted-foreground">Select {label}</span>
        )}
      </div>

      {open && (
        <div className="absolute bottom-full z-50 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-card shadow-lg">
          {users.map((user) => (
            <label
              key={user.id}
              className="flex cursor-pointer items-center justify-between p-2 hover:bg-accent"
            >
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>

              <input
                type={isSingle ? "radio" : "checkbox"}
                checked={isSelected(user.id)}
                onChange={() => handleSelect(user.id)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Chip = ({ name, onRemove }: { name: string; onRemove: () => void }) => {
  return (
    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-sm text-primary">
      {name}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X size={14} />
      </button>
    </span>
  );
};
