
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-purple-400">← ViewPay Home</Link>
        <h1 className="mt-10 text-4xl font-bold">Contact ViewPay</h1>
        <p className="mt-6 leading-8 text-gray-300">
          Need help with your account, verification, tasks, or rewards?
          We welcome your questions and feedback.
        </p>

        <div className="mt-8 rounded-2xl border border-purple-900 bg-purple-950/40 p-6">
          <h2 className="text-xl font-semibold">Email Support</h2>
          <p className="mt-3 text-gray-300">
            Our official support email address will be published here
            once it is configured.
          </p>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Please never send your password or email verification link
          to anyone claiming to provide support.
        </p>
      </div>
    </main>
  );
}
