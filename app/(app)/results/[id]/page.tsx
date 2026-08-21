"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAssessment } from "@/lib/db";
import type { AssessmentResult } from "@/lib/types";
import { GapMap } from "@/components/GapMap";
import { skillById } from "@/lib/skills";
import { levelCopy } from "@/lib/engine";

export default function ResultsPage() {
  const params = useParams<{ id: string }>();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAssessment(params.id)
      .then(setResult)
      .catch((e) => setError(e instanceof Error ? e.message : "Not found"));
  }, [params.id]);

  if (error) return <p className="text-rose">{error}</p>;
  if (!result) return <p className="text-mist-400">Loading report…</p>;

  const rows = Object.entries(result.skillScores).sort((a, b) => a[1].percent - b[1].percent);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Diagnostic report</p>
          <h1 className="font-display text-4xl">
            {result.score}/{result.total} is not the story
          </h1>
          <p className="mt-2 max-w-2xl text-mist-400">{result.insights[0]}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/gap-map" className="ui-btn rounded-full border border-white/15 px-4 py-2 text-sm hover:border-accent hover:text-white">
            Full map
          </Link>
          <Link href="/plan" className="ui-btn rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink-950">
            Improvement plan
          </Link>
        </div>
      </div>

      <GapMap result={result} />

      <div className="grid gap-3">
        {rows.map(([id, score]) => (
          <div key={id} className="ui-card flex items-center justify-between rounded-2xl border border-white/8 bg-ink-900 px-4 py-3">
            <div>
              <p className="font-medium">{skillById(id)?.name}</p>
              <p className="text-xs text-mist-400">
                {score.correct}/{score.total} items
              </p>
            </div>
            <p className="text-sm" style={{ color: tone(score.level) }}>
              {levelCopy[score.level].label}
            </p>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-6">
        <h2 className="font-display text-2xl">Why the misses happened</h2>
        <ul className="mt-4 space-y-3 text-sm text-mist-200">
          {result.insights.slice(1).map((line) => (
            <li key={line} className="rounded-xl bg-ink-800 px-4 py-3">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function tone(level: string) {
  if (level === "mastered" || level === "good") return "#3EE0A2";
  if (level === "needs_practice") return "#F5C14A";
  if (level === "weak") return "#FF8A5B";
  return "#FF5C8A";
}
