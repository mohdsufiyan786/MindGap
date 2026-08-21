"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { questionsByTrack } from "@/lib/questions";
import { tracks } from "@/lib/skills";
import { analyzeAssessment, buildPlan } from "@/lib/engine";
import { saveAssessmentResult, savePlan } from "@/lib/db";
import { useAuth } from "@/lib/auth-context";

export default function TakeAssessmentPage() {
  const params = useParams<{ track: string }>();
  const trackId = params.track;
  const track = tracks.find((t) => t.id === trackId);
  const questions = questionsByTrack[trackId] ?? [];
  const { user } = useAuth();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const q = questions[index];
  const pct = questions.length ? Math.round((index / questions.length) * 100) : 0;

  if (!track || !q) {
    return <p className="text-mist-400">This diagnostic is not available.</p>;
  }

  async function finish(nextAnswers: Record<string, number>) {
    if (!user) return;
    setBusy(true);
    setError("");
    try {
      const id = crypto.randomUUID();
      const result = analyzeAssessment(trackId, nextAnswers, user.uid, id);
      const plan = buildPlan(result);
      await saveAssessmentResult(result);
      await savePlan(plan);
      router.push(`/results/${id}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not save to Firebase.";
      setError(message);
      setBusy(false);
    }
  }

  function choose(optionIndex: number) {
    const next = { ...answers, [q.id]: optionIndex };
    setAnswers(next);
    if (index < questions.length - 1) setIndex(index + 1);
    else void finish(next);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.2em] text-mist-400">{track.title}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-sm text-mist-400">
        Question {index + 1} of {questions.length}
        {busy ? " · Saving to your account…" : ""}
      </p>
      <div className="mt-8 rounded-[28px] border border-white/10 bg-[#0a101c] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <h1 className="font-display text-3xl leading-snug text-white">{q.prompt}</h1>
        {q.code && (
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-ink-950 p-5 text-sm text-mint">
            {q.code}
          </pre>
        )}
        <div className="mt-6 grid gap-3">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              disabled={busy}
              onClick={() => choose(i)}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800 px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 disabled:opacity-50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-sm font-semibold text-mist-300 group-hover:bg-accent group-hover:text-ink-950">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[15px] text-white">{opt}</span>
            </button>
          ))}
        </div>
      </div>
      {error && (
        <p className="mt-4 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">{error}</p>
      )}
      {index > 0 && !busy && (
        <button onClick={() => setIndex(index - 1)} className="mt-6 inline-flex items-center gap-2 text-sm text-mist-400 hover:text-white">
          <ArrowLeft size={14} /> Back
        </button>
      )}
    </div>
  );
}
