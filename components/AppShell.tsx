"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Map,
  Sparkles,
  Target,
} from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/lib/auth-context";
import { firstName, fullName, initials } from "@/lib/user";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/assess", label: "Assess", icon: ClipboardCheck },
  { href: "/gap-map", label: "Gap Map", icon: Map },
  { href: "/plan", label: "Plan", icon: Sparkles },
  { href: "/practice", label: "Practice", icon: Target },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, preview } = useAuth();
  const page = links.find((l) => pathname === l.href || pathname.startsWith(l.href + "/"));

  return (
    <div className="min-h-screen bg-[#06080e] mesh">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[280px] border-r border-white/[0.06] bg-[#0a101c]/95 p-6 lg:flex lg:flex-col">
        <Logo />
        <p className="mt-3 text-sm text-mist-400">Find the gap. Build the skill.</p>
        <nav className="mt-10 flex flex-1 flex-col gap-1.5">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm transition ${
                  active
                    ? "bg-accent/15 text-white shadow-[inset_0_0_0_1px_rgba(91,140,255,0.35)]"
                    : "text-mist-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl transition ${
                    active ? "bg-accent text-ink-950" : "bg-white/5 group-hover:bg-accent/20 group-hover:text-accent"
                  }`}
                >
                  <Icon size={18} />
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-2xl border border-white/10 bg-ink-800/80 p-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-mint text-sm font-bold text-ink-950">
              {initials(user)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{fullName(user)}</p>
              <p className="truncate text-xs text-mist-400">{user?.email}</p>
            </div>
          </div>
          {preview && <p className="mt-2 text-[11px] text-amber">Product preview</p>}
          <button
            onClick={() => logout()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs text-mist-400 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-10 hidden h-[76px] items-center justify-between border-b border-white/[0.06] bg-[#06080e]/80 px-10 backdrop-blur lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-mist-400">{page?.label ?? "Workspace"}</p>
            <p className="font-display text-lg text-white">Good to see you, {firstName(user)}</p>
          </div>
          <Link
            href="/assess"
            className="ui-btn rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950"
          >
            New diagnostic
          </Link>
        </header>

        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#06080e]/80 px-5 py-3 backdrop-blur lg:hidden">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="text-sm text-white">{firstName(user)}</span>
            <Link href="/assess" className="ui-btn rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-ink-950">
              Assess
            </Link>
          </div>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-white/[0.06] px-4 py-2 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition ${
                pathname.startsWith(link.href) ? "bg-white/10 text-white" : "text-mist-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <main className="min-h-[calc(100vh-76px)] px-5 py-8 sm:px-8 xl:px-12 xl:py-10">{children}</main>
      </div>
    </div>
  );
}
