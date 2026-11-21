
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#10051f] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-3xl font-extrabold text-purple-400">
          ViewPay
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-purple-400 px-5 py-2 font-semibold hover:bg-purple-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-purple-600 px-5 py-2 font-semibold hover:bg-purple-500"
          >
            Register
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-7 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-sm text-purple-200">
          Welcome to ViewPay
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
          Discover Opportunities.
          <span className="block text-purple-400">
            Complete Tasks. Earn Rewards.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-purple-200">
          Join ViewPay to explore sponsored tasks, discover opportunities,
          and earn rewards through eligible activities.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="rounded-xl bg-purple-600 px-8 py-4 font-bold shadow-lg hover:bg-purple-500"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-purple-400/50 px-8 py-4 font-bold hover:bg-purple-900"
          >
            Member Login
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-3">
        <div className="rounded-2xl border border-purple-500/20 bg-[#1b0b30] p-7">
          <div className="text-4xl">🎯</div>
          <h2 className="mt-5 text-xl font-bold">Sponsored Tasks</h2>
          <p className="mt-3 text-sm leading-6 text-purple-200">
            Explore eligible sponsored activities and opportunities.
          </p>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-[#1b0b30] p-7">
          <div className="text-4xl">💰</div>
          <h2 className="mt-5 text-xl font-bold">Rewards</h2>
          <p className="mt-3 text-sm leading-6 text-purple-200">
            Track your approved rewards and account activity.
          </p>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-[#1b0b30] p-7">
          <div className="text-4xl">👥</div>
          <h2 className="mt-5 text-xl font-bold">Community</h2>
          <p className="mt-3 text-sm leading-6 text-purple-200">
            Invite others and grow with the ViewPay community.
          </p>
        </div>
      </section>

      <footer className="border-t border-purple-500/20 px-6 py-8 text-center text-sm text-purple-300">
        © {new Date().getFullYear()} ViewPay. All rights reserved.
      </footer>
    </main>
  );
}
