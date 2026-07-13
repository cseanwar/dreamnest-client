"use client";

import { useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handler = () => onCancel();
    el.addEventListener("close", handler);
    return () => el.removeEventListener("close", handler);
  }, [onCancel]);

  const iconColors = {
    danger:
      "bg-error/10 text-error",
    warning:
      "bg-gold/10 text-gold",
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop:bg-navy/60"
      onClick={(e) => { if (e.target === dialogRef.current) onCancel(); }}
    >
      <div className="modal-box bg-white rounded-box p-0 max-w-sm shadow-xl border border-gray-light">
        <div className="p-6 text-center">
          <div
            className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${iconColors[variant]}`}
          >
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-heading text-navy mb-2">{title}</h3>
          <p className="text-sm text-gray leading-relaxed">{message}</p>
        </div>
        <div className="flex border-t border-gray-light">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-3.5 text-sm font-medium text-gray hover:text-navy hover:bg-base-200 transition-colors disabled:opacity-50 border-r border-gray-light"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-3.5 text-sm font-medium transition-colors disabled:opacity-50 ${
              variant === "danger"
                ? "text-error hover:bg-error/5"
                : "text-gold hover:bg-gold/5"
            }`}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}
