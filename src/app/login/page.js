"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-8">
        <h1 className="mb-2 text-4xl font-bold">Admin Login</h1>

        <p className="mb-8 text-muted-foreground">
          Sign in to access dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
