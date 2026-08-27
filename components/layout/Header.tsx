"use client";

import Link from "next/link";
import { useState } from "react";

import HeaderCartButton from "../cart/HeaderCartButton";

const navItems = [
  { href: "/", label: "Főoldal" },
  { href: "/products", label: "Termékek" },
  { href: "/about", label: "Rólunk" },
  { href: "/contact", label: "Kapcsolat" },
  { href: "/tenders", label: "Pályázatok" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-16 items-center justify-between gap-3">
          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0 text-lg font-bold text-blue-950 sm:text-xl"
          >
            Zentó-Piért Kft.
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <HeaderCartButton />

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="flex size-10 items-center justify-center rounded-full border border-blue-100 text-blue-950 transition hover:bg-blue-50 md:hidden"
              aria-label={isMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <span className="text-2xl leading-none">×</span>
              ) : (
                <span className="flex flex-col gap-1.5">
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-blue-100 py-3 md:hidden">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
