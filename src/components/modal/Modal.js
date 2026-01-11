"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save last focused element to restore focus on close
    lastFocusedRef.current = document.activeElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the modal container after mount
    const timer = setTimeout(() => {
      if (modalRef.current) {
        // focus first focusable element, or the modal itself
        const focusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (focusable || modalRef.current).focus();
      }
    }, 0);

    // Escape to close
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Basic focus trap: keep focus inside modal for Tab / Shift+Tab
      if (e.key === "Tab" && modalRef.current) {
        const focusableEls = Array.from(
          modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      // restore focus
      try {
        lastFocusedRef.current && lastFocusedRef.current.focus();
      } catch (e) {
        // ignore
      }
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;
  if (!isOpen) return null;

  const modalContent = (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onMouseDown={(e) => {
          // close when clicking on backdrop only (not when clicking inside modal)
          if (e.target === e.currentTarget) onClose();
        }}
      />

      {/* panel */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 outline-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 id="modal-title" className="text-lg sm:text-xl font-semibold">
                {title}
              </h2>
            )}
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{/* optional subtitle */}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
