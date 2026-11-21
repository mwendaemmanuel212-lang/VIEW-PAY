
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [otpStage, setOtpStage] = useState(false);
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

      const token = await result.user.getIdToken();

      const statusResponse = await fetch("/api/otp/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const status = await statusResponse.json();

      if (!statusResponse.ok) {
        throw new Error(status.error || "Could not check verification.");
      }

      if (status.verified) {
        router.push("/dashboard");
        return;
      }

      const sendResponse = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sendData = await sendResponse.json();

      if (!sendResponse.ok) {
        throw new Error(sendData.error || "Could not send verification code.");
      }

      if (sendData.alreadyVerified) {
        router.push("/dashboard");
        return;
      }

      setOtpStage(true);
      setMessage("A six-digit verification code has been sent to your email.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Your session expired. Please log in again.");
      }

      const token = await user.getIdToken();

      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed.");
      }

      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Verification failed.";
      setMessage(errorMessage);
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

          <h1 className="text-3xl font-extrabold">
            {otpStage ? "Verify Your Email" : "Welcome Back"}
          </h1>

          <p className="mt-2 text-sm text-purple-200">
            {otpStage
              ? "Enter the six-digit code sent to your email."
              : "Sign in to your ViewPay account"}
          </p>
        </div>

        <form
          onSubmit={otpStage ? handleVerify : handleLogin}
          className="space-y-5"
        >
          {!otpStage ? (
            <>
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
            </>
          ) : (
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Six-digit verification code
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                minLength={6}
                maxLength={6}
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter your code"
                className="w-full rounded-xl border border-purple-400/30 bg-[#10051f] px-4 py-3 text-center text-xl tracking-widest outline-none focus:border-purple-400"
              />
              <p className="mt-2 text-xs text-purple-200">
                The code expires after 5 minutes.
              </p>
            </div>
          )}

          {message && (
            <p className="rounded-xl bg-purple-500/10 p-3 text-sm text-purple-200">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 font-bold hover:bg-purple-500 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : otpStage
                ? "Verify Email"
                : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-purple-200">
          {otpStage ? (
            <Link href="/login" className="font-bold text-white underline">
              Return to Login
            </Link>
          ) : (
            <>
              Don't have an account?{" "}
              <Link href="/register" className="font-bold text-white underline">
                Register
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
