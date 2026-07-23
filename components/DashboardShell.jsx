"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function DashboardShell({ navItems, user, children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Pick the *most specific* matching href so that e.g. "Students" at
  // /dashboard/tutor doesn't stay highlighted when the user navigates to a
  // sibling like /dashboard/tutor/resources.
  const matchingHrefs = navItems
    .map((i) => i.href)
    .filter((h) =>
      h === "/dashboard"
        ? pathname === h
        : pathname === h || pathname.startsWith(`${h}/`)
    );
  const activeHref = matchingHrefs.reduce(
    (best, h) => (h.length > best.length ? h : best),
    ""
  );
  const isActive = (href) => href === activeHref;

  const initials = (user?.full_name || user?.email || "?")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-1 min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <SidebarContent
          navItems={navItems}
          user={user}
          initials={initials}
          isActive={isActive}
          onNavigate={() => {}}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-sidebar text-sidebar-foreground border-b border-sidebar-border flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-white/5"
        >
          <span className="sr-only">Open menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 5h14M3 10h14M3 15h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative ml-auto h-full w-72 bg-sidebar text-sidebar-foreground flex flex-col animate-fade-in-up">
            <SidebarContent
              navItems={navItems}
              user={user}
              initials={initials}
              isActive={isActive}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 md:ml-0 pt-14 md:pt-0 min-w-0">
        {children}
      </main>
    </div>
  );
}

function SidebarContent({ navItems, user, initials, isActive, onNavigate }) {
  return (
    <>
      <div className="px-5 pt-6 pb-4">
        <Logo />
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={true}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition ${
              isActive(item.href)
                ? "bg-white/10 text-white"
                : "text-sidebar-muted hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon && (
              <span
                className={`shrink-0 ${
                  isActive(item.href) ? "text-brand" : ""
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-brand text-brand-foreground flex items-center justify-center text-xs font-semibold">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">
              {user?.full_name || "—"}
            </div>
            <div className="text-xs text-sidebar-muted truncate">
              {user?.email}
            </div>
          </div>
        </div>
        <form action="/auth/signout" method="post" className="mt-1">
          <button
            type="submit"
            className="w-full text-left px-3 h-9 rounded-lg text-xs text-sidebar-muted hover:text-white hover:bg-white/5 transition"
          >
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}
