"use client";

export default function SpinnerOverlay({ show = false }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="w-12 h-12 border-4 border-lavender border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
