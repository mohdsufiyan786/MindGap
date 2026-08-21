"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AuthFooter, AuthScreen, ConfigNote, Field, GoogleButton } from "@/components/AuthForm";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { signIn, signInGoogle, configured } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? friendlyAuthError(err.message) : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthScreen title="Welcome back" subtitle="Sign in with the email on your Cognexa account.">
      {!configured && <ConfigNote />}
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} icon="mail" />
        <Field label="Password" type="password" value={password} onChange={setPassword} icon="lock" />
        {error && <p className="text-sm text-rose">{error}</p>}
        <button
          disabled={busy || !configured}
          className="ui-btn flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-ink-950 disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
          {!busy && <ArrowRight size={16} />}
        </button>
      </form>
      <div className="relative my-6 text-center text-xs uppercase tracking-[0.18em] text-mist-500">
        <span className="bg-[#06080e] px-3">or</span>
        <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-white/10" />
      </div>
      <GoogleButton
        disabled={!configured || busy}
        onClick={async () => {
          setError("");
          try {
            await signInGoogle();
            router.push("/dashboard");
          } catch (err) {
            setError(err instanceof Error ? friendlyAuthError(err.message) : "Google sign-in failed.");
          }
        }}
      />
      <AuthFooter href="/signup" prompt="New here?" action="Create an account" />
    </AuthScreen>
  );
}

function friendlyAuthError(message: string) {
  if (message.includes("invalid-credential") || message.includes("wrong-password") || message.includes("user-not-found")) {
    return "Email or password is incorrect.";
  }
  if (message.includes("too-many-requests")) return "Too many attempts. Try again in a minute.";
  return message.replace("Firebase: ", "").replace(/\(auth\/.*\)\.?/, "").trim();
}
