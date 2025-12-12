"use client";
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ open, title = "Tem certeza?", description = "", onConfirm, onCancel }: Props) {
  
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
/////////
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      {/* Fundo semi-transparente */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Caixa do modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {description ? <p className="text-sm text-gray-600 mb-4">{description}</p> : null}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border bg-gray-100 hover:bg-gray-200"
          >
            Não
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
