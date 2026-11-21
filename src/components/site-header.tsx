
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-purple-900 bg-[#10051f] px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-purple-400">
          ViewPay
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="hover:text-purple-300">Home</Link>
          <Link href="/articles" className="hover:text-purple-300">Guides</Link>
          <Link href="/about" className="hover:text-purple-300">About</Link>
          <Link
            href="/login"
            className="rounded-lg bg-purple-700 px-4 py-2 font-semibold hover:bg-purple-600"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
