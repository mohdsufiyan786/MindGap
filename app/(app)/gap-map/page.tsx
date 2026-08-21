"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { latestAssessment } from "@/lib/db";
import type { AssessmentResult } from "@/lib/types";
import { GapMap } from "@/components/GapMap";
import { firstName } from "@/lib/user";

export default function GapMapPage() {
  const { user } = useAuth();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    if (!user) return;
    latestAssessment(user.uid).then(setResult);
  }, [user]);

  if (!result) {
    return (
      <div className="mx-auto max-w-xl">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
          <Map size={26} />
        </span>
        <h1 className="mt-6 font-display text-4xl text-white">{firstName(user)}’s Learning Gap Map</h1>
        <p className="mt-3 text-mist-400">Take a diagnostic to generate the map.</p>
        <Link href="/assess" className="ui-btn mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950">
          Start assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Visual diagnosis</p>
        <h1 className="font-display text-4xl text-white xl:text-5xl">{firstName(user)}’s Learning Gap Map</h1>
        <p className="mt-2 text-mist-400">Nodes are skills. Color is mastery. Edges are prerequisites.</p>
      </div>
      <GapMap result={result} />
      <Link href="/plan" className="ui-btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950">
        What should I learn next? <ArrowRight size={16} />
      </Link>
    </div>
  );
}
