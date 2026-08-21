"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function Guard({ children }: { children: React.ReactNode }) {
  const { user, loading, preview } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !preview) router.replace("/login");
  }, [loading, user, preview, router]);

  if (loading || !user) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-mist-400">
        Loading your workspace…
      </div>
    );
  }

  return <>{children}</>;
}
