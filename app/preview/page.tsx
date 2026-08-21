"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function PreviewPage() {
  const { startPreview } = useAuth();
  const router = useRouter();

  useEffect(() => {
    startPreview();
    router.replace("/dashboard");
    // enter once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 text-mist-400">
      Opening Cognexa…
    </div>
  );
}
