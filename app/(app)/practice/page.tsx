"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CirclePlay,
  ExternalLink,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { latestAssessment } from "@/lib/db";
import type { AssessmentResult, SkillLevel } from "@/lib/types";
import { skillById, skillsForTrack, trackTitle } from "@/lib/skills";
import { levelCopy } from "@/lib/engine";
import { needsVideo, practiceMcqs, skillVideos } from "@/lib/practice";

export default function PracticePage() {
  const { user } = useAuth();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [skillId, setSkillId] = useState("html-structure");
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) return;
    latestAssessment(user.uid).then((latest) => {
      setResult(latest);
      if (!latest) return;
      const weakest = Object.entries(latest.skillScores).sort((a, b) => a[1].percent - b[1].percent)[0];
      if (weakest) setSkillId(weakest[0]);
    });
  }, [user]);

  const skillList = useMemo(() => {
    if (result) return skillsForTrack(result.trackId);
    return Object.keys(practiceMcqs)
      .map((id) => skillById(id))
      .filter(Boolean) as NonNullable<ReturnType<typeof skillById>>[];
  }, [result]);

  const level: SkillLevel | undefined = result?.skillScores[skillId]?.level;
  const showVideos = !result || needsVideo(level);
  const videos = skillVideos[skillId] ?? [];
  const mcqs = practiceMcqs[skillId] ?? [];
  const skill = skillById(skillId);

  function resetAnswers() {
    setPicked({});
    setChecked({});
  }

  const score = useMemo(() => {
    const answered = mcqs.filter((q) => checked[q.id]);
    if (!answered.length) return null;
    const correct = answered.filter((q) => picked[q.id] === q.correctIndex).length;
    return { correct, total: answered.length };
  }, [mcqs, checked, picked]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Targeted practice</p>
          <h1 className="font-display text-4xl text-white xl:text-5xl">{skill?.name ?? "Practice"}</h1>
          <p className="mt-2 max-w-2xl text-mist-400">{skill?.description}</p>
          {result && (
            <p className="mt-2 text-sm text-mist-500">
              From your {trackTitle(result.trackId)} diagnostic
              {level ? (
                <>
                  {" "}
                  ·{" "}
                  <span className={levelTone(level)}>{levelCopy[level].label}</span>
                  {result.skillScores[skillId] ? ` · ${result.skillScores[skillId].percent}%` : ""}
                </>
              ) : null}
            </p>
          )}
        </div>
        <Link
          href={result ? `/assess/${result.trackId}` : "/assess"}
          className="ui-btn inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm hover:border-accent hover:text-white"
        >
          Reassess track <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {skillList.map((s) => {
          const sLevel = result?.skillScores[s.id]?.level;
          const weak = sLevel && needsVideo(sLevel);
          return (
            <button
              key={s.id}
              onClick={() => {
                setSkillId(s.id);
                resetAnswers();
              }}
              className={`ui-btn rounded-full px-3.5 py-1.5 text-xs transition ${
                s.id === skillId
                  ? "bg-accent text-ink-950"
                  : weak
                    ? "border border-rose/40 bg-rose/10 text-rose hover:border-rose"
                    : "border border-white/10 text-mist-300 hover:border-accent/50 hover:text-white"
              }`}
            >
              {s.name}
              {weak ? " · gap" : ""}
            </button>
          );
        })}
      </div>

      {showVideos && videos.length > 0 && (
        <section className="overflow-hidden rounded-[28px] border border-accent/25 bg-gradient-to-br from-accent/15 via-ink-900 to-ink-950 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-ink-950">
              <CirclePlay size={22} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-accent-glow">Watch first</p>
              <h2 className="mt-1 font-display text-2xl text-white">
                {level === "major_gap" || level === "weak"
                  ? "This skill needs a rebuild — start with a short video"
                  : "Quick refresh videos before the drills"}
              </h2>
              <p className="mt-2 text-sm text-mist-400">
                Cognexa surfaces lessons when accuracy is low, then locks the idea with MCQs.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {videos.map((v) => (
              <a
                key={v.url + v.title}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="ui-card group flex items-start gap-3 rounded-2xl border border-white/10 bg-ink-950/70 p-4 hover:border-accent"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-accent group-hover:bg-accent group-hover:text-ink-950">
                  <Sparkles size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-white">{v.title}</span>
                  <span className="mt-1 block text-xs text-mist-400">
                    {v.channel} · {v.duration}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-accent">
                    Open on YouTube <ExternalLink size={12} />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-accent" />
            <h2 className="font-display text-2xl text-white">Practice MCQs</h2>
          </div>
          {score && (
            <p className="rounded-full border border-white/10 px-3 py-1 text-sm text-mist-200">
              Checked: {score.correct}/{score.total} correct
            </p>
          )}
        </div>

        {mcqs.length === 0 ? (
          <p className="text-mist-400">No drills for this skill yet.</p>
        ) : (
          <div className="space-y-4">
            {mcqs.map((q, i) => {
              const selected = picked[q.id];
              const isChecked = checked[q.id];
              const isCorrect = selected === q.correctIndex;
              return (
                <div key={q.id} className="ui-card rounded-[28px] border border-white/10 bg-[#0a101c] p-6">
                  <p className="text-xs text-mist-500">Question {i + 1}</p>
                  <p className="mt-2 text-lg font-medium text-white">{q.prompt}</p>
                  <div className="mt-4 grid gap-2">
                    {q.options.map((opt, oi) => {
                      const active = selected === oi;
                      let style = "border-white/10 bg-ink-800 hover:border-accent/50";
                      if (isChecked && oi === q.correctIndex) style = "border-mint/50 bg-mint/10 text-mint";
                      else if (isChecked && active && !isCorrect) style = "border-rose/50 bg-rose/10 text-rose";
                      else if (active) style = "border-accent bg-accent/15 text-white";
                      return (
                        <button
                          key={opt}
                          disabled={isChecked}
                          onClick={() => setPicked((p) => ({ ...p, [q.id]: oi }))}
                          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${style}`}
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-xs font-semibold">
                            {String.fromCharCode(65 + oi)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {!isChecked ? (
                      <button
                        disabled={selected === undefined}
                        onClick={() => setChecked((c) => ({ ...c, [q.id]: true }))}
                        className="ui-btn rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-40"
                      >
                        Check answer
                      </button>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 text-sm ${isCorrect ? "text-mint" : "text-rose"}`}>
                        {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        {isCorrect ? "Correct" : "Not quite"}
                      </span>
                    )}
                  </div>
                  {isChecked && <p className="mt-3 text-sm text-mist-400">{q.explanation}</p>}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="rounded-[28px] border border-white/10 bg-ink-900 p-6">
        <h3 className="font-display text-xl text-white">Ready to close the gap?</h3>
        <p className="mt-2 text-sm text-mist-400">
          After videos + MCQs, retake the same track. Cognexa will rewrite your Gap Map from scratch.
        </p>
        <Link
          href={result ? `/assess/${result.trackId}` : "/assess"}
          className="ui-btn mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950"
        >
          Reassess this track <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function levelTone(level: SkillLevel) {
  if (level === "mastered" || level === "good") return "text-mint";
  if (level === "needs_practice") return "text-amber";
  if (level === "weak") return "text-coral";
  return "text-rose";
}
