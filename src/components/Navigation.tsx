"use client";

import { UserMenu } from "./UserMenu";

export function Navigation() {
  return (
    <nav className="flex gap-2 md:gap-6 text-xs md:text-sm font-medium items-center">
      <a href="/about" className="hidden md:block text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
        About
      </a>
      <a href="/learn" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
        Learn
      </a>
      <a href="/participate" className="hidden sm:block text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
        Participate
      </a>
      <a href="/donate" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
        Donate
      </a>
      <a href="/contact" className="hidden md:block text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
        Contact
      </a>
      <UserMenu />
    </nav>
  );
}
