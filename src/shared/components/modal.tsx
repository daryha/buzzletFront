"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import React, { PropsWithChildren, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const stop: React.MouseEventHandler = (e) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      /* overlay: opacity fade */
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        onClick={stop}
        className={clsx(
          "relative bg-primary rounded-3xl w-[500px] flex flex-col items-center",
          "transition-all duration-300", // ← transform + opacity
          isOpen ? "translate-y-0 opacity-100" : "translate-y-44 opacity-0",
          className
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 cursor-pointer"
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  );
};
