"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Clock3, Map, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { latestAssessment, listAssessments } from "@/lib/db";
import type { AssessmentResult } from "@/lib/types";
import { tracks, trackTitle } from "@/lib/skills";
import { levelCopy } from "@/lib/engine";
import { GapMap } from "@/components/GapMap";
import { firstName } from "@/lib/user";

export default function DashboardPage() {
  const { user } = useAuth();
  const [latest, setLatest] = useState<AssessmentResult | null>(null);
  const [history, setHistory] = useState<AssessmentResult[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    listAssessments(user.uid)
      .then((list) => {
        setHistory(list);
        setLatest(list[0] ?? null);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load history."))
      .finally(() => setLoading(false));
  }, [user]);

  const weakest = latest
    ? Object.entries(latest.skillScores).sort((a, b) => a[1].percent - b[1].percent)[0]
    : null;

  return (
    <div className="mx-auto max-w-[1440px] space-y-8">
      <div>
        <h1 className="font-display text-4xl text-white xl:text-[3.25rem]">Hello, {firstName(user)}.</h1>
        <p className="mt-2 max-w-2xl text-lg text-mist-400">
          What are you weak at, why, and what should you learn next.
        </p>
      </div>

      {error && (
        <p className="rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">{error}</p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={ClipboardCheck} label="Latest score" value={latest ? `${latest.score}/${latest.total}` : "—"} />
        <Stat icon={Map} label="Primary gap" value={weakest ? weakest[0].replaceAll("-", " ") : "No gap yet"} />
        <Stat icon={Sparkles} label="Saved history" value={loading ? "…" : String(history.length)} />
      </div>

      {latest ? (
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <GapMap result={latest} />
          <div className="flex flex-col gap-4">
            <div className="glass rounded-[28px] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Why you are struggling</p>
              <p className="mt-3 text-lg leading-relaxed text-white">{latest.insights[0]}</p>
              <Link href="/plan" className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-glow">
                Open improvement plan <ArrowRight size={14} />
              </Link>
            </div>
            <Link href="/practice" className="ui-card rounded-[28px] border border-white/10 bg-ink-900 p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Next move</p>
              <p className="mt-2 font-display text-2xl text-white">Practice the blocker</p>
              <p className="mt-2 text-sm text-mist-400">Drills are sequenced from your weakest node.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="glass rounded-[28px] p-8">
          <h2 className="font-display text-3xl text-white">Run your first diagnostic</h2>
          <p className="mt-2 text-mist-400">Fifteen questions. Cognexa writes a gap map instead of a percentage.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tracks.map((t) => (
              <Link key={t.id} href={`/assess/${t.id}`} className="ui-card rounded-2xl border border-white/10 bg-ink-800 p-6">
                <p className="text-xs text-mist-400">
                  {t.subject} · {t.duration}
                </p>
                <p className="mt-2 font-display text-xl text-white">{t.title}</p>
                <p className="mt-1 text-sm text-mist-400">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Saved on your account</p>
            <h2 className="font-display text-3xl text-white">History</h2>
          </div>
        </div>
        {loading ? (
          <p className="text-mist-400">Loading saved diagnostics…</p>
        ) : history.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/15 px-6 py-10 text-mist-400">
            Abhi koi diagnostic save nahi hai. Assess lo — score, gap map aur plan yahan history mein aa jayenge.
          </div>
        ) : (
          <div className="grid gap-3">
            {history.map((h) => {
              const gap = Object.entries(h.skillScores).sort((a, b) => a[1].percent - b[1].percent)[0];
              return (
                <Link
                  key={h.id}
                  href={`/results/${h.id}`}
                  className="ui-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-ink-900 px-5 py-5"
                >
                  <div>
                    <p className="font-medium text-white">{trackTitle(h.trackId)}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-mist-400">
                      <Clock3 size={12} />
                      {new Date(h.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-mist-200">
                    {h.score}/{h.total}
                    {gap ? ` · ${levelCopy[gap[1].level].label}` : ""}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof ClipboardCheck;
}) {
  return (
    <div className="ui-card rounded-3xl border border-white/8 bg-ink-900 p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon size={18} />
      </div>
      <p className="mt-4 text-xs text-mist-400">{label}</p>
      <p className="mt-1 font-display text-2xl capitalize text-white">{value}</p>
    </div>
  );
}
