"use client";

import type { AssessmentResult, SkillLevel } from "@/lib/types";
import { skillsForTrack } from "@/lib/skills";
import { levelCopy } from "@/lib/engine";

const layoutSlots = [
  { x: 120, y: 90 },
  { x: 320, y: 80 },
  { x: 520, y: 90 },
  { x: 180, y: 250 },
  { x: 400, y: 250 },
  { x: 580, y: 250 },
  { x: 220, y: 410 },
  { x: 460, y: 410 },
];

const colors: Record<SkillLevel, string> = {
  mastered: "#3EE0A2",
  good: "#5B8CFF",
  needs_practice: "#F5C14A",
  weak: "#FF8A5B",
  major_gap: "#FF5C8A",
};

export function GapMap({ result }: { result: AssessmentResult }) {
  const skills = skillsForTrack(result.trackId);
  const positions: Record<string, { x: number; y: number }> = {};
  skills.forEach((skill, i) => {
    positions[skill.id] = layoutSlots[i % layoutSlots.length];
  });

  return (
    <div className="glass overflow-hidden rounded-[28px] p-5 sm:p-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Learning Gap Map</p>
          <h2 className="font-display text-2xl">Strengths, weaknesses, and blockers</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-mist-400">
          {Object.entries(levelCopy).map(([key, value]) => (
            <span key={key} className="flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-1">
              <span className="h-2 w-2 rounded-full" style={{ background: colors[key as SkillLevel] }} />
              {value.label}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 720 520" className="h-auto min-w-[640px] w-full">
          {skills
            .filter((s) => s.parentId && positions[s.parentId] && positions[s.id])
            .map((s) => {
              const from = positions[s.parentId!];
              const to = positions[s.id];
              return (
                <line
                  key={s.id + "-edge"}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                />
              );
            })}
          {skills.map((skill) => {
            const pos = positions[skill.id];
            if (!pos) return null;
            const score = result.skillScores[skill.id];
            const level = score?.level ?? "needs_practice";
            const color = colors[level];
            return (
              <g key={skill.id} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle r="34" fill={color} opacity="0.15" />
                <circle r="22" fill="#10182A" stroke={color} strokeWidth="3" />
                <text textAnchor="middle" y="4" fill="#F4F7FB" fontSize="10" fontWeight="700">
                  {score ? `${score.percent}` : "—"}
                </text>
                <text textAnchor="middle" y="48" fill="#D7E0EE" fontSize="12" fontWeight="600">
                  {skill.name}
                </text>
                <text textAnchor="middle" y="64" fill={color} fontSize="10">
                  {score ? levelCopy[level].label : "Not tested"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
