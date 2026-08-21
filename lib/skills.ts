import type { SkillNode, Track } from "./types";

export const tracks: Track[] = [
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    subject: "Programming",
    duration: "18 min",
    questions: 15,
    description: "Diagnostic on variables, functions, conditions, and loop logic.",
  },
  {
    id: "js-foundations",
    title: "JavaScript Foundations",
    subject: "Programming",
    duration: "18 min",
    questions: 15,
    description: "Scope, functions, conditionals, iteration, and array basics.",
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    subject: "Web",
    duration: "18 min",
    questions: 15,
    description: "Structure, semantics, box model, layout, and responsive basics.",
  },
  {
    id: "sql-basics",
    title: "SQL Basics",
    subject: "Data",
    duration: "18 min",
    questions: 15,
    description: "SELECT, WHERE, JOIN, GROUP BY, and query filtering gaps.",
  },
  {
    id: "dsa-essentials",
    title: "DSA Essentials",
    subject: "Algorithms",
    duration: "18 min",
    questions: 15,
    description: "Arrays, stacks, queues, complexity, and traversal thinking.",
  },
  {
    id: "git-basics",
    title: "Git Basics",
    subject: "Tools",
    duration: "15 min",
    questions: 15,
    description: "Commits, branches, merge conflicts, and collaboration flow.",
  },
];

export const skillTree: SkillNode[] = [
  // Python / JS shared
  { id: "variables", name: "Variables", parentId: null, description: "Storing and updating values." },
  { id: "types", name: "Data Types", parentId: "variables", description: "Numbers, strings, booleans, and conversion." },
  { id: "functions", name: "Functions", parentId: null, description: "Reusable blocks, parameters, and return values." },
  { id: "params", name: "Parameters", parentId: "functions", description: "Passing arguments into functions." },
  { id: "conditions", name: "Conditions", parentId: null, description: "Branching with if / else and comparisons." },
  { id: "loops", name: "Loops", parentId: null, description: "Repeating work with for and while." },
  { id: "loop-logic", name: "Basic Loop Logic", parentId: "loops", description: "Start, stop, and update conditions inside loops." },
  { id: "nested-loops", name: "Nested Loops", parentId: "loops", description: "Loops inside loops and inner-iteration control." },

  // HTML & CSS
  { id: "html-structure", name: "HTML Structure", parentId: null, description: "Document skeleton, tags, and nesting." },
  { id: "semantics", name: "Semantics", parentId: "html-structure", description: "Meaningful tags like header, nav, main, section." },
  { id: "css-selectors", name: "CSS Selectors", parentId: null, description: "Targeting elements with classes, ids, and combinators." },
  { id: "box-model", name: "Box Model", parentId: "css-selectors", description: "Margin, border, padding, and content sizing." },
  { id: "layout", name: "Layout", parentId: null, description: "Flexbox / grid positioning of UI blocks." },
  { id: "responsive", name: "Responsive", parentId: "layout", description: "Breakpoints and fluid layouts for screen sizes." },

  // SQL
  { id: "select", name: "SELECT", parentId: null, description: "Choosing columns and reading rows." },
  { id: "where", name: "WHERE Filters", parentId: "select", description: "Filtering rows with conditions." },
  { id: "joins", name: "JOINs", parentId: null, description: "Combining tables with keys." },
  { id: "inner-join", name: "INNER JOIN", parentId: "joins", description: "Matching rows that exist in both tables." },
  { id: "aggregates", name: "Aggregates", parentId: null, description: "COUNT, SUM, AVG over groups." },
  { id: "group-by", name: "GROUP BY", parentId: "aggregates", description: "Collapsing rows into groups before aggregating." },

  // DSA
  { id: "arrays", name: "Arrays", parentId: null, description: "Indexed sequences and access patterns." },
  { id: "indexing", name: "Indexing", parentId: "arrays", description: "Zero-based positions and off-by-one risks." },
  { id: "stacks", name: "Stacks", parentId: null, description: "LIFO push and pop behavior." },
  { id: "queues", name: "Queues", parentId: null, description: "FIFO enqueue and dequeue behavior." },
  { id: "complexity", name: "Complexity", parentId: null, description: "Big-O growth of time and space." },
  { id: "traversal", name: "Traversal", parentId: "complexity", description: "Walking structures without missing or double-counting." },

  // Git
  { id: "commits", name: "Commits", parentId: null, description: "Snapshots of project state with messages." },
  { id: "staging", name: "Staging", parentId: "commits", description: "Choosing what goes into the next commit." },
  { id: "branches", name: "Branches", parentId: null, description: "Parallel lines of development." },
  { id: "merge", name: "Merge", parentId: "branches", description: "Combining histories from different branches." },
  { id: "conflicts", name: "Conflicts", parentId: "merge", description: "Resolving overlapping edits during merge." },
  { id: "remote", name: "Remote Sync", parentId: null, description: "Push, pull, and stay aligned with origin." },
];

export const trackSkills: Record<string, string[]> = {
  "python-fundamentals": [
    "variables",
    "types",
    "functions",
    "params",
    "conditions",
    "loops",
    "loop-logic",
    "nested-loops",
  ],
  "js-foundations": [
    "variables",
    "types",
    "functions",
    "params",
    "conditions",
    "loops",
    "loop-logic",
    "nested-loops",
  ],
  "html-css": ["html-structure", "semantics", "css-selectors", "box-model", "layout", "responsive"],
  "sql-basics": ["select", "where", "joins", "inner-join", "aggregates", "group-by"],
  "dsa-essentials": ["arrays", "indexing", "stacks", "queues", "complexity", "traversal"],
  "git-basics": ["commits", "staging", "branches", "merge", "conflicts", "remote"],
};

export const skillOrder = skillTree.map((s) => s.id);

export function skillById(id: string) {
  return skillTree.find((s) => s.id === id);
}

export function trackTitle(id: string) {
  return tracks.find((t) => t.id === id)?.title ?? id.replaceAll("-", " ");
}

export function skillsForTrack(trackId: string) {
  const ids = trackSkills[trackId];
  if (!ids) return skillTree;
  return skillTree.filter((s) => ids.includes(s.id));
}
