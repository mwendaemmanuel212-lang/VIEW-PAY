
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-purple-400">← ViewPay Home</Link>
        <h1 className="mt-10 text-4xl font-bold">Disclaimer</h1>

        <h2 className="mt-8 text-xl font-semibold">No Guaranteed Earnings</h2>
        <p className="mt-3 leading-8 text-gray-300">
          ViewPay provides access to opportunities and tasks. Participation
          does not guarantee income, rewards, or financial results.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Sponsored Opportunities</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Sponsored tasks may be provided by third parties. Their
          availability, eligibility rules, and terms may change.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Accuracy</h2>
        <p className="mt-3 leading-8 text-gray-300">
          We aim to keep platform information accurate, but cannot
          guarantee that every listing or description is complete
          or up to date.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Your Responsibility</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Review task requirements and applicable terms before
          participating. You are responsible for your decisions.
        </p>
      </div>
    </main>
  );
}
