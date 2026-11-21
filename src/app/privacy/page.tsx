
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-purple-400">← ViewPay Home</Link>
        <h1 className="mt-10 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-400">Last updated: November 2026</p>

        <h2 className="mt-8 text-xl font-semibold">Information We Collect</h2>
        <p className="mt-3 leading-8 text-gray-300">
          ViewPay may collect information you provide when registering,
          including your name and email address, as well as information
          needed to operate your account.
        </p>

        <h2 className="mt-8 text-xl font-semibold">How We Use Information</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Information may be used to manage accounts, verify email
          addresses, provide platform services, prevent misuse, and
          communicate important updates.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Data Protection</h2>
        <p className="mt-3 leading-8 text-gray-300">
          We aim to protect account information through appropriate
          technical and organizational safeguards. No online service
          can guarantee absolute security.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Your Choices</h2>
        <p className="mt-3 leading-8 text-gray-300">
          You may contact ViewPay to ask about your personal information
          or request assistance with your account.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Contact details for privacy questions will be provided on
          the ViewPay contact page.
        </p>
      </div>
    </main>
  );
}
