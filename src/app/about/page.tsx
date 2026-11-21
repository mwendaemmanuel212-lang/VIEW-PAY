
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-purple-400">← ViewPay Home</Link>
        <h1 className="mt-10 text-4xl font-bold">About ViewPay</h1>
        <p className="mt-6 leading-8 text-gray-300">
          ViewPay is a platform designed to help people discover sponsored
          opportunities, explore eligible tasks, and track potential rewards.
        </p>
        <p className="mt-4 leading-8 text-gray-300">
          Our goal is to provide a clear and accessible experience where
          members can review available opportunities and understand the
          requirements before participating.
        </p>
        <p className="mt-4 leading-8 text-gray-300">
          Rewards are subject to eligibility, task requirements, and
          verification. Earnings are not guaranteed.
        </p>
      </div>
    </main>
  );
}
