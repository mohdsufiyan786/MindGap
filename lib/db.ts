import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import { PREVIEW_UID, isPreview, readStore, writeStore, seedPreviewStore } from "./preview";
import type { AssessmentResult, ImprovementPlan, UserProfile } from "./types";

function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function localSaveAssessment(result: AssessmentResult) {
  const store = readStore();
  writeStore({
    ...store,
    assessments: [result, ...store.assessments.filter((a) => a.id !== result.id)],
  });
}

function localSavePlan(plan: ImprovementPlan) {
  const store = readStore();
  writeStore({
    ...store,
    plans: [plan, ...store.plans.filter((p) => p.id !== plan.id)],
  });
}

function mergeAssessments(remote: AssessmentResult[], local: AssessmentResult[]) {
  const map = new Map<string, AssessmentResult>();
  for (const item of [...local, ...remote]) map.set(item.id, item);
  return [...map.values()].sort((a, b) => b.createdAt - a.createdAt).slice(0, 20);
}

export async function getUserProfile(uid: string) {
  if (isPreview() || uid === PREVIEW_UID) return null;
  const db = getFirebaseDb();
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
  } catch {
    return null;
  }
}

export async function upsertUserProfile(profile: UserProfile) {
  if (isPreview() || profile.uid === PREVIEW_UID) return;
  const db = getFirebaseDb();
  if (!db) return;
  await setDoc(
    doc(db, "users", profile.uid),
    { ...clean(profile), updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function saveAssessmentResult(result: AssessmentResult) {
  localSaveAssessment(result);
  if (isPreview() || result.uid === PREVIEW_UID) return;
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not connected.");
  const payload = clean(result);
  await setDoc(doc(db, "assessments", result.id), payload);
  await setDoc(doc(db, "users", result.uid), { lastAssessmentId: result.id }, { merge: true });
}

export async function savePlan(plan: ImprovementPlan) {
  localSavePlan(plan);
  if (isPreview() || plan.uid === PREVIEW_UID) return;
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not connected.");
  await setDoc(doc(db, "plans", plan.id), clean(plan));
}

export async function getAssessment(id: string) {
  const local = readStore().assessments.find((a) => a.id === id);
  if (local) return local;
  const db = getFirebaseDb();
  if (!db || isPreview()) return null;
  const snap = await getDoc(doc(db, "assessments", id));
  return snap.exists() ? (snap.data() as AssessmentResult) : null;
}

export async function getPlan(id: string) {
  const local = readStore().plans.find((p) => p.id === id);
  if (local) return local;
  const db = getFirebaseDb();
  if (!db || isPreview()) return null;
  const snap = await getDoc(doc(db, "plans", id));
  return snap.exists() ? (snap.data() as ImprovementPlan) : null;
}

export async function listAssessments(uid: string) {
  if (isPreview() || uid === PREVIEW_UID) {
    seedPreviewStore();
    return readStore()
      .assessments.filter((a) => a.uid === uid)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  const local = readStore()
    .assessments.filter((a) => a.uid === uid)
    .sort((a, b) => b.createdAt - a.createdAt);

  const db = getFirebaseDb();
  if (!db) return local.slice(0, 20);

  const snap = await getDocs(query(collection(db, "assessments"), where("uid", "==", uid)));
  const remote = snap.docs.map((d) => d.data() as AssessmentResult);
  return mergeAssessments(remote, local);
}

export async function latestAssessment(uid: string) {
  const list = await listAssessments(uid);
  return list[0] ?? null;
}
