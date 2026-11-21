
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      if (!currentUser.emailVerified) {
        await signOut(auth);
        router.replace("/login");
        return;
      }

      setUser(currentUser);

      try {
        const profile = await getDoc(doc(db, "users", currentUser.uid));
        if (profile.exists()) {
          setFullName(profile.data().fullName || "");
        }
      } catch (error) {
        console.error("Could not load member profile:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#10051f] text-white">
        Loading your dashboard...
      </main>
    );
  }

  if (!user) return null;

  const displayName =
    fullName || user.displayName || user.email?.split("@")[0] || "Member";

  const cards = [
    {
      title: "My Earnings",
      description: "View your rewards and earnings.",
      icon: "💰",
      link: "#earnings",
    },
    {
      title: "Available Tasks",
      description: "Discover available sponsored tasks.",
      icon: "🎯",
      link: "#tasks",
    },
    {
      title: "Referrals",
      description: "Invite friends to ViewPay.",
      icon: "👥",
      link: "#referrals",
    },
    {
      title: "Withdrawals",
      description: "View your withdrawal information.",
      icon: "💳",
      link: "#withdrawals",
    },
  ];

  return (
    <main className="min-h-screen bg-[#10051f] text-white">
      <header className="border-b border-purple-500/20 bg-[#1b0b30] px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-purple-300">
              ViewPay
            </h1>
            <p className="text-xs text-purple-200">
              Member Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-purple-400/40 px-4 py-2 text-sm font-semibold hover:bg-purple-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <section className="rounded-3xl bg-gradient-to-r from-purple-800 to-purple-600 p-7 shadow-xl">
          <p className="text-sm text-purple-100">
            Welcome to ViewPay
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            Hello, {displayName}!
          </h2>

          <p className="mt-3 break-all text-sm text-purple-100">
            {user.email}
          </p>

          <p className="mt-5 text-sm text-purple-100">
            Your member account is ready. Explore your dashboard below.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="mb-5 text-xl font-bold">
            Member Services
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <a
                key={card.title}
                href={card.link}
                className="rounded-2xl border border-purple-500/20 bg-[#1b0b30] p-6 transition hover:-translate-y-1 hover:border-purple-400"
              >
                <div className="text-4xl">{card.icon}</div>

                <h3 className="mt-4 text-lg font-bold">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-purple-200">
                  {card.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-9 rounded-2xl border border-purple-500/20 bg-[#1b0b30] p-6">
          <h2 className="text-lg font-bold">
            Account Information
          </h2>

          <p className="mt-3 text-sm text-purple-200">
            Email: {user.email}
          </p>

          <p className="mt-2 text-sm text-green-400">
            Email verification: Verified
          </p>
        </section>

        <footer className="py-10 text-center text-sm text-purple-300">
          ViewPay · Your rewards platform
        </footer>
      </div>
    </main>
  );
            }
