"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <a
        href="/signin"
        className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition flex items-center gap-1"
        aria-label="Sign in to admin panel"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </a>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition flex items-center gap-2"
      >
        <span>{session.user?.name || session.user?.email}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--brand-card)] border border-[var(--brand-primary)] rounded-lg shadow-lg z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-[var(--brand-muted)] border-b border-[var(--brand-primary)]">
              <div className="font-medium text-[var(--brand-text)]">
                {session.user?.name}
              </div>
              <div className="truncate">{session.user?.email}</div>
              {session.user?.role && (
                <div className="mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    session.user.role === 'SUPERADMIN' ? 'bg-purple-100 text-purple-800' :
                    session.user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {session.user.role}
                  </span>
                </div>
              )}
            </div>

            {(session.user?.role === 'ADMIN' || session.user?.role === 'SUPERADMIN') && (
              <a
                href="/admin"
                className="block px-4 py-2 text-sm text-[var(--brand-text)] hover:bg-[var(--brand-primary)] hover:text-white transition"
              >
                Admin Dashboard
              </a>
            )}

            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-[var(--brand-text)] hover:bg-red-500 hover:text-white transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
