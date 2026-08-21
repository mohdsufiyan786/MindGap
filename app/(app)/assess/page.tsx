"use client";

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Clock,
  Database,
  FileCode2,
  GitBranch,
  LayoutTemplate,
  Network,
} from "lucide-react";
import { tracks } from "@/lib/skills";

const icons = [FileCode2, Braces, LayoutTemplate, Database, Network, GitBranch];

export default function AssessIndexPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Diagnostics</p>
      <h1 className="font-display text-4xl text-white xl:text-5xl">Choose a skill check</h1>
      <p className="mt-2 text-mist-400">Short, tagged questions. The output is a gap map, not a grade.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tracks.map((t, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Link
              key={t.id}
              href={`/assess/${t.id}`}
              className="ui-card glass group rounded-3xl p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-ink-950">
                <Icon size={22} />
              </span>
              <p className="mt-5 flex items-center gap-2 text-xs text-mist-400">
                <Clock size={12} /> {t.subject} · {t.questions} questions · {t.duration}
              </p>
              <h2 className="mt-2 font-display text-2xl text-white">{t.title}</h2>
              <p className="mt-2 text-sm text-mist-400">{t.description}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
                Start diagnostic <ArrowRight size={14} />
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
