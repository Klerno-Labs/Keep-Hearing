"use client";

import { useState } from "react";
import { UserMenu } from "./UserMenu";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-2 md:gap-6 text-xs md:text-sm font-medium items-center">
        <a href="/about" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
          About
        </a>
        <a href="/learn" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
          Learn
        </a>
        <a href="/participate" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
          Participate
        </a>
        <a href="/contact" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">
          Contact
        </a>
        <UserMenu />
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3">
        <UserMenu />

        {/* Burger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition p-2"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            // X icon when menu is open
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Burger icon when menu is closed
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[var(--brand-card)] border-b border-[var(--brand-primary)] shadow-lg md:hidden z-50">
          <nav className="flex flex-col py-4">
            <a
              href="/about"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-[var(--brand-text)] hover:bg-blue-50 hover:text-[var(--brand-accent)] transition"
            >
              About
            </a>
            <a
              href="/learn"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-[var(--brand-text)] hover:bg-blue-50 hover:text-[var(--brand-accent)] transition"
            >
              Learn
            </a>
            <a
              href="/participate"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-[var(--brand-text)] hover:bg-blue-50 hover:text-[var(--brand-accent)] transition"
            >
              Participate
            </a>
            <a
              href="/contact"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-[var(--brand-text)] hover:bg-blue-50 hover:text-[var(--brand-accent)] transition"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
