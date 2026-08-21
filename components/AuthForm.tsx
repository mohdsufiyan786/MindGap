"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Lock, Mail, UserRound } from "lucide-react";
import { Logo } from "./Logo";

export function AuthScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-[#06080e] text-mist-100 mesh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12 xl:px-16 2xl:px-20">
        <Logo />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-mist-400">Cognexa workspace</p>
          <h2 className="mt-6 font-display text-[3.4rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white xl:text-[5.4rem] 2xl:text-[6.2rem]">
            Find the gap.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glow to-mint">
              Build the skill.
            </span>
          </h2>
          <p className="mt-8 max-w-[540px] text-lg leading-relaxed text-mist-400 xl:text-xl">
            Sign in to see your Learning Gap Map — not just a test score.
          </p>
        </div>
        <p className="text-sm text-mist-500">AI learning diagnostics</p>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-mist-400">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  type,
  value,
  onChange,
  icon,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon?: "mail" | "lock" | "user";
}) {
  const Icon = icon === "lock" ? Lock : icon === "user" ? UserRound : Mail;
  return (
    <label className="block text-sm">
      <span className="text-mist-400">{label}</span>
      <span className="relative mt-1.5 block">
        <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist-500" />
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-ink-800 py-3 pl-11 pr-3 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/30"
        />
      </span>
    </label>
  );
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="ui-btn mt-3 flex w-full items-center justify-center gap-3 rounded-full border border-white/15 py-3 text-sm text-white hover:border-white/30 hover:bg-white/5 disabled:opacity-50"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path fill="#EA4335" d="M9 7.2v3.5h4.9c-.2 1.1-1.2 3.2-4.9 3.2A5.4 5.4 0 1 1 9 3.6c1.5 0 2.6.7 3.2 1.2l2.2-2.1A8.5 8.5 0 1 0 9 17.5c4.9 0 8.1-3.4 8.1-8.2 0-.5 0-.9-.1-1.3H9z" />
      </svg>
      Continue with Google
    </button>
  );
}

export function ConfigNote() {
  return (
    <p className="mb-4 rounded-xl border border-amber/30 bg-amber/10 p-3 text-sm text-amber">
      Add Firebase keys to <code>.env.local</code> before signing in.
    </p>
  );
}

export function AuthFooter({ href, prompt, action }: { href: string; prompt: string; action: string }) {
  return (
    <p className="mt-8 text-center text-sm text-mist-400">
      {prompt}{" "}
      <Link href={href} className="text-white transition hover:text-accent">
        {action}
      </Link>
    </p>
  );
}
