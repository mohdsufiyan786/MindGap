"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getPlan, latestAssessment } from "@/lib/db";
import type { ImprovementPlan } from "@/lib/types";
import { firstName } from "@/lib/user";

export default function PlanPage() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<ImprovementPlan | null>(null);

  useEffect(() => {
    if (!user) return;
    latestAssessment(user.uid).then(async (result) => {
      if (!result) return;
      setPlan(await getPlan(result.id));
    });
  }, [user]);

  if (!plan) {
    return (
      <div className="mx-auto max-w-xl">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
          <Sparkles size={26} />
        </span>
        <h1 className="mt-6 font-display text-4xl text-white">Personalized plan</h1>
        <p className="mt-3 text-mist-400">Complete a diagnostic and Cognexa will sequence your next topics.</p>
        <Link href="/assess" className="ui-btn mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950">
          Take assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-mist-400">AI improvement plan</p>
        <h1 className="font-display text-4xl text-white xl:text-5xl">
          {firstName(user)}, learn {plan.focus} next
        </h1>
        <p className="mt-2 text-mist-400">{plan.summary}</p>
      </div>
      <ol className="space-y-4">
        {plan.steps.map((step, i) => (
          <li key={step.skillId} className="ui-card glass rounded-3xl p-7">
            <p className="text-xs tracking-[0.16em] text-accent">STEP {i + 1}</p>
            <h2 className="mt-2 font-display text-2xl text-white">{step.title}</h2>
            <p className="mt-2 text-sm text-mist-400">{step.why}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {step.topics.filter(Boolean).map((t) => (
                <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist-200">
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/practice" className="mt-5 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-glow">
              {step.practiceCount} practice questions <ArrowRight size={14} />
            </Link>
          </li>
        ))}
      </ol>
      <div className="ui-card rounded-3xl border border-white/10 bg-ink-900 p-7">
        <h3 className="font-display text-xl text-white">Reassess</h3>
        <p className="mt-2 text-sm text-mist-400">
          After the drills, retake the same track. Cognexa compares skill nodes, not just the overall score.
        </p>
        <Link href="/assess" className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-glow">
          Schedule reassessment <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
