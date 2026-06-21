"use client";

import { X } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Props = {
  label: string;
  role: string;

  selected: string | string[];

  open: boolean;
  onOpen: () => void;

  onSelect?: (id: string) => void; // single (manager)
  onToggle?: (id: string) => void; // multi (others)

  getUsers: (role: string) => User[];
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
      onOpen(); // close
    } else {
      onToggle?.(id);
      onOpen(); // close
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
      {/* LABEL */}
      <label className="block mb-1 text-sm font-medium">{label}</label>

      {/* SELECT BOX */}
      <div
        onClick={onOpen}
        className="min-h-10 flex flex-wrap gap-2 p-2 border rounded-lg bg-card cursor-pointer"
      >
        {/* CHIPS */}
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
        ) : (selected as string[]).length > 0 ? (
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

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto border border-border bg-card rounded-lg shadow-lg">
          {users.map((user) => (
            <label
              key={user.id}
              className="flex items-center justify-between p-2 hover:bg-accent cursor-pointer"
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

/* CHIP */
const Chip = ({ name, onRemove }: { name: string; onRemove: () => void }) => {
  return (
    <span className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-primary/10 text-primary">
      {name}
      <button onClick={onRemove}>
        <X size={14} />
      </button>
    </span>
  );
};
