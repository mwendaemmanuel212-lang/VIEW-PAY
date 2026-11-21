
"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [otpStage, setOtpStage] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(result.user, {
        displayName: fullName.trim(),
      });

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        fullName: fullName.trim(),
        email: result.user.email ?? email.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const token = await result.user.getIdToken();

      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not send verification code.");
      }

      if (data.alreadyVerified) {
        await signOut(auth);
        setMessage("Your email is already verified. You can now log in.");
        return;
      }

      setOtpStage(true);
      setMessage("A six-digit verification code has been sent to your email.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed.";
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
        throw new Error("Please register again or log in.");
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

      await signOut(auth);
      setOtpStage(false);
      setCode("");
      setPassword("");
      setMessage("Email verified successfully! You can now log in.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Verification failed.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <form
        onSubmit={otpStage ? handleVerify : handleRegister}
        style={styles.form}
      >
        <h1 style={styles.heading}>
          {otpStage ? "Verify Your Email" : "Join ViewPay"}
        </h1>

        <p style={styles.subtitle}>
          {otpStage
            ? "Enter the six-digit code sent to your email."
            : "Create your account to get started."}
        </p>

        {!otpStage ? (
          <>
            <label style={styles.label}>Full name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label style={styles.label}>Email address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </>
        ) : (
          <>
            <label style={styles.label}>Six-digit verification code</label>
            <input
              style={styles.input}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              minLength={6}
              maxLength={6}
              required
            />
            <p style={styles.hint}>The code expires after 5 minutes.</p>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading
            ? "Please wait..."
            : otpStage
              ? "Verify Email"
              : "Create Account"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.footer}>
          {otpStage ? (
            <a href="/login" style={styles.link}>Go to Login</a>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" style={styles.link}>Login</a>
            </>
          )}
        </p>
      </form>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#100b24",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "18px",
    background: "#1d1538",
    color: "white",
    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
  },
  heading: {
    textAlign: "center",
    fontSize: "30px",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#c5badf",
    marginBottom: "28px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "16px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "9px",
    border: "1px solid #554477",
    background: "#120d27",
    color: "white",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "15px",
    marginTop: "24px",
    border: "none",
    borderRadius: "9px",
    background: "#8b5cf6",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginTop: "18px",
    color: "#d6c5ff",
    textAlign: "center",
    overflowWrap: "anywhere",
  },
  hint: {
    color: "#c5badf",
    fontSize: "13px",
  },
  footer: {
    textAlign: "center",
    marginTop: "22px",
    color: "#c5badf",
    fontSize: "14px",
  },
  link: {
    color: "#c4a7ff",
    fontWeight: "bold",
  },
};
