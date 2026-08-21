export type SkillLevel =
  | "mastered"
  | "good"
  | "needs_practice"
  | "weak"
  | "major_gap";

export type SkillNode = {
  id: string;
  name: string;
  parentId: string | null;
  description: string;
};

export type Question = {
  id: string;
  prompt: string;
  code?: string;
  options: string[];
  correctIndex: number;
  skillIds: string[];
  explanation: string;
  whyWrong: string;
};

export type Track = {
  id: string;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  description: string;
};

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  createdAt: number;
  lastAssessmentId?: string;
};

export type AssessmentResult = {
  id: string;
  uid: string;
  trackId: string;
  createdAt: number;
  score: number;
  total: number;
  answers: Record<string, number>;
  skillScores: Record<string, { correct: number; total: number; percent: number; level: SkillLevel }>;
  insights: string[];
};

export type SessionUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type ImprovementPlan = {
  id: string;
  uid: string;
  resultId: string;
  createdAt: number;
  focus: string;
  summary: string;
  steps: {
    title: string;
    why: string;
    topics: string[];
    practiceCount: number;
    skillId: string;
  }[];
};
