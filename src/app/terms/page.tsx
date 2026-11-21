
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-purple-400">← ViewPay Home</Link>
        <h1 className="mt-10 text-4xl font-bold">Terms and Conditions</h1>
        <p className="mt-3 text-sm text-gray-400">Last updated: November 2026</p>

        <h2 className="mt-8 text-xl font-semibold">1. Using ViewPay</h2>
        <p className="mt-3 leading-8 text-gray-300">
          By creating an account, you agree to use ViewPay lawfully,
          provide accurate information, and keep your login details secure.
        </p>

        <h2 className="mt-8 text-xl font-semibold">2. Accounts</h2>
        <p className="mt-3 leading-8 text-gray-300">
          You are responsible for activity carried out through your account.
          We may restrict accounts involved in fraud, abuse, or violations
          of these terms.
        </p>

        <h2 className="mt-8 text-xl font-semibold">3. Tasks and Rewards</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Tasks may have eligibility and completion requirements. Rewards
          are subject to verification and applicable platform rules.
          Participation does not guarantee earnings.
        </p>

        <h2 className="mt-8 text-xl font-semibold">4. Prohibited Conduct</h2>
        <p className="mt-3 leading-8 text-gray-300">
          You must not submit false information, manipulate tasks,
          create fraudulent accounts, or interfere with platform security.
        </p>

        <h2 className="mt-8 text-xl font-semibold">5. Changes</h2>
        <p className="mt-3 leading-8 text-gray-300">
          ViewPay may update these terms when necessary. Updated terms
          will be published on this page.
        </p>

        <h2 className="mt-8 text-xl font-semibold">6. Contact</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Please use the ViewPay contact page for questions about these terms.
        </p>
      </div>
    </main>
  );
}
