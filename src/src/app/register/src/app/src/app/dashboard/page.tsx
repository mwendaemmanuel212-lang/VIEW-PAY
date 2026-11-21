
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      await currentUser.reload();

      if (!currentUser.emailVerified) {
        await signOut(auth);
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  if (checking) {
    return (
      <main style={styles.page}>
        <p>Loading your ViewPay account...</p>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>ViewPay</h1>
          <p style={styles.tagline}>Your member dashboard</p>
        </div>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </header>

      <section style={styles.welcome}>
        <p style={styles.small}>MEMBER DASHBOARD</p>
        <h2>Welcome, {user?.displayName || "Member"}!</h2>
        <p>{user?.email}</p>
        <span style={styles.verified}>✓ Email verified</span>
      </section>

      <section style={styles.grid}>
        <div style={styles.card}>
          <span style={styles.icon}>💰</span>
          <h3>My Earnings</h3>
          <p>Track your rewards here.</p>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🎁</span>
          <h3>Available Tasks</h3>
          <p>Explore approved earning tasks.</p>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>👥</span>
          <h3>Referrals</h3>
          <p>Invite others to join ViewPay.</p>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>💳</span>
          <h3>Withdrawals</h3>
          <p>View your withdrawal options.</p>
        </div>
      </section>

      <footer style={styles.footer}>
        ViewPay · Member Area
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "24px",
    background: "#100b24",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    maxWidth: "1000px",
    margin: "0 auto 35px",
  },
  logo: {
    color: "#c4a7ff",
    margin: 0,
    fontSize: "28px",
  },
  tagline: {
    color: "#c5badf",
    margin: "5px 0",
    fontSize: "13px",
  },
  logout: {
    padding: "11px 18px",
    borderRadius: "8px",
    border: "1px solid #8b5cf6",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
  welcome: {
    maxWidth: "1000px",
    margin: "0 auto 25px",
    padding: "28px",
    borderRadius: "16px",
    background: "linear-gradient(120deg, #5831a5, #28164f)",
  },
  small: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#dfd0ff",
  },
  verified: {
    display: "inline-block",
    marginTop: "12px",
    padding: "7px 12px",
    borderRadius: "20px",
    background: "#245c43",
    color: "#b9ffda",
    fontSize: "12px",
  },
  grid: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "16px",
  },
  card: {
    padding: "24px",
    borderRadius: "14px",
    background: "#1d1538",
    border: "1px solid #39275c",
  },
  icon: {
    fontSize: "30px",
  },
  footer: {
    textAlign: "center",
    color: "#9889b8",
    marginTop: "40px",
    fontSize: "13px",
  },
};
    
