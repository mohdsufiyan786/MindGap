import type { SessionUser } from "./types";

export function fullName(user: SessionUser | null) {
  const name = user?.displayName?.trim();
  return name || "Learner";
}

export function firstName(user: SessionUser | null) {
  const name = fullName(user);
  if (name === "Learner") return "learner";
  return name.split(/\s+/)[0];
}

export function initials(user: SessionUser | null) {
  const name = fullName(user);
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
