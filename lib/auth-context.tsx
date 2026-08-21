"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, googleProvider, isFirebaseConfigured } from "./firebase";
import { getUserProfile, upsertUserProfile } from "./db";
import { enterPreview, exitPreview, isPreview, previewUser } from "./preview";
import type { SessionUser } from "./types";

export type { SessionUser };

type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  configured: boolean;
  preview: boolean;
  startPreview: () => void;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function resolveUser(fb: User): Promise<SessionUser> {
  let displayName = fb.displayName;
  try {
    const profile = await getUserProfile(fb.uid);
    if (profile?.displayName) displayName = profile.displayName;
  } catch {
    /* rules may not be published yet */
  }
  return {
    uid: fb.uid,
    email: fb.email,
    displayName,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (isPreview()) {
      setPreview(true);
      setUser(previewUser);
      setLoading(false);
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, (next) => {
      if (!next) {
        setUser(null);
        setLoading(false);
        return;
      }
      void resolveUser(next).then((session) => {
        setUser(session);
        setLoading(false);
      });
    });
  }, []);

  function startPreview() {
    enterPreview();
    setPreview(true);
    setUser(previewUser);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      preview,
      startPreview,
      async signUp(email, password, name) {
        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase is not configured.");
        exitPreview();
        setPreview(false);
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
        await cred.user.reload();
        await upsertUserProfile({
          uid: cred.user.uid,
          email: cred.user.email ?? email,
          displayName: name.trim(),
          createdAt: Date.now(),
        });
        setUser({
          uid: cred.user.uid,
          email: cred.user.email ?? email,
          displayName: name.trim(),
        });
      },
      async signIn(email, password) {
        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase is not configured.");
        exitPreview();
        setPreview(false);
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const session = await resolveUser(cred.user);
        setUser(session);
      },
      async signInGoogle() {
        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase is not configured.");
        exitPreview();
        setPreview(false);
        const cred = await signInWithPopup(auth, googleProvider);
        const name = cred.user.displayName ?? "Learner";
        await upsertUserProfile({
          uid: cred.user.uid,
          email: cred.user.email ?? "",
          displayName: name,
          createdAt: Date.now(),
        });
        setUser({
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: name,
        });
      },
      async logout() {
        exitPreview();
        setPreview(false);
        setUser(null);
        const auth = getFirebaseAuth();
        if (auth) await signOut(auth);
      },
    }),
    [user, loading, configured, preview]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
