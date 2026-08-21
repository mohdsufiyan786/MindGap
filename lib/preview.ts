import { buildPlan } from "./engine";
import type { AssessmentResult, ImprovementPlan } from "./types";

export const PREVIEW_UID = "preview-learner";
export const PREVIEW_FLAG = "cognexa-preview";

export const previewUser = {
  uid: PREVIEW_UID,
  email: "preview@cognexa.ai",
  displayName: "Aarav Mehta",
};

export const previewResult: AssessmentResult = {
  id: "preview-python",
  uid: PREVIEW_UID,
  trackId: "python-fundamentals",
  createdAt: Date.now(),
  score: 6,
  total: 10,
  answers: {},
  skillScores: {
    variables: { correct: 2, total: 2, percent: 80, level: "good" },
    types: { correct: 1, total: 1, percent: 100, level: "mastered" },
    functions: { correct: 2, total: 2, percent: 75, level: "good" },
    params: { correct: 1, total: 2, percent: 50, level: "needs_practice" },
    conditions: { correct: 1, total: 2, percent: 50, level: "needs_practice" },
    loops: { correct: 1, total: 4, percent: 25, level: "weak" },
    "loop-logic": { correct: 0, total: 3, percent: 0, level: "major_gap" },
    "nested-loops": { correct: 0, total: 1, percent: 0, level: "major_gap" },
  },
  insights: [
    "Your score is 6/10, but the real issue is Basic Loop Logic and Nested Loops. Those skills explain most of the misses.",
    "Loops → Basic Loop Logic: range stop values are exclusive — 4 is never added.",
    "Loops → Basic Loop Logic: the update step is required or a while loop never ends.",
    "Loops → Nested Loops: nested loops multiply iterations. Inner body runs for every pair (i, j).",
  ],
};

export const previewPlan: ImprovementPlan = buildPlan(previewResult);

export function isPreview() {
  return typeof window !== "undefined" && localStorage.getItem(PREVIEW_FLAG) === "1";
}

export function enterPreview() {
  localStorage.setItem(PREVIEW_FLAG, "1");
  seedPreviewStore();
}

export function exitPreview() {
  localStorage.removeItem(PREVIEW_FLAG);
}

const STORE = "cognexa-local";

type LocalStore = {
  assessments: AssessmentResult[];
  plans: ImprovementPlan[];
};

export function readStore(): LocalStore {
  if (typeof window === "undefined") return { assessments: [], plans: [] };
  try {
    return JSON.parse(localStorage.getItem(STORE) || "") as LocalStore;
  } catch {
    return { assessments: [], plans: [] };
  }
}

export function writeStore(next: LocalStore) {
  localStorage.setItem(STORE, JSON.stringify(next));
}

export function seedPreviewStore() {
  const store = readStore();
  if (!store.assessments.some((a) => a.id === previewResult.id)) {
    writeStore({
      assessments: [previewResult, ...store.assessments],
      plans: [previewPlan, ...store.plans],
    });
  }
}
