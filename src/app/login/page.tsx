
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (!result.user.emailVerified) {
        await signOut(auth);
        setMessage("Please verify your email before logging in.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setMessage("Login failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#10051f] px-5 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-purple-500/30 bg-[#1b0b30] p-7 shadow-2xl">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-3xl font-bold">
            V
          </div>
          <h1 className="text-3xl font-extrabold">Welcome Back</h1>
          <p className="mt-2 text-sm text-purple-200">
            Sign in to your ViewPay account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-purple-400/30 bg-[#10051f] px-4 py-3 outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-purple-400/30 bg-[#10051f] px-4 py-3 outline-none focus:border-purple-400"
            />
          </div>

          {message && (
            <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 font-bold hover:bg-purple-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-purple-200">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-white underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
