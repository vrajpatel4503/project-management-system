"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmationModal({
  isOpen,
  title = "Delete",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-fade-in w-full max-w-md rounded-lg border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex flex-col items-center px-6 pt-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-foreground">
            {title}
          </h2>

          <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3 border-t border-border p-5">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-border px-4 py-2 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-destructive px-4 py-2 text-white disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
