import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-rows-[64px_1fr]">
  <header className="px-6 flex items-center justify-between">
      </header>
  <main className="p-0 mt-[-96px]">{children}</main>
    </div>
  );
}
