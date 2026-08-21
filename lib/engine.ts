import type { AssessmentResult, SkillLevel } from "./types";
import { skillById, skillsForTrack } from "./skills";
import { questionsByTrack } from "./questions";

export function percentToLevel(percent: number): SkillLevel {
  if (percent >= 85) return "mastered";
  if (percent >= 70) return "good";
  if (percent >= 50) return "needs_practice";
  if (percent >= 30) return "weak";
  return "major_gap";
}

export const levelCopy: Record<SkillLevel, { label: string; tone: string }> = {
  mastered: { label: "Mastered", tone: "mint" },
  good: { label: "Good", tone: "mint" },
  needs_practice: { label: "Needs Practice", tone: "amber" },
  weak: { label: "Weak", tone: "coral" },
  major_gap: { label: "Major Gap", tone: "rose" },
};

export function analyzeAssessment(
  trackId: string,
  answers: Record<string, number>,
  uid: string,
  id: string
): AssessmentResult {
  const questions = questionsByTrack[trackId] ?? [];
  const trackSkillNodes = skillsForTrack(trackId);
  const tallies: Record<string, { correct: number; total: number }> = {};

  for (const skill of trackSkillNodes) {
    tallies[skill.id] = { correct: 0, total: 0 };
  }

  let correctCount = 0;
  const insights: string[] = [];

  for (const q of questions) {
    const picked = answers[q.id];
    const isCorrect = picked === q.correctIndex;
    if (isCorrect) correctCount += 1;
    for (const skillId of q.skillIds) {
      if (!tallies[skillId]) tallies[skillId] = { correct: 0, total: 0 };
      tallies[skillId].total += 1;
      if (isCorrect) tallies[skillId].correct += 1;
    }
    if (!isCorrect) {
      insights.push(`${q.skillIds.map((s) => skillById(s)?.name ?? s).join(" → ")}: ${q.whyWrong}`);
    }
  }

  const skillScores: AssessmentResult["skillScores"] = {};
  for (const [skillId, tally] of Object.entries(tallies)) {
    if (tally.total === 0) continue;
    const percent = Math.round((tally.correct / tally.total) * 100);
    skillScores[skillId] = {
      correct: tally.correct,
      total: tally.total,
      percent,
      level: percentToLevel(percent),
    };
  }

  const weakest = Object.entries(skillScores)
    .sort((a, b) => a[1].percent - b[1].percent)
    .slice(0, 2);

  if (weakest.length) {
    const names = weakest.map(([id]) => skillById(id)?.name ?? id).join(" and ");
    insights.unshift(
      `Your score is ${correctCount}/${questions.length}, but the real issue is ${names}. Those skills explain most of the misses.`
    );
  }

  return {
    id,
    uid,
    trackId,
    createdAt: Date.now(),
    score: correctCount,
    total: questions.length,
    answers,
    skillScores,
    insights: insights.slice(0, 6),
  };
}

export function buildPlan(result: AssessmentResult) {
  const ranked = Object.entries(result.skillScores).sort((a, b) => a[1].percent - b[1].percent);
  const steps = ranked
    .filter(([, s]) => s.level !== "mastered")
    .slice(0, 4)
    .map(([skillId, score]) => {
      const skill = skillById(skillId);
      const why =
        score.level === "major_gap"
          ? "This skill is blocking later topics. Fix the core rule before more practice volume."
          : score.level === "weak"
            ? "You know fragments of this skill but fail when the question shifts the boundary or update step."
            : "Accuracy is close. Targeted drills will lock the pattern in.";
      return {
        skillId,
        title: skill?.name ?? skillId,
        why,
        topics: [skill?.description ?? "", "Worked examples", "Timed mini-check"],
        practiceCount: score.level === "major_gap" ? 8 : score.level === "weak" ? 6 : 4,
      };
    });

  const focus = steps[0]?.title ?? "Review";
  return {
    id: result.id,
    uid: result.uid,
    resultId: result.id,
    createdAt: Date.now(),
    focus,
    summary: `Start with ${focus}. Cognexa sequenced the rest so each gap is closed before you reassess.`,
    steps,
  };
}
