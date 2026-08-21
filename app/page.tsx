"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Map, Sparkles, Target } from "lucide-react";
import { Logo } from "@/components/Logo";

const skills = [
  { name: "Variables", level: "Good", pct: 80, color: "#3EE0A2" },
  { name: "Functions", level: "Good", pct: 75, color: "#5B8CFF" },
  { name: "Conditions", level: "Needs Practice", pct: 50, color: "#F5C14A" },
  { name: "Loops", level: "Weak", pct: 28, color: "#FF8A5B" },
  { name: "Basic Loop Logic", level: "Major Gap", pct: 8, color: "#FF5C8A" },
];

const features = [
  {
    icon: Brain,
    title: "Diagnostic, not a score",
    body: "Every miss is tagged to a skill. You see which concept failed — not a single percentage.",
  },
  {
    icon: Map,
    title: "Learning Gap Map",
    body: "A live skill graph: Mastered, Good, Needs Practice, Weak, and Major Gap.",
  },
  {
    icon: Sparkles,
    title: "What to learn next",
    body: "Cognexa sequences topics, drills, and a reassessment around the real blocker.",
  },
  {
    icon: Target,
    title: "Why you missed it",
    body: "Plain-language causes: exclusive range bounds, unused parameters, nested iteration.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#06080e] text-mist-100 mesh">
      <div className="pointer-events-none absolute inset-0 bg-grid grid-fade opacity-50" />

      <header className="relative z-20 border-b border-white/[0.06] bg-[#06080e]/70 backdrop-blur-xl">
        <div className="home-shell flex h-[72px] items-center justify-between px-8 xl:px-14 2xl:px-20">
          <Logo />
          <nav className="hidden items-center gap-10 text-[15px] text-mist-400 lg:flex">
            <a href="#product" className="transition hover:text-white">
              Product
            </a>
            <a href="#how" className="transition hover:text-white">
              How it works
            </a>
            <a href="#map" className="transition hover:text-white">
              Gap Map
            </a>
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden text-[15px] text-mist-200 sm:block">
              Sign in
            </Link>
            <Link
              href="/preview"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950"
            >
              Open product
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 min-h-[calc(100vh-72px)]">
        <div className="home-shell grid min-h-[calc(100vh-72px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="flex flex-col justify-center px-8 py-16 xl:px-14 xl:py-20 2xl:px-20">
            <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-mist-400">
              AI learning diagnostics
            </p>
            <h1 className="font-display text-[3.4rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl xl:text-[5.4rem] 2xl:text-[6.2rem]">
              Find the gap.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glow to-mint">
                Build the skill.
              </span>
            </h1>
            <p className="mt-8 max-w-[540px] text-lg leading-relaxed text-mist-400 xl:text-xl">
              Cognexa shows exactly where a student is struggling — Variables, Conditions, Loops —
              instead of hiding the problem behind a test score.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/preview"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-ink-950"
              >
                Explore the product <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center rounded-full border border-white/15 px-7 text-[15px] text-mist-200"
              >
                Sign in
              </Link>
            </div>
            <div className="mt-14 grid max-w-[560px] grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                ["15 Q", "Diagnostic"],
                ["8 skills", "Mapped live"],
                ["1 plan", "What next"],
              ].map(([k, v]) => (
                <div key={v}>
                  <p className="font-display text-3xl text-white xl:text-4xl">{k}</p>
                  <p className="mt-1 text-sm text-mist-400">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[640px] items-stretch">
            <HeroStage />
          </div>
        </div>
      </section>

      <section id="product" className="relative z-10 border-t border-white/[0.06]">
        <div className="home-shell px-8 py-24 xl:px-14 2xl:px-20">
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mist-400">The product</p>
            <h2 className="font-display text-4xl tracking-tight text-white xl:text-5xl">
              Built like a learning OS, not a quiz app.
            </h2>
            <p className="text-lg text-mist-400">
              Students leave knowing three things: what they are weak at, why they are struggling, and what
              to learn next.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="min-h-[240px] rounded-3xl border border-white/[0.08] bg-ink-900/70 p-7">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-6 font-display text-2xl text-white">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="relative z-10 border-t border-white/[0.06]">
        <div className="home-shell px-8 py-24 xl:px-14 2xl:px-20">
          <h2 className="font-display text-4xl tracking-tight text-white xl:text-5xl">How Cognexa works</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ["01", "Assess", "A short, skill-tagged diagnostic. Every item maps to a node on the graph."],
              ["02", "Map the gap", "Loop syntax can look fine while loop termination is a major gap. The map makes that obvious."],
              ["03", "Close it", "A sequenced plan, targeted drills, then a reassessment of the same skills."],
            ].map(([n, t, b]) => (
              <div key={n} className="rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-ink-800 to-ink-950 p-8 xl:p-10">
                <p className="font-display text-sm tracking-[0.2em] text-accent">{n}</p>
                <h3 className="mt-6 font-display text-3xl text-white">{t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-mist-400">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="map" className="relative z-10 border-t border-white/[0.06] px-8 py-24 xl:px-14 2xl:px-20">
        <div className="home-shell overflow-hidden rounded-[32px] border border-white/10 bg-ink-900 px-10 py-16 text-center xl:px-24 xl:py-20">
          <h2 className="font-display text-4xl tracking-tight text-white xl:text-6xl">
            Stop studying the score.
            <br />
            Study the gap.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-mist-400">
            Open the workspace and walk the Gap Map, improvement plan, and practice loop on a full desktop canvas.
          </p>
          <Link
            href="/preview"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-accent px-8 text-[15px] font-semibold text-ink-950"
          >
            Open Cognexa
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06]">
        <div className="home-shell flex h-20 items-center justify-between px-8 text-sm text-mist-400 xl:px-14 2xl:px-20">
          <span>Cognexa</span>
          <span>Find the gap. Build the skill.</span>
        </div>
      </footer>
    </div>
  );
}

function HeroStage() {
  return (
    <div className="flex w-full items-stretch p-6 lg:py-10 lg:pl-2 lg:pr-10 2xl:pr-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex min-h-[640px] w-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0a101c] shadow-[0_40px_120px_rgba(0,0,0,0.45)] lg:min-h-0"
      >
        <div className="flex h-12 items-center gap-2 border-b border-white/8 px-5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-4 text-xs text-mist-400">Cognexa · Learning Gap Map</span>
          <span className="ml-auto rounded-full bg-white/5 px-3 py-1 text-[11px] text-mist-400">
            Score 9/15 is not the story
          </span>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
            <p className="text-[11px] uppercase tracking-[0.2em] text-mist-400">Python Fundamentals</p>
            <h2 className="mt-1 font-display text-2xl text-white">Aarav’s skill graph</h2>
            <svg viewBox="0 0 520 340" className="mt-4 h-[calc(100%-4.5rem)] w-full min-h-[260px]">
              <line x1="110" y1="80" x2="110" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <line x1="260" y1="78" x2="330" y2="168" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <line x1="400" y1="80" x2="400" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <line x1="260" y1="80" x2="180" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <line x1="260" y1="80" x2="340" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <Node x={110} y={70} label="Variables" sub="Good" color="#3EE0A2" />
              <Node x={260} y={70} label="Functions" sub="Good" color="#5B8CFF" />
              <Node x={400} y={70} label="Conditions" sub="Practice" color="#F5C14A" />
              <Node x={110} y={180} label="Types" sub="Mastered" color="#3EE0A2" />
              <Node x={330} y={180} label="Params" sub="Practice" color="#F5C14A" />
              <Node x={180} y={270} label="Loops" sub="Weak" color="#FF8A5B" />
              <Node x={340} y={270} label="Loop Logic" sub="Major Gap" color="#FF5C8A" />
            </svg>
          </div>

          <div className="flex flex-col justify-center gap-4 p-7">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-white">{s.name}</span>
                  <span style={{ color: s.color }}>{s.level}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
            <p className="mt-4 text-sm leading-relaxed text-mist-400">
              The score hid the blocker: <span className="text-rose">basic loop logic</span>. That is the next hour of study.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Node({
  x,
  y,
  label,
  sub,
  color,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="22" fill={color} opacity="0.16" />
      <circle r="14" fill="#0a101c" stroke={color} strokeWidth="3" />
      <text textAnchor="middle" y="40" fill="#F4F7FB" fontSize="11" fontWeight="600">
        {label}
      </text>
      <text textAnchor="middle" y="54" fill={color} fontSize="10">
        {sub}
      </text>
    </g>
  );
}
